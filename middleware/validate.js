const { validationResult } = require('express-validator');
const Define = require('../utils/_define');

// parallel processing
exports = module.exports = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const errorsArray = errors.array();
    const _response =  new Define()._response;
    const result = _response(null, 0, errorsArray[0].msg);
    res.status(200).json(result);
  };
};
