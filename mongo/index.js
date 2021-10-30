const mongoose = require('mongoose');
const chalk = require('chalk');

const BASEURL =
  'mongodb+srv://expressAdmin:fNsCkk8XOJWCi4kk@cluster0.dzndl.mongodb.net/log?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  socketTimeoutMS: 45000,
  keepAlive: true,
};

const mongoDB = mongoose.connection;

mongoDB.once('open', () => {
  console.log(chalk.green('成功连接到 mongoDB 数据库'));
});

mongoDB.once('error', () => {
  console.log(chalk.green('连接 mongoDB 数据库失败'));
});

mongoDB.once('close', () => {
  console.log(chalk.red('数据库断开，请重新连接数据库'));
});

mongoose.connect(BASEURL, options, (err, db) => {
  if (err) return console.log(chalk.red('' + err));
  console.log(chalk.green('连接数据库成功: ' + typeof db));
});

module.exports = mongoose;
