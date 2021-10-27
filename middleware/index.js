const groupedMiddleware = (req, res, next) => {
  console.log('全局中间件');
  next();
};

const check = (req, res, next) => {
  console.log('检验通过的中间件 check');
  next();
};

const verifyAuth = (req, res, next) => {
  console.log('校验不通过的中间件 verifyAuth');
  return res.status(400).json({
    status: false,
    message: "Sorry, you aren't authorized on facebook",
  });
};

module.exports = {
  groupedMiddleware,
  check,
  verifyAuth,
};
