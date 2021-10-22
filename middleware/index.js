const groupedMiddleware1 = (req, res, next) => {
  console.log('groupedMiddleware1');
  next();
};

const groupedMiddleware2 = (req, res, next) => {
  console.log('groupedMiddleware2');
  next();
};

const checkIfAutheticated = (req, res, next) => {
  console.log('authenticated');
  next();
};

const verifyFacebookAuth = (req, res, next) => {
  console.log('unverified');
  return res.status(400).json({
    status: false,
    message: "Sorry, you aren't authorized on facebook",
  });
};

module.exports = {
  groupedMiddleware1,
  groupedMiddleware2,
  checkIfAutheticated,
  verifyFacebookAuth,
};
