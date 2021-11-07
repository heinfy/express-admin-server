/**
 * 用户相关的接口
 */
const { register, update, del, isRightUserid } = require('../validator/users');

module.exports = {
  // 获取 user 列表
  'POST /users': 'UsersController.users',
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
  // 根据 userid 获取用户
  'GET /user/:userid': {
    path: 'UsersController.getUserInfoByUserid',
    middlewares: [isRightUserid],
  },
  // 根据 token 获取当前登录用户信息
  'GET /user': {
    path: 'UsersController.getCurrentUserInfo',
  },
  // 设置用户角色
  'POST /giveUserRoles': {
    path: 'UsersController.giveUserRoles',
  },
  // 更新用户角色
  'PUT /updateUserRoles': {
    path: 'UsersController.updateUserRoles',
  },
  // 根据 userid 获取用户角色
  'GET /getRolesByUserid/:userid': {
    path: 'UsersController.getRolesByUserid',
    middlewares: [isRightUserid],
  },
  // 根据 userid 获取用户权限
  'GET /getAuthsByUserid/:userid': {
    path: 'UsersController.getAuthsByUserid',
    middlewares: [isRightUserid],
  },
  // 根据 userid 获取用户路由
  'GET /getRoutesByUserid/:userid': {
    path: 'UsersController.getRoutesByUserid',
    middlewares: [isRightUserid],
  },
  // 获取访问日志列表
  'POST /getLogList': {
    path: 'UsersController.getLogList',
  },
};
