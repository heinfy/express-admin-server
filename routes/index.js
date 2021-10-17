'use strict';

const homeRouter = require('./home');
const usersRouter = require('./users');
const testRouter = require('./test');

const PREFIX = '/api';

const routes = [
  {
    key: '/',
    router: homeRouter,
  },
  {
    key: '/users',
    router: usersRouter,
  },
  {
    key: '/test',
    router: testRouter,
  },
];

module.exports = (app) => {
  routes.forEach(function (route) {
    app.use(`${PREFIX}${route.key}`, route.router);
  });
};
