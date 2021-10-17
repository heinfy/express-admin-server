const TestModel = require('../model/test');
const _response = require('../utils/_response');

class TestController {
  constructor() {
    this.createAdmin = this.createAdmin.bind(this);
    this.Login = this.Login.bind(this);
  }
  /**
   * 获取测试列表
   * @param req
   * @param res
   * @returns Object {}
   */
  async userList(req, res) {
    await TestModel.find(
      {},
      '-password -password2 -created -updated -__v',
      async (err, docs) => {
        if (err) {
          return res.status(200).json(_response(0, '获取失败，请重试', null));
        } else {
          console.log(docs);
          if (!docs) {
            return res
              .status(200)
              .json(_response(0, '获取用户列表为空，请选择条件重试', null));
          } else {
            return res
              .status(200)
              .json(_response(1, '获取用户列表成功', docs, true));
          }
        }
      }
    );
  }
}

module.exports = new TestController();
