const Define = require('../utils/_define');
const { _readFile, _resolve } = require('../utils/_node');

class HomeService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取每日推荐
   */
  async daily(req, res) {
    const { page = 1, size = 5 } = req.body;
    try {
      const result = await _readFile(
        _resolve('../json', 'randomuser.me.json'),
        'utf-8'
      );
      const list = JSON.parse(result).slice((page - 1) * size, size);
      res.status(200).json(super._response(list));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new HomeService();
