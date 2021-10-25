const Define = require('../utils/_define');
const { query } = require('../mysql');

class TestService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取测试列表
   * @param req
   * @param res
   * @returns Object {}
   */
  async getTestList(req, res) {
    const sql = 'SELECT * FROM test;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(400).json(super._response('' + error, 0));
    }
  }
}

module.exports = new TestService();
