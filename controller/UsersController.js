var UsersService = require('../service/users');

module.exports = class UsersController {
  users(req, res) {
    UsersService.users(req, res);
  }
  create(req, res) {
    UsersService.create(req, res);
  }
  update(req, res) {
    UsersService.update(req, res);
  }
  delete(req, res) {
    UsersService.delete(req, res);
  }
  getUserInfoByUserid(req, res) {
    UsersService.getUserInfoByUserid(req, res);
  }
  getCurrentUserInfo(req, res) {
    UsersService.getCurrentUserInfo(req, res);
  }
  giveUserRoles(req, res) {
    UsersService.giveUserRoles(req, res);
  }
  updateUserRoles(req, res) {
    UsersService.updateUserRoles(req, res);
  }
  getRolesByUserid(req, res) {
    UsersService.getRolesByUserid(req, res);
  }
  getAuthsByUserid(req, res) {
    UsersService.getAuthsByUserid(req, res);
  }
};
