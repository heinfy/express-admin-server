const HomeService = require('../service/home');

module.exports = class HomeController {
  daily(req, res) {
    HomeService.daily(req, res);
  }
};
