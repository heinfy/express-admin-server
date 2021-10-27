/* 
https://www.jb51.net/article/139290.htm
https://github.com/winstonjs/winston
https://github.com/bithavoc/express-winston
*/
const path = require('path');
const winston = require('winston');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

let DailyRotateFileTransport = (fileName) => {
  return new winston.transports.DailyRotateFile({
    // filename: path.join(process.env.LOGPATH, `${fileName}-%DATE%.log`),
    filename: path.join('./logs/', `${fileName}-%DATE%.log`),
    datePattern: 'YYYY-MM-DD-HH',
    // maxSize: '20m',
    maxFiles: '7d',
    timestamp: () => new Date().format('yyyy-MM-dd hh:mm:ss.S'),
  });
};

// 当使用 ejs 模板 渲染页面时，可用
let pageRequestLogger = expressWinston.logger({
  transports: [
    DailyRotateFileTransport('page-request'),
    // new winston.transports.Console()
  ],
  meta: true, // 可选：控制是否要记录有关请求的元数据（默认为true）
  msg: 'HTTP {{req.method}} {{req.url}}', // 可选:自定义默认日志消息 E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // 使用默认的Express / morgan请求格式。启用此功能将覆盖所有meta（如果为true）。仅输出colorize设置为true
  colorize: false, // 使用Express / morgan调色板为文本和状态代码着色（文本：灰色，状态：默认绿色，3XX青色，4XX黄色，5XX红色）。
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
  }, // 可选的：允许跳过基于请求和/或响应一些日志消息
});

let apiRequestLogger = (req, res, next) => {
  let send = res.send;
  let content = '';
  let query = req.query || {};
  let body = req.body || {};
  res.send = function () {
    content = arguments[0];
    send.apply(res, arguments);
  };
  expressWinston.logger({
    transports: [
      DailyRotateFileTransport('api-request'),
      // new winston.transports.Console()
    ],
    meta: true, // 可选：控制是否要记录有关请求的元数据（默认为true）
    msg() {
      return `HTTP ${'\n'} ${req.method} ${req.url}
        \n QUERY ${JSON.stringify(query)}
        \n BODY ${JSON.stringify(body)}
        \n DATA ${content} `;
    },
    colorize: true, // 使用Express / morgan调色板为文本和状态代码着色（文本：灰色，状态：默认绿色，3XX青色，4XX黄色，5XX红色）。
    ignoreRoute: function (req, res) {
      if (req.headers.self) return true;
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  })(req, res, next);
};

module.exports = {
  pageRequestLogger,
  apiRequestLogger,
};
