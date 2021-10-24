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
    const { status, result } = await super._invoke(query, sql);
    const response = super._response(status, result);
    res.status(status).json(response);
  }
}

module.exports = new TestService();
