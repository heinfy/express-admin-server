class TestController {
  constructor() {}
  /**
   * 获取测试列表
   * @param req
   * @param res
   * @returns Object {}
   */
  async test(req, res) {
    await res.status(200).json({
      statusCode: 1,
      msg: '成功',
      data: {},
    });
  }
}

module.exports = new TestController();
