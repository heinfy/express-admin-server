/**
 * 路由相关的接口
 */
const { create, update, del } = require('../validator/routes');

module.exports = {
  // 获取路由列表
  'GET /routes': 'RoutesController.routes',
  // 新建路由
  'POST /route': {
    path: 'RoutesController.create',
    middlewares: [create],
  },
  // 更新路由
  'PUT /route': {
    path: 'RoutesController.update',
    middlewares: [update],
  },
  // 删除路由
  'DELETE /route': {
    path: 'RoutesController.delete',
    middlewares: [del],
  },
  // 根据 路由id 获取路由信息
  'GET /route/:routeid': {
    path: 'RoutesController.getAuthInfoByAuthid',
  },
};
