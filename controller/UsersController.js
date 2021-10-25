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
  login(req, res) {
    UsersService.login(req, res);
  }
  logout(req, res) {
    UsersService.logout(req, res);
  }
  getCurrentUser(req, res) {
    UsersService.getCurrentUser(req, res);
  }
};
