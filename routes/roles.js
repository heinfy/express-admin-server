/**
 * 角色相关的接口
 */
const { create, update, del } = require('../validator/roles');

module.exports = {
  // 获取 role 列表
  'POST /roles': 'RolesController.roles',
  // 新建 role
  'POST /role': {
    path: 'RolesController.create',
    middlewares: [create],
  },
  // 更新 role
  'PUT /role': {
    path: 'RolesController.update',
    middlewares: [update],
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
  // 角色设置权限/更新权限
  'POST /giveRoleAuths': {
    path: 'RolesController.giveRoleAuths',
  },
  // 根据 roleid 获取权限列表
  'GET /getAuthsByRoleid/:roleid': {
    path: 'RolesController.getAuthsByRoleid',
  },
};
