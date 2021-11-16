module.exports = {
  // 获取历年出生人口图表
  'GET /chart/bar/population': {
    path: 'ChartController.barPopulation',
  },
  // 获取天猫、京东历年销售额的图表
  'GET /chart/bar/saleVolume': {
    path: 'ChartController.barSaleVolume',
  },
  // 获取工资
  'GET /chart/bar/profit': {
    path: 'ChartController.profit',
  },
  // 获取每月花销
  'GET /chart/bar/consumption': {
    path: 'ChartController.consumption',
  },
  // 获取每月花销
  'GET /chart/line/getJson': {
    path: 'ChartController.lineJson',
  },
};
