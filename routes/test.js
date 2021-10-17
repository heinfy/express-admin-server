var express = require('express');
const testController = require('../controller/test');

var router = express.Router();

/* GET home page. */
router.get('/', testController.test);

module.exports = router;
// function (req, res, next) {
//   res.status(200).json({
//     statusCode: 1,
//     msg: '成功',
//     data: {},
//   });
// }