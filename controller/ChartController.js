var ChartService = require('../service/chart');

module.exports = class ChartController {
  barPopulation(req, res) {
    ChartService.barPopulation(req, res);
  }
  barSaleVolume(req, res) {
    ChartService.barSaleVolume(req, res);
  }
  profit(req, res) {
    ChartService.profit(req, res);
  }
  consumption(req, res) {
    ChartService.consumption(req, res);
  }
  lineJson(req, res) {
    ChartService.lineJson(req, res);
  }
  WordCloud(req, res) {
    ChartService.WordCloud(req, res);
  }
};
