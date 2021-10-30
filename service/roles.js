const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');

class rolesService extends Define {
  constructor() {
    super();
    // 获取 roles 列表
    this.getRoleListSql =
      'SELECT roleid, roleName, roleDesc, roleSort, createdAt, updatedAt FROM role;';
    // 新建角色
    this.createRoleSql = 'INSERT INTO role SET ?';
    // 更新角色
    this.updateRoleSql = `UPDATE role SET roleName = ?, roleDesc = ?, roleSort = ? WHERE roleid = ?;`;
    // 根据 roleid 获取角色信息
    this.getRoleInfoByRoleidSql =
      'SELECT  roleid, roleName, roleDesc, roleSort, createdAt, updatedAt FROM `role` where `roleid`=?';
    // 给角色设置权限
    this.giveRoleAuthsSql =
      'INSERT INTO role_auth (`roleid`, `authid`) VALUES ?';
    // 根据 roleid 获取权限列表
    this.getAuthsByRoleidSql =
      'SELECT r.roleid, r.authid, a.authName, a.type FROM role_auth r, auth a WHERE r.roleid = ? and r.authid = a.authid;';
  }
  /**
   * 获取 roles 列表
   */
  async roles(req, res) {
    try {
      let result = await query(this.getRoleListSql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 新建 role
   */
  async create(req, res) {
    const { roleName, roleDesc, roleSort } = req.body;
    try {
      let role = {
        roleid: uid2(6),
        roleName,
        roleDesc,
        roleSort,
      };
      await query(this.createRoleSql, role);
      res.status(200).json(super._response(role));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新 role 名称、描述、排序
   */
  async update(req, res) {
    const { roleid, roleName, roleDesc, roleSort } = req.body;
    try {
      await query(this.updateRoleSql, [roleName, roleDesc, roleSort, roleid]);
      const result = { roleName, roleDesc, roleSort, roleid };
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 roleid 删除 role
   */
  async delete(req, res) {
    const { roleid } = req.body;
    try {
      const sql_1 = `SELECT * FROM user_role WHERE roleid = ?;`;
      const rt = await query(sql_1, [roleid]);
      if (rt.length > 0) {
        res
          .status(200)
          .json(super._response(null, 0, '该角色已被用户使用，无法删除'));
        return;
      }
      const sql = `DELETE FROM role WHERE roleid = '${roleid}';`;
      await query(sql);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 roleid 获取角色信息
   */
  async getRoleInfoByRoleid(req, res) {
    const { roleid } = req.params;
    try {
      let result = await query(this.getRoleInfoByRoleidSql, [roleid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 给角色设置权限
   */
  async giveRoleAuths(req, res) {
    const { roleid, authids } = req.body;
    let params = authids.map((authid) => [roleid, authid]);
    try {
      await query(this.giveRoleAuthsSql, [params]);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新角色的权限
   */
  async updateRoleAuths(req, res) {
    const { roleid } = req.body;
    try {
      // 删除原来的角色权限
      let sql = 'DELETE FROM role_auth WHERE roleid = ?;';
      await query(sql, [roleid]);
      // 添加新的角色权限
      this.giveRoleAuths(req, res);
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 roleid 获取权限列表
   */
  async getAuthsByRoleid(req, res) {
    const { roleid } = req.params;
    try {
      let result = await query(this.getAuthsByRoleidSql, [roleid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new rolesService();
