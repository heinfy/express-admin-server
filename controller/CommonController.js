const CommonService = require('../service/common');

module.exports = class CommonController {
  column(req, res) {
    CommonService.column(req, res);
  }
  operate(req, res) {
    CommonService.operate(req, res);
  }
};
