const { checkIfAutheticated, verifyFacebookAuth } = require('../middleware');

module.exports = {
  'GET /test/:id': {
    path: 'TestController.getTestList',
    middlewares: [checkIfAutheticated, verifyFacebookAuth],
  },
  'POST /test': 'TestController.create',
  'GET /test': 'TestController.getTestList',
};
