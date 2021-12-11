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
      const ret = await verify(token, jwtSecret);
      // 将 token 解析出来当前用户的 userid 挂载到 headers 上，以便接口使用
      req.headers.userid = ret.userid;
      next();
    } catch (error) {
      return res.status(200).json(_response(null, -1, error + ''));
    }
  } else {
    return res.status(200).json(_response(null, -1, '未获取 token, 请登录！'));
  }
};
