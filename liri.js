// set any environment variables with the dotenv package
require("dotenv").config();

// importing the keys file and storing it in a variable
var keys = require("./keys");
const axios = require('axios');
var movie = keys.OMDB.id
// var Spotify = require('node-spotify-api');
var command = process.argv[3];
var input = process.argv[4];



function getSongInfo() {
  var spotify = new Spotify(keys.spotify);

  if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: "'" + input + "'" }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(data);
    });
  };
}

function getMovieInfo() {
  axios.get("http://www.omdbapi.com/?apikey="+movie+"&t=Batman&page=1")
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

getMovieInfo()