module.exports = class Define {
  async _invoke(query, ...args) {
    try {
      var result = await query(...args);
      return {
        status: 200,
        result: result,
      };
    } catch (err) {
      return {
        status: 400,
        result: '' + err,
      };
    }
  }
  _response(status, result, code = 0, message = 'fail') {
    code = status !== 200 ? code : 1;
    message = status !== 200 ? message : 'success';
    return {
      code,
      message,
      result,
    };
  }
  _error(error, code = 0, message = 'fail') {
    this._response(400, error, code, message);
  }
};
