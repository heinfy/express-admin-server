const Define = require('../utils/_define');
const { _readFile, _resolve } = require('../utils/_node');

class ChaetService extends Define {
  constructor() {
    super();
  }
  /**
   * 获取历年出生人口图表
   */
  async barPopulation(req, res) {
    try {
      const result = await _readFile(
        _resolve('../json', 'population.json'),
        'utf-8'
      );
      res.status(200).json(super._response(JSON.parse(result)));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 获取天猫、京东历年销售额的图表
   */
  async barSaleVolume(req, res) {
    try {
      const result = await _readFile(
        _resolve('../json', 'saleVolume.json'),
        'utf-8'
      );
      res.status(200).json(super._response(JSON.parse(result)));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 获取工资
   */
  async profit(req, res) {
    try {
      const result = await _readFile(
        _resolve('../json', 'profit.json'),
        'utf-8'
      );
      res.status(200).json(super._response(JSON.parse(result)));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * 获取每月花销
   */
  async consumption(req, res) {
    try {
      const result = await _readFile(
        _resolve('../json', 'consumption.json'),
        'utf-8'
      );
      res.status(200).json(super._response(JSON.parse(result)));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new ChaetService();
