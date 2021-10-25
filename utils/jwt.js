/*
 * @Author: houfei
 * @Date: 2021-08-22 21:00:25
 * @LastEditTime: 2021-08-22 23:02:23
 * @LastEditors: houfei
 * @Description: https://github.com/auth0/node-jsonwebtoken
 */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.sign = promisify(jwt.sign);
exports.verify = promisify(jwt.verify);
exports.decode = promisify(jwt.decode); // 不验证直接做解析

// const KEY = 'houfei';
// 生成 token
// jwt.sign({ foo: "bar" }, KEY); // 同步
// jwt.sign(
//   // 异步
//   {
//     foo: 'bar'
//   },
//   KEY,
//   (err, token) => {
//     if (err) {
//       return console.log('生成 token 失败');
//     }
//     console.log(token);
//   }
// );

// 验证 token
// const ret = jwt.verify('your token', KEY) // 同步
// jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2Mjk2Mzc2MjV9.m9XKr4cFmDA4z3xZQkaBiYxheSdqzO6exOTJF5QAtsI', KEY, (err, result) => {
//   if (err) {
//     return console.log('验证 token 失败');
//   }
//   console.log(result);
// });
