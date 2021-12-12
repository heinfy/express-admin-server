const { query } = require('../mysql');
const Define = require('../utils/_define');
const { isArray } = require('../utils/type');

class CommonService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取展示项
   */
  async column(req, res) {
    const { userid } = req.headers;
    const { path } = req.query;
    try {
      // 根据 userid  path 获取 column
      const sql =
        'SELECT * FROM `column_path` WHERE `userid`= ? and `path` = ?';
      let results = await query(sql, [userid, path]);
      const data = results[0] ? results[0].columns.split(',') : null;
      res.status(200).json(super._response(data));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 新建/更新展示项 post
   */
  async operate(req, res) {
    const { userid } = req.headers;
    const { path, columns } = req.body;
    try {
      if (!path) {
        res.status(200).json(super._response(null, 0, 'path 必填'));
      }
      if (isArray(columns) && columns.length > 0) {
        // 根据 userid  path 获取 column
        const sql_1 =
          'SELECT * FROM `column_path` WHERE `userid`=? and `path` =?';
        let results = await query(sql_1, [userid, path]);
        if (results.length > 0) {
          // 更新
          const sql_2 = `UPDATE column_path SET columns=? WHERE userid=? and path=?`;
          await query(sql_2, [columns.join(','), userid, path]);
          res.status(200).json(super._response(null));
        } else {
          // 新建
          const sql_3 = 'INSERT INTO column_path SET ?';
          let column = {
            userid,
            path,
            columns: columns.join(','),
          };
          await query(sql_3, column);
          res.status(200).json(super._response(null));
        }
      } else {
        res.status(200).json(super._response(null, 0, 'columns 为数组'));
      }
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new CommonService();
