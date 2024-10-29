const express = require("express");
const router = express.Router();
const redirectLogin = require("../middleware/redirectLogin");
const { check, validationResult } = require("express-validator");



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

module.exports = router;