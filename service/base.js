const Define = require('../utils/_define');
const { _resolve, _readFile } = require('../utils/_node');
const jwt = require('../utils/jwt');
const { jwtSecret } = require('../config/config.default');

class usersService extends Define {
  constructor() {
    super();
  }
  /**
   * user 登录
   */
  async login(req, res) {
    try {
      // 处理请求 中间件会将请求对象挂载到 req 上
      const { userid } = req.user;
      const token = await jwt.sign(
        {
          userid,
        },
        jwtSecret,
        {
          expiresIn: 60 * 60 * 24, // '365d'
        }
      );
      res.status(200).json(super._response({ token }));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 获取公钥，登录时为密码加密
   */
  async getPublicKey(req, res) {
    try {
      const keyPath = _resolve('../pem', 'public.pem');
      let result = await _readFile(keyPath, 'utf8');
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new usersService();
