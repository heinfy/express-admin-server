'use strict';

const mapRoutes = require('express-routes-mapper');
const { groupedMiddleware1 } = require('../middleware');
const { apiRequestLogger } = require('../middleware/logger');
const auth = require('../middleware/auth');

const testRouterMaps = require('./test');
const usersRouterMaps = require('./users');

const PREFIX = '/api';

const routes = {
  ...testRouterMaps,
  ...usersRouterMaps,
};

const mappedRoutes = mapRoutes(routes, 'controller/', [
  auth,
  apiRequestLogger,
  groupedMiddleware1,
]);

module.exports = (app) => app.use(PREFIX, mappedRoutes);
