const { body } = require('express-validator');
const validator = require('../middleware/validate');
const { query } = require('../mysql');
const Define = require('../utils/_define');

exports.create = validator([
  body('pid').notEmpty().withMessage('该权限的父 ID 不能为空'),
  body('type').notEmpty().withMessage('权限类型不能为空'),
  body('authName').notEmpty().withMessage('权限名称不能为空'),
  body('authDesc').notEmpty().withMessage('权限描述不能为空'),
  body('authSort').notEmpty().withMessage('权限排序不能为空'),
]);

exports.update = validator([
  body('authid').notEmpty().withMessage('权限 ID 不能为空'),
  body('pid').notEmpty().withMessage('该权限的父 ID 不能为空'),
  body('type').notEmpty().withMessage('权限类型不能为空'),
  body('authName').notEmpty().withMessage('权限名称不能为空'),
  body('authDesc').notEmpty().withMessage('权限描述不能为空'),
  body('authSort').notEmpty().withMessage('权限排序不能为空'),
]);

exports.del = validator([
  body('authid').notEmpty().withMessage('角色 ID 不能为空'),
]);

exports.isMenu = [
  validator([
    body('authid').notEmpty().withMessage('权限 ID 不能为空'),
    body('routeid').notEmpty().withMessage('路由 ID 不能为空'),
  ]),
  validator([
    body('authid').custom(async (authid) => {
      try {
        const sql = 'SELECT authid, type FROM auth WHERE authid = ?';
        let result = await query(sql, [authid]);
        if (result.length === 0) {
          return Promise.reject('权限不存在');
        }
        if (result[0].type === 'button') {
          return Promise.reject('button 类型权限不能添加路由');
        }
      } catch (error) {
        const _response = new Define()._response;
        const result = _response(null, 0, error + '');
        res.status(200).json(result);
      }
    }),
  ]),
];
