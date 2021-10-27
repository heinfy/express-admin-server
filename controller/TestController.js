var testService = require('../service/test');

module.exports = class TestController {
  constructor() {}
  /**
   * 获取单个测试项
   */
  getTest(req, res) {
    testService.getTest(req, res);
  }
  /**
   * 获取测试列表
   */
  getTestList(req, res) {
    testService.getTestList(req, res);
  }
};
