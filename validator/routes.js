const { body } = require('express-validator');
const validator = require('../middleware/validate');

exports.create = validator([
  body('route').notEmpty().withMessage('路由 KEY 不能为空'),
  body('routeName').notEmpty().withMessage('路由名称不能为空'),
  body('routeSort').notEmpty().withMessage('路由排序不能为空'),
]);

exports.update = validator([
  body('routeid').notEmpty().withMessage('路由 ID 不能为空'),
  body('route').notEmpty().withMessage('路由 KEY 不能为空'),
  body('routeName').notEmpty().withMessage('路由名称不能为空'),
  body('routeSort').notEmpty().withMessage('路由排序不能为空'),
]);

exports.del = validator([
  body('routeid').notEmpty().withMessage('路由 ID 不能为空'),
]);
