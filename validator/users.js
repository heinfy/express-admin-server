const { body } = require('express-validator');
const { query } = require('../mysql');
const { decrypt } = require('../utils/crypto-node-rsa');
const md5 = require('../utils/md5');
const validator = require('../middleware/validate');
const Define = require('../utils/_define');

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
      try {
        const sql = 'SELECT email, password, userid FROM user WHERE email = ?';
        let result = await query(sql, [email]);
        if (result.length === 0) {
          return Promise.reject('用户不存在');
        }
        // 将数据库的 user 直接挂载到 req 上，以便后面的中间件使用！
        req.user = result[0];
      } catch (error) {
        const _response = new Define()._response;
        const result = _response(null, 0, error + '');
        res.status(200).json(result);
      }
    }),
  ]),
  validator([
    body('password').custom(async (password, { req }) => {
      if (md5(decrypt(password)) !== req.user.password) {
        return Promise.reject('密码错误');
      }
    }),
  ]),
];
