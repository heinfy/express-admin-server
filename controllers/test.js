var testService = require('../service/test');

class TestController {
  constructor() {
    this.getTestList = this.getTestList.bind(this);
  }
  /**
   * 获取测试列表
   */
  getTestList(req, res) {
    testService.getTestList(req, res);
  }
}

module.exports = new TestController();
