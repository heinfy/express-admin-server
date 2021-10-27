/**
 * 登录页面 和 注册页面 的接口
 */
const { login, register } = require('../validator/users');

module.exports = {
  // 用户登录
  'POST /login': {
    path: 'BaseController.login',
    middlewares: [login],
  },
  // 用户注册
  'POST /register': {
    path: 'UsersController.create',
    middlewares: [register],
  },
  // 获取公钥
  'GET /getPublicKey': 'BaseController.getPublicKey',
};
