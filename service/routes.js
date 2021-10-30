const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');

class RoutesService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取路由列表
   */
  async routes(req, res) {
    const sql =
      'SELECT routeid, route, routeName, icon, routeSort, createdAt, updatedAt FROM route;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 新建路由
   */
  async create(req, res) {
    const { route, routeName, icon, routeSort } = req.body;
    try {
      const sql = 'INSERT INTO route SET ?';
      let r = {
        routeid: uid2(4),
        route,
        routeName,
        icon,
        routeSort,
      };
      await query(sql, r);
      res.status(200).json(super._response(r));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新路由 名称、描述、排序
   */
  async update(req, res) {
    const { routeid, route, routeName, icon, routeSort } = req.body;
    try {
      const sql = `UPDATE route SET route =? , routeName = ?,icon = ?, routeSort = ? WHERE routeid = ?;`;
      await query(sql, [route, routeName, icon, routeSort, routeid]);
      const result = { route, routeName, icon, routeSort, routeid };
      res.status(200).json(super._response(result));
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 routeid 删除 route
   */
  async delete(req, res) {
    const { routeid } = req.body;
    try {
      const sql_1 = `SELECT * FROM auth_route WHERE routeid = ?;`;
      const rt = await query(sql_1, [routeid]);
      if (rt.length > 0) {
        res
          .status(200)
          .json(super._response(null, 0, '该路由已被权限使用，无法删除'));
        return;
      }
      const sql = `DELETE FROM route WHERE routeid = '${routeid}';`;
      await query(sql);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 routeid 获取路由信息
   */
  async getAuthInfoByAuthid(req, res) {
    const { routeid } = req.params;
    const sql =
      'SELECT routeid, route, routeName, icon, routeSort, createdAt, updatedAt FROM `route` where `routeid`=?;';
    try {
      let result = await query(sql, [routeid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new RoutesService();
