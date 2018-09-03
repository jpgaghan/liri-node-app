# liri-node-app
Open these files in your console.
you will have to create your own .env file with you spotify keys in it should look something like this
SPOTIFY_ID=XXXXXXXXXXXXXXXXXXXXXXXXX
SPOTIFY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXX
you will also have to install the following node modules

npm i moment
npm i node-cmd
npm i chalk
npm i node-spotify-api
npm i request
npm i bandsintown

after installing test the following commands in your console to pull information on a concert song or movie
node liri.js movie-this     followed by a space and a movie of your choosing
node liri.js concert-this   followed by a band you would like to see in concert
node liri.js spotify-this-song    followed by a song name you can also follow the song name with an artist name in case multiple artist sing the song you are searching for
node liri.js do-what-it-says    this will pull a command from the random.txt file and run it for example concert-this, "pink" or movie-this braveheart
