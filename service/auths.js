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
    const {
      page = 1,
      size = 20,
      authid = null,
      authName = null,
      pid = null,
      type = null,
      timeRange = null,
    } = req.body;
    const offset = (page - 1) * size,
      limit = size;
    let filterStr = '';
    if (authid) {
      filterStr += `a.authid like '%${authid}%'`;
    }
    if (authName) {
      filterStr +=
        filterStr === ''
          ? `authName like '%${authName}%'`
          : `and authName like '%${authName}%'`;
    }
    if (pid) {
      filterStr +=
        filterStr === ''
          ? `a.pid like '%${pid}%'`
          : `and a.pid like '%${pid}%'`;
    }
    if (type) {
      filterStr +=
        filterStr === '' ? `a.type = '${type}'` : `and a.type = '${type}'`;
    }
    if (timeRange && timeRange.length === 2) {
      const startTime = moment(timeRange[0]).format('YYYY-MM-DD');
      const endTime = moment(timeRange[1]).format('YYYY-MM-DD');
      const timeStr = `a.createdAt between '${startTime} 00:00:00' and '${endTime} 23:59:59'`;
      filterStr += filterStr === '' ? timeStr : `and ${timeStr}`;
    }
    //  offset 跳过多少条; limit 取多少条
    const countStr = `LIMIT ${offset},${limit};`;
    const sql_1 = `SELECT a.*, ar.routeid, ar.routeid,(select r.routeName from route r where ar.routeid = r.routeid) as routeName FROM auth a LEFT JOIN auth_route ar ON a.authid = ar.authid ${
      filterStr ? 'WHERE ' + filterStr : filterStr
    } ORDER BY a.authSort ${countStr}`;
    const sql_2 = `SELECT COUNT(id) as total FROM auth a ${
      filterStr ? 'WHERE ' + filterStr : filterStr
    } ${countStr}`;
    try {
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
   * 新建权限
   */
  async create(req, res) {
    const { pid, type, authName, authDesc, authSort, routeid } = req.body;
    try {
      // 如果是路由权限，判断路由是否存在，已经是否被占用！
      if (type === 'menu') {
        if (routeid) {
          const sql_1 = 'SELECT * FROM auth_route WHERE routeid=?;';
          const re_1 = await query(sql_1, [routeid]);
          if (re_1.length > 0) {
            res
              .status(200)
              .json(super._response(null, 0, '该路由已被权限绑定！'));
            return;
          }
        } else {
          res
            .status(200)
            .json(super._response(null, 0, '请选择权限对应的路由'));
          return;
        }
      }
      const sql_2 = 'INSERT INTO auth SET ?';
      const authid = uid2(8);
      const auth = {
        authid,
        pid,
        type,
        authName,
        authDesc,
        authSort,
      };
      await query(sql_2, auth);
      // 如果是路由权限，则保存 权限-路由 映射关系
      if (type === 'menu') {
        const sql_3 = 'INSERT INTO `auth_route` SET ?';
        const result = {
          authid,
          routeid,
        };
        // 将本次权限-路由插入数据库
        await query(sql_3, [result]);
      }
      res.status(200).json(super._response(null));
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
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 authid 删除 权限
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
      // 删除 权限路由表
      const sql_3 = `DELETE FROM auth_route WHERE authid = '${authid}';`;
      await query(sql_3);
      // 删除权限表
      const sql_2 = `DELETE FROM auth WHERE authid = '${authid}';`;
      await query(sql_2);
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
   * 更新 menu 类型的权限的路由
   */
  async updateAuthRoute(req, res) {
    const { authid, routeid } = req.body;
    const sql = 'UPDATE auth_route SET routeid = ? WHERE authid = ?;';
    const sql_2 = 'SELECT * FROM `auth_route` where `routeid`=?;';
    try {
      // 不允许一个路由被多个权限添加
      let re2 = await query(sql_2, [routeid]);
      if (re2.length === 1) {
        res.status(200).json(super._response(null, 0, '该路由已添加过权限'));
        return;
      }
      await query(sql, [routeid, authid]);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new AuthsService();
