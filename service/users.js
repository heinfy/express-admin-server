const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');
const md5 = require('../utils/md5');
const { decrypt } = require('../utils/crypto-node-rsa');

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
   * 根据 userid 获取用户信息
   */
  async getUserInfoByUserid(req, res) {
    const { userid } = req.params;
    const sql = 'SELECT id, userid, email FROM `user` where `userid`=?';
    try {
      let result = await query(sql, [userid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 token 获取当前登录用户
   */
  async getCurrentUserInfo(req, res) {
    const { userid } = req.headers;
    // TODO 这里将来要获取用户的角色，权限等所有信息
    const sql = 'SELECT id, userid, email FROM `user` where `userid`=?';
    try {
      let result = await query(sql, [userid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 给用户设置角色
   */
  async giveUserRoles(req, res) {
    const { userid, roleids } = req.body;
    // https://github.com/mysqljs/mysql/issues/2434
    // INSERT INTO resource (one, two, ...) VALUES  (?, ?, ?, ?), (?, ?, ?, ?), [...];
    // INSERT INTO user_role (roleid, userid) VALUES ("BN3Uvludoi", "hjs8vs"), ("BN3Uvludoi", "5ikcWP");
    // https://blog.csdn.net/lym152898/article/details/78246230
    let sql = 'INSERT INTO user_role (`roleid`, `userid`) VALUES ?';
    let params = roleids.map((roleid) => [roleid, userid]);
    try {
      await query(sql, [params]);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新用户角色
   */
  async updateUserRoles(req, res) {
    const { userid } = req.body;
    let sql = 'DELETE FROM user_role WHERE userid = ?;';
    try {
      await query(sql, [userid]);
      this.giveUserRoles(req, res);
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 userid 获取用户角色
   */
  async getRolesByUserid(req, res) {
    const { userid } = req.params;
    let sql =
      'SELECT r.roleid, r.roleName FROM user_role u, role r WHERE u.userid = ? and u.roleid = r.roleid;';
    try {
      let result = await query(sql, [userid]);
      console.log('result', result);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 userid 获取用户权限
   */
  async getAuthsByUserid(req, res) {
    const { userid } = req.params;
    //  select * from user,user_role,authority, authority_role WHERE user.id = user_role.user_id and user_role.role_id = authority_role.role_id and authority_role.authority_id = authority.id WHERE user.id = '';
    let sql =
      'SELECT a.authid, a.authName, a.type FROM user_role u, role_auth r, auth a WHERE u.userid = ? and u.roleid = r.roleid and r.authid = a.authid;';
    try {
      let result = await query(sql, [userid]);
      /**
       * js中数组对象去重:
       * https://www.jb51.net/article/154887.htm
       * https://www.jianshu.com/p/7c12cbaa817b
       */
      let obj = {};
      result = result.reduce(function (item, next) {
        obj[next.authid] ? '' : (obj[next.authid] = true && item.push(next));
        return item;
      }, []);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new usersService();
