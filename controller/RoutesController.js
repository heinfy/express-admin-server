var RoutesService = require('../service/routes');

module.exports = class AuthsController {
  routes(req, res) {
    RoutesService.routes(req, res);
  }
  create(req, res) {
    RoutesService.create(req, res);
  }
  update(req, res) {
    RoutesService.update(req, res);
  }
  delete(req, res) {
    RoutesService.delete(req, res);
  }
  getAuthInfoByAuthid(req, res) {
    RoutesService.getAuthInfoByAuthid(req, res);
  }
};
