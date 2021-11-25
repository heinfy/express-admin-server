const Define = require('../utils/_define');
const path = require('path');
const { _resolve, _renameFile, _deleteFile } = require('../utils/_node');

class UploadService extends Define {
  constructor() {
    super();
  }
  async upload(req, res) {
    try {
      // 删除每次上传的文件
      _deleteFile(path.join(__dirname, '../', req.files[0].path));
      const result = {
        path: `//localhost:3000/upload/007b223e23640509ee914bcaab3c8fb5.jpeg`,
        fileName: req.files[0].originalname,
        size: req.files[0].size,
      };
      res
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .json(super._response(result));
      /* TODO 真实上传使用一下注释代码 
      const port = process.env.PORT || '3000';
      // 拿到后缀名
      const extname = path.extname(req.files[0].originalname);
      // 拼接新的文件路径，文件加上后缀名
      const newPath = req.files[0].path + extname;
      // 重命名
      await _renameFile(req.files[0].path, newPath);
      const result = {
        path: `//localhost:${port}/${newPath}`,
        fileName: req.files[0].originalname,
        size: req.files[0].size,
      };
      res.status(200).json(super._response(result));
      */
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new UploadService();
