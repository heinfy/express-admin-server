const { body } = require('express-validator');
// const { User } = require('../model');
const md5 = require('../utils/md5');
const validator = require('../middleware/validate');

exports.register = validator([
  body('username').notEmpty().withMessage('用户名不能为空'),
  body('password').notEmpty().withMessage('密码不能为空'),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .isEmail()
    .withMessage('邮箱格式不正确'),
]);

exports.update = validator([
  body('username').notEmpty().withMessage('用户名不能为空'),
  body('email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .isEmail()
    .withMessage('邮箱格式不正确'),
]);

exports.del = validator([
  body('userid').notEmpty().withMessage('用户 ID 不能为空'),
]);

exports.login = [
  validator([
    body('email').notEmpty().withMessage('邮箱不能为空'),
    body('password').notEmpty().withMessage('密码不能为空'),
  ]),
  validator([
    body('email').custom(async (email, { req }) => {
      const user = await User.findOne({ email }).select([
        'email',
        'password',
        'username',
        'bio',
        'image',
      ]);
      if (!user) {
        return Promise.reject('用户不存在');
      }
      // 将请求对象挂载到 req 上
      req.user = user;
    }),
  ]),
  validator([
    body('password').custom(async (password, { req }) => {
      console.log('判断密码时的用户：', req.user);
      if (md5(password) !== req.user.password) {
        return Promise.reject('密码错误');
      }
    }),
  ]),
];
