/**
 * 测试连接接口
 */
const { check, verifyAuth } = require('../middleware');

module.exports = {
  'GET /test/:id': {
    path: 'TestController.getTest',
    middlewares: [check],
  },
  'GET /test_no': {
    path: 'TestController.getTestList',
    middlewares: [verifyAuth],
  },
  'GET /test': 'TestController.getTestList',
};
