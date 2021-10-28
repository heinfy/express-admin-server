const { body } = require('express-validator');
const validator = require('../middleware/validate');

exports.create = validator([
  body('roleName').notEmpty().withMessage('角色名称不能为空'),
  body('roleDesc').notEmpty().withMessage('角色描述不能为空'),
  body('roleSort').notEmpty().withMessage('角色排序不能为空'),
]);

exports.update = validator([
  body('roleid').notEmpty().withMessage('角色 ID 不能为空'),
  body('roleName').notEmpty().withMessage('角色名称不能为空'),
  body('roleDesc').notEmpty().withMessage('角色描述不能为空'),
  body('roleSort').notEmpty().withMessage('角色排序不能为空'),
]);

exports.del = validator([
  body('roleid').notEmpty().withMessage('角色 ID 不能为空'),
]);
