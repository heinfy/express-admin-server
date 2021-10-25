const uid2 = require('uid2');
const Define = require('../utils/_define');
const { pool, query } = require('../mysql');

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
      console.log(2222, result);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(400).json(super._response('' + error, 0));
    }
  }
  /**
   * 新建 user
   */
  async create(req, res) {
    const { username, email, password } = req.body;
    try {
      const sql_1 = 'SELECT * FROM `user` where `email`=?';
      // 判断 email 是否存在
      let results = await query(sql_1, [email]);
      if (results && results.length !== 0) {
        res.status(200).json(super._response('email 已注册！', 0));
        return;
      }
      const sql_2 = 'INSERT INTO user SET ?';
      let user = {
        userid: uid2(10),
        username,
        email,
        password,
      };
      // 新建用户
      await query(sql_2, user);
      delete user.password;
      res.status(200).json(super._response(user));
    } catch (error) {
      res.status(400).json(super._response('' + error, 0));
    }
  }
  /**
   * 更新 user 姓名、邮箱、密码
   */
  async update(req, res) {
    const { userid, username = null, email = null, password = null } = req.body;
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
    if (password) {
      sqlOptions.push({
        password: password,
      });
    }
    const fragment = sqlOptions
      .map((item) => `${Object.keys(item)[0]} = ?`)
      .join(', ');
    const sql = `UPDATE user SET ${fragment} WHERE userid = ?`;
    let sqlArray = sqlOptions.map((item) => Object.values(item)[0]);
    console.log(sql, sqlArray);
    try {
      let result = await query(sql, [...sqlArray, userid]);
      console.log(2222, result);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(400).json(super._response('' + error, 0));
    }
  }
  /**
   * 删除 user
   */
  async delete(req, res) {
    const sql = 'SELECT * from test;';
    const { status, result } = await query(sql);
    const response = super._response(status, result);
    res.status(status).json(response);
  }
}

module.exports = new usersService();
