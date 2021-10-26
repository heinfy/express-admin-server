const uid2 = require('uid2');
const Define = require('../utils/_define');
const { _resolve, _readFile } = require('../utils/_node');
const { query } = require('../mysql');
const jwt = require('../utils/jwt');
const md5 = require('../utils/md5');
const { decrypt } = require('../utils/crypto-node-rsa');
const { jwtSecret } = require('../config/config.default');

class usersService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取 user 列表
   */
  async users(req, res) {
    const sql = 'SELECT id, userid, email FROM user;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 新建 user
   */
  async create(req, res) {
    const { username, email, password } = req.body;
    const pwdMd5 = md5(decrypt(password));
    try {
      const sql_1 = 'SELECT * FROM `user` where `email`=?';
      // 判断 email 是否存在
      let results = await query(sql_1, [email]);
      if (results && results.length !== 0) {
        res.status(200).json(super._response(null, 0, 'email 已注册！'));
        return;
      }
      const sql_2 = 'INSERT INTO user SET ?';
      let user = {
        userid: uid2(10),
        username,
        email,
        password: pwdMd5,
      };
      console.log('user', user);
      // 新建用户
      await query(sql_2, user);
      delete user.password;
      res.status(200).json(super._response(user));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新 user 姓名、邮箱
   */
  async update(req, res) {
    const { userid, username = null, email = null } = req.body;
    try {
      const sql_1 = 'SELECT userid FROM `user` where `email`=?';
      const data = await query(sql_1, [email]);
      if (data.length > 0 && data[0].userid !== userid) {
        res.status(200).json(super._response(null, 0, `${email} 已被注册！`));
        return;
      }
      let sqlOptions = [];
      if (username) {
        sqlOptions.push({
          username: username,
        });
      }
      if (email) {
        sqlOptions.push({
          email: email,
        });
      }
      const fragment = sqlOptions
        .map((item) => `${Object.keys(item)[0]} = ?`)
        .join(', ');
      const sql = `UPDATE user SET ${fragment} WHERE userid = ?`,
        sqlArray = sqlOptions.map((item) => Object.values(item)[0]);
      await query(sql, [...sqlArray, userid]);
      let result = {};
      for (var item of sqlOptions) {
        result = { ...result, ...item };
      }
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 删除 user
   */
  async delete(req, res) {
    const { userid } = req.body;
    const sql = `DELETE FROM user WHERE userid = '${userid}';`;
    try {
      await query(sql);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
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
   * user 登出
   */
  async logout(req, res) {
    const sql = 'SELECT id, userid, email FROM user;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 获取当前登录用户
   */
  async getCurrentUser(req, res) {
    const sql = 'SELECT id, userid, email FROM user;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
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
