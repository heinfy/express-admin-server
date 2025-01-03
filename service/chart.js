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
  /**
   * 获取 line 页面的所有数据
   */
  async lineJson(req, res) {
    try {
      const consult = await _readFile(
        _resolve('../json', 'consult.json'),
        'utf-8'
      );
      const income = await _readFile(
        _resolve('../json', 'income.json'),
        'utf-8'
      );
      const temperature = await _readFile(
        _resolve('../json', 'temperature.json'),
        'utf-8'
      );
      res.status(200).json(
        super._response({
          consult: JSON.parse(consult),
          income: JSON.parse(income),
          temperature: JSON.parse(temperature),
        })
      );
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
  /**
   * WordCloud
   */
  async WordCloud(req, res) {
    try {
      const result = await _readFile(
        _resolve('../json', 'wordCloud.json'),
        'utf-8'
      );
      res.status(200).json(super._response(JSON.parse(result)));
    } catch (error) {
      res.status(200).json(super._response(null, 0, '' + error));
    }
  }
}

module.exports = new ChaetService();
