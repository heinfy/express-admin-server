const uid2 = require('uid2');
const Define = require('../utils/_define');
const { query } = require('../mysql');
const md5 = require('../utils/md5');
const { decrypt } = require('../utils/crypto-node-rsa');

class rolesService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取 roles 列表
   */
  async roles(req, res) {
    const sql =
      'SELECT roleid, roleName, roleDesc, roleSort, createdAt, updatedAt FROM role;';
    try {
      let result = await query(sql);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 新建 role
   */
  async create(req, res) {
    const { roleName, roleDesc, roleSort } = req.body;
    try {
      const sql = 'INSERT INTO role SET ?';
      let role = {
        roleid: uid2(6),
        roleName,
        roleDesc,
        roleSort,
      };
      await query(sql, role);
      res.status(200).json(super._response(role));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 更新 role 名称、描述、排序
   */
  async update(req, res) {
    const { roleid, roleName, roleDesc, roleSort } = req.body;
    try {
      let sqlOptions = [];
      if (roleName) {
        sqlOptions.push({
          roleName: roleName,
        });
      }
      if (roleDesc) {
        sqlOptions.push({
          roleDesc: roleDesc,
        });
      }
      if (roleSort) {
        sqlOptions.push({
          roleSort: roleSort,
        });
      }
      const fragment = sqlOptions
        .map((item) => `${Object.keys(item)[0]} = ?`)
        .join(', ');
      const sql = `UPDATE role SET ${fragment} WHERE roleid = ?`,
        sqlArray = sqlOptions.map((item) => Object.values(item)[0]);
      await query(sql, [...sqlArray, roleid]);
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
   * 根据 roleid 删除 role
   */
  async delete(req, res) {
    const { roleid } = req.body;
    const sql = `DELETE FROM role WHERE roleid = '${roleid}';`;
    try {
      await query(sql);
      res.status(200).json(super._response(null));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 根据 roleid 获取角色信息
   */
  async getRoleInfoByRoleid(req, res) {
    const { roleid } = req.params;
    const sql = 'SELECT  roleid, roleName, roleDesc, roleSort, createdAt, updatedAt FROM `role` where `roleid`=?';
    try {
      let result = await query(sql, [roleid]);
      res.status(200).json(super._response(result));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new rolesService();
