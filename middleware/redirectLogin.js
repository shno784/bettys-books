const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        console.log(req.baseUrl)
        res.redirect('/users/login'); // Absolute path to users/login
    } else {
      next(); // move to the next middleware function
    }
  };

  module.exports = redirectLogin;