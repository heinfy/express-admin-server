var { query } = require('../mysql');

class TestService {
  constructor() {}
  /**
   * 获取测试列表
   * @param req
   * @param res
   * @returns Object {}
   */
  async getTestList(req, res) {
    var sql = 'SELECT * from article;';
    try {
      var result = await query(sql);
      console.log(1, result);
      res.status(200).json({
        statusCode: 1,
        msg: '成功',
        data: result,
      });
    } catch (err) {
      res.status(200).json({
        statusCode: 2,
        msg: '失败',
        data: '' + err,
      });
    }
  }
}

module.exports = new TestService();
