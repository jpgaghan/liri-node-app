
require("dotenv").config();

var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");
var cmd=require('node-cmd');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var request = require('request')
var command = process.argv[2];
var argument= process.argv[3];
var bandsintown = require('bandsintown')("codingbootcamp");

for (i = 4; i<process.argv.length; i++) {
    argument += `+ ${process.argv[i]}`
}

if (command === "movie-this") {
    request(`http://www.omdbapi.com/?t=${argument}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log(JSON.parse(body).Title);
    console.log(JSON.parse(body).Year);
    console.log(JSON.parse(body).imdbRating);
    console.log(JSON.parse(body).Ratings[1].Value);
    console.log(JSON.parse(body).Country);
    console.log(JSON.parse(body).Language);
    console.log(JSON.parse(body).Plot);
    console.log(JSON.parse(body).Actors);
  }
});
} else if (command === "concert-this") {
    bandsintown.getArtistEventList(argument)
  .then(function(events) {
    console.log(events[0].venue.name)
    console.log(events[1].formatted_location)
    console.log(moment(events[0].datetime).format('L'))
  });
} else if (command === "spotify-this-song") {
    spotify.search({type: 'track', query: argument, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    trackdata = data.tracks.items[0]
  console.log(trackdata.album.name); 
  console.log(trackdata.album.artists[0].name); 
  console.log(trackdata.preview_url)
  console.log(trackdata.name); 
});
} else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
        return console.log(err);
    }
    console.log(data)
    cmd.get(
        'node liri.js spotify-this-song iris',
        function(err, data, stderr){
            console.log('the current dir contains these files :\n\n',data)
        }
    );
});

}
