const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/**
 * 读文件
 */
exports._readFile = promisify(fs.readFile);

/**
 * 获取绝对路径
 */
exports._resolve = (middlePath, dir) => path.join(__dirname, middlePath, dir);
