var BaseService = require('../service/base');

module.exports = class BaseController {
  login(req, res) {
    BaseService.login(req, res);
  }

  getPublicKey(req, res) {
    BaseService.getPublicKey(req, res);
  }
};
