const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const comparePassword = (hash, password) => {
  return bcrypt.compareSync(password, hash);
};

const authVerified = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

// authenticate function middleware

module.exports = {
  hashPassword,
  comparePassword,
  authVerified,
};
