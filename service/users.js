const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');
const md5 = require('../utils/md5');
const { decrypt } = require('../utils/crypto-node-rsa');

class usersService extends Define {
  constructor() {
    super();
    // 根据 emial 获取 user
    this.SQL_USER_EMAIL = 'SELECT * FROM `user` where `email`=?';
    // 根据邮箱获取 userid
    this.SQL_USERID_EMAIL = 'SELECT userid FROM `user` where `email`=?';
    // 新建用户
    this.SQL_USER = 'INSERT INTO user SET ?';
    // 给用户设置角色
    this.SQL_USER_ROLE = 'INSERT INTO user_role (`roleid`, `userid`) VALUES ?';
    // 根据 userid 获取用户信息
    this.SQL_USERINFO =
      'SELECT userid, username, email FROM `user` where `userid`=?';
    // 根据 userid 获取用户角色
    this.SQL_USERROLE =
      'SELECT r.roleid, r.roleName FROM user_role u, role r WHERE u.userid = ? and u.roleid = r.roleid;';
    // 根据 userid 获取用户权限
    this.SQL_USERAUTH =
      'SELECT a.authid, a.authName, a.type FROM user_role u, role_auth r, auth a WHERE u.userid = ? and u.roleid = r.roleid and r.authid = a.authid;';
    // 根据 userid 获取用户路由 菜单层级是有权限层级确定
    this.SQL_USERROUTE = `SELECT auth.pid, auth.authid, ru.routeid, ru.routeSort ,ru.route, ru.routeName, ru.icon, ru.routeSort FROM user_role ur, role_auth r, auth, auth_route a, route ru WHERE ur.userid = ? and ur.roleid = r.roleid and r.authid = auth.authid and r.authid = a.authid and a.routeid = ru.routeid;`;
  }
  /**
   * 获取 user 列表
   */
  async users(req, res) {
    const {
      page = 1,
      size = 20,
      userid = null,
      email = null,
      timeRange = null,
    } = req.query;
    const offset = (page - 1) * size,
      limit = size;
    let filterStr = '';
    if (userid) {
      filterStr += `userid like '%${userid}%'`;
    }
    if (email) {
      filterStr +=
        filterStr === ''
          ? `email like '%${email}%'`
          : `and email = '%${email}%'`;
    }
    if (timeRange && timeRange.length === 2) {
      const startTime = timeRange[0];
      const endTime = timeRange[1];
      const timeStr = `createdAt between '${startTime} 00:00:00' and '${endTime} 23:59:59'`;
      filterStr += filterStr === '' ? timeStr : `and ${timeStr}`;
    }
    //  offset 跳过多少条; limit 取多少条
    // const fragmentStr = 'u.userid = ur.userid and ur.roleid = r.roleid';
    const countStr = `LIMIT ${offset},${limit};`;
    const sql_1 = `SELECT userid, email, createdAt, updatedAt FROM user ${
      filterStr ? 'WHERE ' + filterStr : filterStr
    } ${countStr}`;
    const sql_2 = `SELECT COUNT(id) as total FROM user ${
      filterStr ? 'WHERE ' + filterStr : filterStr
    } ${countStr}`;
    try {
      let result_1 = await query(sql_1);
      let result_2 = await query(sql_2);
      let total = result_2[0]['total'];
      res.status(200).json(
        super._response({
          data: result_1,
          total,
        })
      );
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 新建 user
   */
  async create(req, res) {
    const { username, email, password, roleids = undefined } = req.body;
    const pwdMd5 = md5(decrypt(password));
    try {
      let results = await query(this.SQL_USER_EMAIL, [email]);
      if (results && results.length !== 0) {
        res.status(200).json(super._response(null, 0, 'email 已注册！'));
        return;
      }
      const userid = uid2(10);
      let user = {
        userid,
        username,
        email,
        password: pwdMd5,
      };
      // 新建用户
      await query(this.SQL_USER, user);
      // 赋予角色 如果 roleids 不存在，则自动赋予基础角色
      const params = (roleids && roleids.map((roleid) => [roleid, userid])) || [
        'g_TpK5',
        userid,
      ];
      await query(this.SQL_USER_ROLE, [[params]]);
      res.status(200).json(super._response(null));
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
      const data = await query(this.SQL_USERID_EMAIL, [email]);
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
    this.getUserInfo(userid, res);
  }
  /**
   * 根据 token 获取当前登录用户
   */
  async getCurrentUserInfo(req, res) {
    const { userid } = req.headers;
    this.getUserInfo(userid, res);
  }
  /**
   * 获取用户信息
   */
  async getUserInfo(userid, res) {
    try {
      // 获取用户信息
      const info = await query(this.SQL_USERINFO, [userid]);
      // 获取用户角色
      const roles = await query(this.SQL_USERROLE, [userid]);
      // 获取用户权限
      const auths = await query(this.SQL_USERAUTH, [userid]);
      // 获取用户路由
      const routes = await query(this.SQL_USERROUTE, [userid]);
      const userInfo = {
        info: info[0],
        roles: roles,
        auths: auths,
        routes: routes,
      };
      res.status(200).json(super._response(userInfo));
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
    const params = roleids.map((roleid) => [roleid, userid]);
    try {
      await query(this.SQL_USER_ROLE, [params]);
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
    try {
      // 删除原来的用户角色
      const sql = 'DELETE FROM user_role WHERE userid = ?;';
      await query(sql, [userid]);
      // 添加新的用户角色
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
    try {
      let result = await query(this.SQL_USERROLE, [userid]);
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
    try {
      let result = await query(this.SQL_USERAUTH, [userid]);
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
  /**
   * 根据 userid 获取用户路由
   */
  async getRoutesByUserid(req, res) {
    const { userid } = req.params;
    try {
      // 获取用户角色
      // let re = await query(this.SQL_USERROLE, [userid]);
      // const routeids = re.map((route) => `'${route.roleid}'`).join(',');
      // const sql = `SELECT ru.routeid, ru.route, ru.routeName, ru.icon, ru.routeSort FROM role_auth r, auth_route a, route ru WHERE r.roleid in (${routeids}) and r.authid = a.authid and a.routeid = ru.routeid;`;
      let result = await query(this.SQL_USERROUTE, [userid]);
      let obj = {};
      result = result.reduce(function (item, next) {
        obj[next.routeid] ? '' : (obj[next.routeid] = true && item.push(next));
        return item;
      }, []);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new usersService();
