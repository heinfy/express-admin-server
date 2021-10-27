const { register, update, del, login } = require('../validator/users');

module.exports = {
  // 获取 user 列表
  'GET /users': 'UsersController.users',
  // 新建 user
  'POST /user': {
    path: 'UsersController.create',
    middlewares: [register],
  },
  // 更新 user
  'PUT /user': {
    path: 'UsersController.update',
    middlewares: [update],
  },
  // 删除 user
  'DELETE /user': {
    path: 'UsersController.delete',
    middlewares: [del],
  },
  // user 登录
  'POST /login': {
    path: 'UsersController.login',
    middlewares: [login],
  },
  // 获取当前登录用户
  'GET /user': {
    path: 'UsersController.getCurrentUser',
    // middlewares: [del],
  },
  // 获取公钥
  'GET /getPublicKey': 'UsersController.getPublicKey',
};
