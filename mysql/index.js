var mysql = require('mysql');
var chalk = require('chalk');
var DBconfig = require('../config/db.config');

var NODE_ENV = process.env.NODE_ENV || 'development';

var db = mysql.createConnection(DBconfig[NODE_ENV]);

db.connect(function (err) {
  if (err) {
    console.log(chalk.green('error connecting: ' + err.stack));
    return;
  }
  console.log(chalk.green('connected as id ' + db.threadId));
});

// db.end(function () {
//   console.log(chalk.red('数据库断开，请重新连接数据库'));
// });

module.exports = db;
