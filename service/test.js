const Define = require('../utils/_define');
const { query } = require('../mysql');

class TestService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取单个测试项
   */
  async getTest(req, res) {
    const { id } = req.params;
    const sql = 'SELECT * FROM test WHERE id = ?;';
    try {
      let result = await query(sql, [id]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 获取测试列表
   */
  async getTestList(req, res) {
    const sql = 'SELECT * FROM test;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new TestService();
