'use strict';

const mapRoutes = require('express-routes-mapper');
const { groupedMiddleware1, groupedMiddleware2 } = require('../middleware');

const testRouterMaps = require('./test');

const PREFIX = '/api';

const routes = {
  ...testRouterMaps,
};

const mappedRoutes = mapRoutes(routes, 'controller/', [
  groupedMiddleware1,
  groupedMiddleware2,
]);

module.exports = (app) => app.use(PREFIX, mappedRoutes);
