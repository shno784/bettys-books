const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('../users/login'); // Absolute path to users/login
    } else {
      next(); // move to the next middleware function
    }
  };

  module.exports = redirectLogin;