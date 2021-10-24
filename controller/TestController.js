var testService = require('../service/test');

module.exports = class TestController {
  constructor() {
    this.getTestList = this.getTestList.bind(this);
  }
  /**
   * 获取测试列表
   */
  getTestList(req, res) {
    testService.getTestList(req, res);
  }
  create(req, res) {
    res.send('created a User with es6 class syntax');
  }
};
