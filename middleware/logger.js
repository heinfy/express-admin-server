/*
 * https://www.jb51.net/article/139290.htm
 * https://github.com/winstonjs/winston
 * https://github.com/bithavoc/express-winston
 */

const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

const DailyRotateFileTransport = (fileName) => {
  return new winston.transports.DailyRotateFile({
    filename: path.join('./logs/', `${fileName}-%DATE%.log`), // process.env.LOGPATH
    datePattern: 'YYYY-MM-DD-HH',
    maxSize: '20m',
    maxFiles: '7d',
    timestamp: () => new Date().format('yyyy-MM-dd hh:mm:ss.S'),
  });
};

// 当使用模板渲染页面时可用
const pageRequestLogger = expressWinston.logger({
  transports: [
    DailyRotateFileTransport('page-request'),
    // new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  // 可选：控制是否要记录有关请求的元数据（默认为true）
  meta: true,
  // 可选:自定义默认日志消息 E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  msg: 'HTTP {{req.method}} {{res.responseTime}}ms {{req.url}}',
  // 使用默认的Express / morgan请求格式。启用此功能将覆盖所有meta（如果为true）。仅输出colorize设置为true
  expressFormat: true,
  // 使用Express / morgan调色板为文本和状态代码着色（文本：灰色，状态：默认绿色，3XX青色，4XX黄色，5XX红色）。
  colorize: false,
  // 可选的：允许跳过基于请求和/或响应一些日志消息
  ignoreRoute: function (req, res) {
    let notPageRequest = false;
    let ignoreArr = [
      '.svg',
      '.woff',
      '.ico',
      '.js',
      '.css',
      '.png',
      '.jpg',
      '.gif',
    ];
    ignoreArr.forEach((item) => {
      if (req.url.indexOf(item) > -1) notPageRequest = true;
    });
    return notPageRequest;
  },
});

const apiRequestLogger = (req, res, next) => {
  let send = res.send,
    content = '',
    method = req.method || null,
    query = req.query || null,
    params = req.params || null,
    body = req.body || null;
  res.send = function () {
    content = arguments[0];
    send.apply(res, arguments);
  };
  // console.log('headers', req.headers);
  // console.log('_startTime', req._startTime);
  expressWinston.logger({
    transports: [
      DailyRotateFileTransport('api-request'),
      // new winston.transports.Console(), // 在控制台打印详细日志
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    // 可选：控制是否要记录有关请求的元数据（默认为true）
    meta: false,
    msg() {
      return `请求方式: ${method}请求地址: ${req.url}路径参数: ${JSON.stringify(
        params
      )}问号参数: ${JSON.stringify(query)}请求参数: ${JSON.stringify(
        body
      )}返回值: ${content}`;
    },
    // 使用Express / morgan 调色板为文本和状态代码着色（文本：灰色，状态：默认绿色，3XX青色，4XX黄色，5XX红色）。
    colorize: true,
    // 允许根据请求和/或响应跳过某些日志消息
    ignoreRoute: () => false, // (req, res) => {},
  })(req, res, next);
};

module.exports = {
  pageRequestLogger,
  apiRequestLogger,
};
