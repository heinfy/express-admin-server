var AuthsService = require('../service/auths');

module.exports = class AuthsController {
  auths(req, res) {
    AuthsService.auths(req, res);
  }
  create(req, res) {
    AuthsService.create(req, res);
  }
  update(req, res) {
    AuthsService.update(req, res);
  }
  delete(req, res) {
    AuthsService.delete(req, res);
  }
  getAuthInfoByAuthid(req, res) {
    AuthsService.getAuthInfoByAuthid(req, res);
  }
  updateAuthRoute(req, res) {
    AuthsService.updateAuthRoute(req, res);
  }
};
