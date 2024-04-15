const appErr = require("../utils/appErr");

const protected = (req, res, next) => {
  if (req.session.userAuth) {
    next();
  } else {
    next(appErr("Not authorised login again"));
  }
};

module.exports = protected;
