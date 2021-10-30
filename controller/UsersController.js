const UsersService = require('../service/users');
const LogController = require('../mongo/controller/log');

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
  getRoutesByUserid(req, res) {
    UsersService.getRoutesByUserid(req, res);
  }
  getLogList(req, res) {
    LogController.getLogList(req, res);
  }
};
