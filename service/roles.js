const moment = require('moment');
const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');

class rolesService extends Define {
  constructor() {
    super();
    // 新建角色
    this.createRoleSql = 'INSERT INTO role SET ?';
    // 更新角色
    this.updateRoleSql = `UPDATE role SET roleName = ?, roleDesc = ?, roleSort = ? WHERE roleid = ?;`;
    // 根据 roleid 获取角色信息
    this.getRoleInfoByRoleidSql =
      'SELECT roleid, roleName, roleDesc, roleSort, createdAt, updatedAt FROM `role` where `roleid`=?';
    // 根据 roleid 获取权限列表
    this.getAuthsByRoleidSql =
      'SELECT r.roleid, r.authid, a.authName, a.type FROM role_auth r, auth a WHERE r.roleid = ? and r.authid = a.authid;';
  }
  /**
   * 获取 roles 列表
   */
  async roles(req, res) {
    try {
      const {
        page = 1,
        size = 20,
        roleid = null,
        roleSort = null,
        roleName = null,
        timeRange = null,
      } = req.body;
      const offset = (page - 1) * size,
        limit = size;
      let filterStr = '';
      if (roleid) {
        filterStr += `roleid like '%${roleid}%'`;
      }
      if (roleSort) {
        filterStr += `roleSort = '${roleSort}'`;
      }
      if (roleName) {
        filterStr +=
          filterStr === ''
            ? `roleName like '%${roleName}%'`
            : `and roleName like '%${roleName}%'`;
      }
      if (timeRange && timeRange.length === 2) {
        const startTime = moment(timeRange[0]).format('YYYY-MM-DD');
        const endTime = moment(timeRange[1]).format('YYYY-MM-DD');
        const timeStr = `createdAt between '${startTime} 00:00:00' and '${endTime} 23:59:59'`;
        filterStr += filterStr === '' ? timeStr : `and ${timeStr}`;
      }
      //  offset 跳过多少条; limit 取多少条
      const countStr = `LIMIT ${offset},${limit};`;
      const sql_1 = `SELECT * FROM role ${
        filterStr ? 'WHERE ' + filterStr : filterStr
      } ${countStr}`;
      const sql_2 = `SELECT COUNT(id) as total FROM role ${
        filterStr ? 'WHERE ' + filterStr : filterStr
      }`;
      let result_1 = await query(sql_1);
      let result_2 = await query(sql_2);
      let total = result_2[0]['total'];
      res.status(200).json(
        super._response({
          data: result_1,
          total,
        })
      );
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
   * 给角色设置/更新权限
   */
  async giveRoleAuths(req, res) {
    const { roleid, authids } = req.body;
    try {
      // 1. 在 role_auth 表，判断角色是否绑定了权限
      const sql1 = 'SELECT * FROM role_auth WHERE roleid=?';
      const re1 = await query(sql1, [roleid]);
      if (re1.length > 0) {
        // 2. 如果绑定： 删除原来的角色权限
        let sql2 = 'DELETE FROM role_auth WHERE roleid = ?;';
        await query(sql2, [roleid]);
      }
      // 3. 如果没有绑定：直接添加新的权限
      let params = authids.map((authid) => [roleid, authid]);
      const sql3 = 'INSERT INTO role_auth (`roleid`, `authid`) VALUES ?';
      await query(sql3, [params]);
      res.status(200).json(super._response(null));
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
