let multer = require('multer');
let upload = multer({ dest: 'upload/' });

module.exports = {
  'POST /upload': {
    path: 'UploadController.upload',
    middlewares: [upload.any()],
  },
};
