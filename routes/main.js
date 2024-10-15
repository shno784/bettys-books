// Create a new router
const express = require("express");
const router = express.Router();
const redirectLogin = require('../middleware/redirectLogin')

// Handle our routes
router.get("/", function (req, res, next) {
  res.render("index.ejs", { isLoggedIn: req.session.isLoggedIn });
});

router.get("/about", function (req, res, next) {
  res.render("about.ejs");
});

//Logout
router.get("/logout", redirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("./");
    }
    res.send("you are now logged out. <a href=" + "/" + ">Home</a>");
  });
});

// Export the router object so index.js can access it
module.exports = router;
