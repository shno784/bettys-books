const express = require("express");
const router = express.Router();
const redirectLogin = require("../middleware/redirectLogin");
const { check, validationResult } = require("express-validator");
const request = require("request");


router.get('/books', function (req, res, next) {

    // Query database to get all the books
    let sqlquery = "SELECT * FROM books"

    // Execute the sql query
    db.query(sqlquery, (err, result) => {
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
    let url = 'https://www.doc.gold.ac.uk/usr/109/api/books';

    request(url, function (err, response, body) {
        if (err) {
          next(err);
        } else {
            const books = JSON.parse(body)
            res.json(books)
        }
      });

})

module.exports = router;