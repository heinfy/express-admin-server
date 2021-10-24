const mysql = require('mysql');
const chalk = require('chalk');
const DBconfig = require('../config/db.config');

const NODE_ENV = process.env.NODE_ENV || 'development';

const pool = mysql.createPool(DBconfig[NODE_ENV]);

// 'SELECT * FROM users WHERE id = ?', [userId]
// 'UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId]
// 'INSERT INTO posts SET ?', {},
// 'DELETE FROM posts WHERE title = "wrong"',
const query = function (...args) {
  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(chalk.green('error connecting: ' + err.stack));
        reject(err);
        return;
      }
      connection.query(...args, function (error, results, fields) {
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
