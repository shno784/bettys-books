const express = require("express");
const router = express.Router();

router.get("/search", redirectLogin, function (req, res, next) {
  res.render("search.ejs");
});

router.get("/search_result", redirectLogin, function (req, res, next) {
  // Search the database
  let sqlquery =
    "SELECT * FROM books WHERE name LIKE '%" + req.query.search_text + "%'"; // query database to get all the books
  // execute sql query
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("list.ejs", { availableBooks: result });
  });
});

router.get("/list", redirectLogin, function (req, res, next) {
  let sqlquery = "SELECT * FROM books"; // query database to get all the books
  // execute sql query
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("list.ejs", { availableBooks: result });
  });
});

router.get("/addbook", redirectLogin, function (req, res, next) {
  res.render("addbook.ejs");
});

router.post("/bookadded", redirectLogin, function (req, res, next) {
  // saving data in database
  let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
  // execute sql query
  let newrecord = [req.body.name, req.body.price];
  db.query(sqlquery, newrecord, (err, result) => {
    if (err) {
      next(err);
    } else
      res.send(
        " This book is added to database, name: " +
          req.body.name +
          " price " +
          req.body.price
      );
  });
});

router.get("/bargainbooks", function (req, res, next) {
  let sqlquery = "SELECT * FROM books WHERE price < 20";
  db.query(sqlquery, (err, result) => {
    if (err) {
      next(err);
    }
    res.render("bargains.ejs", { availableBooks: result });
  });
});

// Export the router object so index.js can access it
module.exports = router;
