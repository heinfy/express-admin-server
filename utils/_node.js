const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/**
 * 获取所有指定后缀名文件名
 * @param 文件夹目录
 * @param 文件后缀名
 */
exports.findFileBySuffix = (middlePath, dirs, fileName) => {
  let files = [];
  let absolutePath = path.join(__dirname, middlePath, dirs);
  let dirArray = fs.readdirSync(absolutePath);
  for (let d of dirArray) {
    files.push(d.replace(/(.*)(\.ejs)/, (a, b, c) => b));
  }
  return files;
};

/**
 * 读文件
 */
exports._readFile = promisify(fs.readFile);

/**
 * 获取绝对路径
 */
exports._resolve = (middlePath, dir) => path.join(__dirname, middlePath, dir);
