const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');

class rolesService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取 roles 列表
   */
  async roles(req, res) {
    const sql =
      'SELECT roleid, roleName, roleDesc, roleSort, createdAt, updatedAt FROM role;';
    try {
      let result = await query(sql);
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
      const sql = 'INSERT INTO role SET ?';
      let role = {
        roleid: uid2(6),
        roleName,
        roleDesc,
        roleSort,
      };
      await query(sql, role);
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
      const sql = `UPDATE role SET roleName = ?, roleDesc = ?, roleSort = ? WHERE roleid = ?;`;
      await query(sql, [roleName, roleDesc, roleSort, roleid]);
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
    const sql = `DELETE FROM role WHERE roleid = '${roleid}';`;
    try {
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
    const sql =
      'SELECT  roleid, roleName, roleDesc, roleSort, createdAt, updatedAt FROM `role` where `roleid`=?';
    try {
      let result = await query(sql, [roleid]);
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
    let sql = 'INSERT INTO role_auth (`roleid`, `authid`) VALUES ?';
    let params = authids.map((authid) => [roleid, authid]);
    try {
      await query(sql, [params]);
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
    let sql = 'DELETE FROM role_auth WHERE roleid = ?;';
    try {
      await query(sql, [roleid]);
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
    const sql =
      'SELECT r.roleid, r.authid, a.authName, a.type FROM role_auth r, auth a WHERE r.roleid = ? and r.authid = a.authid;';
    try {
      let result = await query(sql, [roleid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new rolesService();
