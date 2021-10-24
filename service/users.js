const uid2 = require('uid2');
const Define = require('../utils/_define');
const { pool, query } = require('../mysql');

class TestService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取 user 列表
   */
  async users(req, res) {
    const sql = 'SELECT id, userid, email FROM user;';
    const { status, result } = await super._invoke(query, sql);
    const response = super._response(status, result);
    res.status(status).json(response);
  }
  /**
   * 新建 user
   */
  async create(req, res) {
    const userid = uid2(10);
    const { username, email, password } = req.body;
    pool.getConnection(function (err, connection) {
      if (err) {
        res.status(400).json({ response: err });
        return false;
      }
      // 判断 email 是否存在
      connection.query(
        'SELECT * FROM `user` where `email`=?',
        [email],
        function (error, results) {
          if (error) {
            connection.release();
            res.status(400).json({ response: error });
          }
          if (results && results.length !== 0) {
            console.log(111);
            connection.release();
            res.status(200).json({ response: 'email 已注册！' });
            return false;
          }
        }
      );
      const user = {
        userid,
        username,
        email,
        password,
      };
      // 新建用户
      connection.query('INSERT INTO user SET ?', user, function (error) {
        console.log(222);
        if (error) {
          connection.release();
          res.status(400).json({ response: error });
          return false;
        }
        delete user.password;
        connection.release();
        res.status(200).json({ response: 'email 已注册！' });
        return false;
      });
    });
    // console.log(status, result, 2);
    // res.status(status).json({ response: super._response(status, result) });
  }
  /**
   * 更新 user
   */
  async update(req, res) {
    const sql = 'SELECT * from article;';
    const { status, result } = await super._invoke(query, sql);
    const response = super._response(status, result);
    res.status(status).json(response);
  }
  /**
   * 删除 user
   */
  async delete(req, res) {
    const sql = 'SELECT * from article;';
    const { status, result } = await super._invoke(query, sql);
    const response = super._response(status, result);
    res.status(status).json(response);
  }
}

module.exports = new TestService();
