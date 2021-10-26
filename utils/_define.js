module.exports = class Define {
  _response(result, code = 1, message = 'fail') {
    message = code === 1 ? 'success' : message;
    return {
      result,
      code,
      message,
    };
  }
};
