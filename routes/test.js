var express = require('express');
const testController = require('../controller/test');

var router = express.Router();

router.get('/', testController.getTestList);

module.exports = router;
