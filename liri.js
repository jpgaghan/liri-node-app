require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");
var cmd = require('node-cmd');
var chalk = require('chalk');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var request = require('request')
var command = process.argv[2];
var argument = process.argv[3];
var bandsintown = require('bandsintown')("codingbootcamp");

for (i = 4; i < process.argv.length; i++) {
    argument += `+${process.argv[i]}`
}

if (command === "movie-this") {
    if (process.argv[3] === undefined) {
        argument = `Mr.Nobody`
    }
    request(`http://www.omdbapi.com/?t=${argument}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log(`${chalk.red(JSON.parse(body).Title)}

${chalk.green('Release Year')}: ${chalk.blue(JSON.parse(body).Year)}
${chalk.green('IMDB Rating')}: ${chalk.blue(JSON.parse(body).imdbRating)}
${chalk.green('Rotten Tomatoes Rating')}: ${chalk.blue(JSON.parse(body).Ratings[1].Value)}
${chalk.green('Origin Country')}: ${chalk.blue(JSON.parse(body).Country)}
${chalk.green('Available Languages')}: ${chalk.blue(JSON.parse(body).Language)}
${chalk.green('Plot')}: ${chalk.blue(JSON.parse(body).Plot)}
${chalk.green('Actors')}: ${chalk.blue(JSON.parse(body).Actors)}`)
        }
        
    });
} else if (command === "concert-this") {
    bandsintown.getArtistEventList(argument).then(function (events) {
        console.log(`${chalk.red(argument)}
${chalk.green('Venue Name')}: ${events[0].venue.name}
${chalk.green('Location')}: ${events[1].formatted_location}
${chalk.green('Date')}: ${moment(events[0].datetime).format('L')}`
        )
    });
} else if (command === "spotify-this-song") {
    if (process.argv[3] === undefined) {
        argument = `"The Sign" Ace of Base`
    }
    spotify.search({ type: 'track', query: argument, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        trackdata = data.tracks.items[0];
        console.log(`
${chalk.red(trackdata.name)}

${chalk.green('Album')}: ${chalk.blue(trackdata.album.name)} 
${chalk.green('Artist')}: ${chalk.blue(trackdata.album.artists[0].name)} 
${chalk.green('Song Sample')}: ${chalk.blue(trackdata.preview_url)}`
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
            function (err, data, stderr) {
                console.log(data)
            }
        );
    });

}
