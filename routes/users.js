module.exports = {
  // 获取 user 列表
  'GET /users': 'UsersController.users',
  // 新建 user
  'POST /user': 'UsersController.create',
  // 更新 user
  'PUT /user': 'UsersController.update',
  // 删除 user
  'DELETE /user': 'UsersController.delete',
};
