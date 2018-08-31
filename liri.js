var env = require("dotenv").config();

var keys = import("keys.js");

var spotify = new Spotify(keys.spotify);

var request = require('request')
var command = process.argv[2];

// if (command === "concert-this") {
    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
// }