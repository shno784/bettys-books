const express = require("express");
const router = express.Router();
const request = require("request");
const { check, validationResult } = require("express-validator");

router.get("/", function (req, res, next) {
  let apiKey = "a2080db9f53f55d0d02b8815a0bb2a97";
  let city = req.sanitize(req.query.city) || "london";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  request(url, function (err, response, body) {
    if (err) {
      next(err);
    } else {
      var weather = JSON.parse(body);
      if (weather !== undefined && weather.main !== undefined) {
        var wmsg =
          "Name: " +
          weather.name +
          "<br>" +
          "Country: " +
          weather.sys.country +
          "<br>" +
          "Temperature: " +
          weather.main.temp +
          " °C <br>" +
          "Feels Like: " +
          weather.main.feels_like +
          " °C <br>" +
          "Wind Speed: " +
          weather.wind.speed +
          "<br>" +
          "Humidity: " +
          weather.main.humidity;

        res.render("weather", { wmsg });
      } else {
        res.send("No data found");
      }
    }
  });
});

module.exports = router;
