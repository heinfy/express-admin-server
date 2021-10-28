/**
 * 权限相关的接口
 */
const { create, update, del } = require('../validator/auths');

module.exports = {
  // 获取权限列表
  'GET /auths': 'AuthsController.auths',
  // 新建权限
  'POST /auth': {
    path: 'AuthsController.create',
    middlewares: [create],
  },
  // 更新权限
  'PUT /auth': {
    path: 'AuthsController.update',
    middlewares: [update],
  },
  // 删除权限
  'DELETE /auth': {
    path: 'AuthsController.delete',
    middlewares: [del],
  },
  // 根据 权限id 获取权限信息
  'GET /auth/:authid': {
    path: 'AuthsController.getAuthInfoByAuthid',
  },
};
