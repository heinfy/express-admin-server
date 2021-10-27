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
  getCurrentUser(req, res) {
    UsersService.getCurrentUser(req, res);
  }
};
