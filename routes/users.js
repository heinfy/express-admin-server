/**
 * 用户相关的接口
 */
const { register, update, del } = require('../validator/users');

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
  // 获取当前登录用户
  'GET /user': {
    path: 'UsersController.getCurrentUser',
    // middlewares: [del],
  },
};
