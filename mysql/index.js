var mysql = require('mysql');
var chalk = require('chalk');
var DBconfig = require('../config/db.config');

var NODE_ENV = process.env.NODE_ENV || 'development';

var pool = mysql.createPool(DBconfig[NODE_ENV]);

var query = function (sql) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(chalk.green('error connecting: ' + err.stack));
        reject(err);
        return;
      }
      connection.query(sql, function (error, results, fields) {
        connection.release();
        if (error) {
          reject(error);
          console.log(chalk.green('error query: ' + error));
          return;
        }
        resolve(results);
      });
    });
  });
};

module.exports = { pool, query };
