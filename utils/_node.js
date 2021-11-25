const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/**
 * 读文件
 */
exports._readFile = promisify(fs.readFile);

/**
 * 写文件
 */
exports._writeFile = promisify(fs.writeFile);

/**
 * 重命名
 */
exports._renameFile = promisify(fs.rename);

/**
 * 删除文件
 */
exports._deleteFile = promisify(fs.unlink);

/**
 * 获取绝对路径
 */
exports._resolve = (middlePath, dir) => path.join(__dirname, middlePath, dir);
