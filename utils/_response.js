module.exports = (statusCode, msg, data, success = false) => {
  return { statusCode, msg, data, success };
};
