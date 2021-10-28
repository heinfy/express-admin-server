'use strict';

const mapRoutes = require('express-routes-mapper');
// const { groupedMiddleware } = require('../middleware');
const { apiRequestLogger } = require('../middleware/logger');
const auth = require('../middleware/auth');

const testRouterMaps = require('./test');
const baseRouterMaps = require('./base');
const usersRouterMaps = require('./users');
const rolesRouterMaps = require('./roles');

const PREFIX = '/api';

const adminRoutes = {
  ...testRouterMaps,
  ...usersRouterMaps,
  ...rolesRouterMaps,
};

const baseRoutes = {
  ...baseRouterMaps,
};

const adminMappedRoutes = mapRoutes(adminRoutes, 'controller/', [
  // groupedMiddleware,
  auth,
  apiRequestLogger,
]);

const baseMappedRoutes = mapRoutes(baseRoutes, 'controller/', [
  apiRequestLogger,
  // groupedMiddleware,
]);

module.exports = (app) => {
  app.use(PREFIX, baseMappedRoutes);
  app.use(PREFIX, adminMappedRoutes);
};
