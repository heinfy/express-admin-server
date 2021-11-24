var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes');
var app = express();

console.log('ENV:', process.env.NODE_ENV);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置静态资源路径
app.use(express.static(path.join(__dirname, 'upload')));

router(app);

module.exports = app;
