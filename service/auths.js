const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');

class AuthsService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取权限列表
   */
  async auths(req, res) {
    const sql =
      'SELECT authid, pid, type, authName, authDesc, authSort, createdAt, updatedAt FROM auth;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 新建权限
   */
  async create(req, res) {
    const { pid, type, authName, authDesc, authSort } = req.body;
    try {
      const sql = 'INSERT INTO auth SET ?';
      let auth = {
        authid: uid2(8),
        pid,
        type,
        authName,
        authDesc,
        authSort,
      };
      await query(sql, auth);
      res.status(200).json(super._response(auth));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新权限 父ID、类型、名称、描述、排序
   */
  async update(req, res) {
    const { authid, pid, type, authName, authDesc, authSort } = req.body;
    try {
      const sql = `UPDATE auth SET pid =? , type = ?,authName = ?, authDesc = ?, authSort = ? WHERE authid = ?;`;
      await query(sql, [pid, type, authName, authDesc, authSort, authid]);
      const result = { pid, type, authName, authDesc, authSort, authid };
      res.status(200).json(super._response(result));
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 authid 删除 role
   */
  async delete(req, res) {
    const { authid } = req.body;
    try {
      const sql_1 = `SELECT * FROM role_auth WHERE authid = ?;`;
      const rt = await query(sql_1, [authid]);
      if (rt.length > 0) {
        res
          .status(200)
          .json(super._response(null, 0, '该权限已被角色使用，无法删除'));
        return;
      }
      const sql = `DELETE FROM auth WHERE authid = '${authid}';`;
      await query(sql);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 authid 获取权限信息
   */
  async getAuthInfoByAuthid(req, res) {
    const { authid } = req.params;
    const sql =
      'SELECT authid, pid, type, authName, authDesc, authSort, createdAt, updatedAt FROM `auth` where `authid`=?;';
    try {
      let result = await query(sql, [authid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 给 menu 类型的权限添加对应的路由
   */
  async giveAuthRoute(req, res) {
    const { authid, routeid } = req.body;
    try {
      // 检查本次插入的权限是否已经存在在数据库中
      const sql_1 = 'SELECT * FROM `auth_route` where `authid`=?;';
      let re = await query(sql_1, [authid]);
      if (re.length === 1) {
        res.status(200).json(super._response(null, 0, '该权限已添加过路由'));
        return;
      }
      const sql_2 = 'INSERT INTO `auth_route` SET ?';
      let result = {
        authid,
        routeid,
      };
      // 将本次权限-路由插入数据库
      await query(sql_2, [result]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新 menu 类型的权限的路由
   */
  async updateAuthRoute(req, res) {
    const { authid, routeid } = req.params;
    const sql = 'UPDATE auth_route SET routeid = ? WHERE authid = ?;';
    try {
      await query(sql, [routeid, authid]);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new AuthsService();
