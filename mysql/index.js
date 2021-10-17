var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'houfei',
  database: 'test',
});

connection.connect();

connection.query('SELECT * from article;', function (error, results) {
  if (error) throw error;
  console.log('RowDataPacket', results[0]);
});

connection.end();
