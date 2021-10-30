const LogModel = require('../model/log');

class LogController {
  constructor() {
    this.createLog = this.createLog.bind(this);
    this.getLogList = this.getLogList.bind(this);
  }
  /**
   * 创建日志
   */
  createLog(req, res, next) {
    // 过滤掉 /getLogList? 接口，不创建日志
    if (req.url.indexOf('/getLogList?') > -1) {
      next();
      return;
    }
    let send = res.send;
    let content = '';
    res.send = async function () {
      content = arguments[0] && JSON.parse(arguments[0]).result;
      send.apply(res, arguments);
      const userid = req.headers.userid,
        url = req.url,
        method = req.method,
        params = req.params || null,
        query = req.query || null,
        body = req.body || null,
        headers = req.headers,
        _startTime = req._startTime;
      let requestInfo = {
        userid,
        url,
        method,
        params,
        query,
        body,
        content,
        headers,
        _startTime,
      };
      try {
        const logInfo = await new LogModel(requestInfo);
        await logInfo.save();
      } catch (err) {
        console.error('' + err);
      }
    };
    next();
  }
  /**
   * 获取日志列表
   */
  async getLogList(req, res) {
    try {
      const { size = 20, page = 0, userid, url, method } = req.query;
      const offset = (page - 1) * size,
        limit = size;
      const filter = {};
      if (userid) {
        filter.userid = userid;
      }
      if (url) {
        filter.url = url;
      }
      if (method) {
        filter.method = method;
      }
      const data = await LogModel.find(filter)
        .skip(Number(offset)) // 跳过多少条
        .limit(Number(limit)) // 取多少条
        .sort({
          createAt: -1, // -1：倒序 1：升序
        });
      const count = await LogModel.countDocuments(filter);
      res.status(200).json({
        result: {
          data,
          count,
        },
        code: 1,
        message: 'success',
      });
    } catch (err) {
      return res.status(200).json({
        result: null,
        code: 0,
        message: '' + err,
      });
    }
  }
}

module.exports = new LogController();