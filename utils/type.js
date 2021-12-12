const isArray = (value) =>
  Object.prototype.toString.call(value) == '[object Array]';

const isFunction = (value) =>
  Object.prototype.toString.call(value) == '[object Function]';

const isRegExp = (value) =>
  Object.prototype.toString.call(value) == '[object RegExp]';

module.exports = {
  isArray,
  isFunction,
  isRegExp,
};
