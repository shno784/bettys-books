const express = require("express");
const router = express.Router();
const redirectLogin = require("../middleware/redirectLogin");
const { check, validationResult } = require("express-validator");
const request = require("request");


router.get('/books', function (req, res, next) {

    let searchTerm = req.query.search_term || '%'
    console.log(searchTerm)
    // Query database to get all the books
    let sqlquery = "SELECT * FROM books where name LIKE ? "

    // Execute the sql query
    db.query(sqlquery, [searchTerm], (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})

router.get('/myfriendsbooks', function(req, res, next) {
    let url = 'https://www.doc.gold.ac.uk/usr/108/api/books';

    request(url, function (err, response, body) {
        if (err) {
          next(err);
        } else {
            const books = JSON.parse(body)
            console.log(books)
            res.render("myfriendsbooks", {books})
        }
      });

})

module.exports = router;