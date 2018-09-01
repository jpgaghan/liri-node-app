
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
    if (process.argv[3] === undefined) {
        argument = `Mr.Nobody`
    }
    request(`http://www.omdbapi.com/?t=${argument}&y=&plot=short&apikey=trilogy`, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log(`${JSON.parse(body).Title}
Release Year: ${JSON.parse(body).Year}
IMDB Rating: ${JSON.parse(body).imdbRating}
Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[1].Value}
Origin Country: ${JSON.parse(body).Country}
Available Languages: ${JSON.parse(body).Language}
Plot: ${JSON.parse(body).Plot}
Actors: ${JSON.parse(body).Actors}`)
  }
});
} else if (command === "concert-this") {
    
    bandsintown.getArtistEventList(argument).then(function(events) {console.log(`Venue Name: ${events[0].venue.name}
Location: ${events[1].formatted_location}
Date: ${moment(events[0].datetime).format('L')}`
  )
  });
} else if (command === "spotify-this-song") {
    if (process.argv[3] === undefined) {
        argument = `"The Sign" Ace of Base`
    }
    spotify.search({type: 'track', query: argument, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    trackdata = data.tracks.items[0];
    console.log(`
Album: ${trackdata.album.name} 
Artist: ${trackdata.album.artists[0].name} 
Song Sample: ${trackdata.preview_url}
Song Name: ${trackdata.name}`
    )
});
} else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
        return console.log(err);
    }
    data = data.replace(`"`, "");
    data = data.replace(`,`, "");
    cmd.get(
        `node liri.js ${data}`,
        function(err, data, stderr){
            console.log(data)
        }
    );
});

}
