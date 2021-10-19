var db = require('../mysql');

class TestService {
  constructor() {}
  /**
   * 获取测试列表
   * @param req
   * @param res
   * @returns Object {}
   */
  getTestList(req, res) {
    db.query('SELECT * from article;', async function (error, results) {
      if (error) throw error;
      console.log('RowDataPacket', results);
      await res.status(200).json({
        statusCode: 1,
        msg: '成功',
        data: results,
      });
    });
    db.end();
  }
}

module.exports = new TestService();
