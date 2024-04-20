const appErr = require("../utils/appErr");

const protected = (req, res, next) => {
  let token = JSON.stringify(req.headers["token"]);
  if (token.replace(/^"(.*)"$/, "$1") || req.session.userAuth) {
    next();
  } else {
    next(appErr("Not authorised login again"));
  }
};

module.exports = protected;
