/*
 * @Author: houfei
 * @Date: 2021-08-22 13:51:30
 * @LastEditTime: 2021-08-22 13:57:42
 * @LastEditors: houfei
 * @Description:
 */
const crypto = require('crypto');

// 获取 crypto 支持的散列算法
// console.log(crypto.getHashes());

module.exports = (str) => {
  return crypto
    .createHash('md5')
    .update('houfei' + str)
    .digest('hex');
};
