const { body } = require('express-validator');
const validator = require('../middleware/validate');

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
