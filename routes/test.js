var express = require('express');
const testController = require('../controllers/test');

var router = express.Router();

/* GET home page. */
router.get('/', testController.test);

module.exports = router;
