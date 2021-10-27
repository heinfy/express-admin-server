const { verify } = require('../utils/jwt');
const Define = require('../utils/_define');
const { jwtSecret } = require('../config/config.default');

/**
 * @description 检查用户是否登录/登录是否过期的中间件
 */
module.exports = async (req, res, next) => {
  const token = req.headers.token;
  const _response = new Define()._response;
  if (token) {
    try {
      await verify(token, jwtSecret);
      next();
    } catch (error) {
      return res.status(400).json(_response(null, 0, error + ''));
    }
  } else {
    return res.status(400).json(_response(null, 0, '未获取 token, 请登录！'));
  }
};
