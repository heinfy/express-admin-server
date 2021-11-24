var uploadService = require('../service/upload');

module.exports = class UploadController {
  upload(req, res) {
    uploadService.upload(req, res);
  }
};
