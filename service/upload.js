const Define = require('../utils/_define');
const { _readFile, _writeFile } = require('../utils/_node');

class UploadService extends Define {
  constructor() {
    super();
  }
  async upload(req, res) {
    try {
      var des_file = './upload/' + req.files[0].originalname;
      let data = _readFile(req.files[0].path);
      let result = _writeFile(des_file, data);
      console.log('result', result);
      res.status(200).json(super._response(req.files[0].originalname));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new UploadService();
