/**
 * 角色相关的接口
 */
const { create, del } = require('../validator/roles');

module.exports = {
  // 获取 role 列表
  'GET /roles': 'RolesController.roles',
  // 新建 role
  'POST /role': {
    path: 'RolesController.create',
    middlewares: [create],
  },
  // 更新 role
  'PUT /role': {
    path: 'RolesController.update',
    middlewares: [create],
  },
  // 删除 role
  'DELETE /role': {
    path: 'RolesController.delete',
    middlewares: [del],
  },
  // 根据 roleid 获取 role 信息
  'GET /role/:roleid': {
    path: 'RolesController.getRoleInfoByRoleid',
  },
};
