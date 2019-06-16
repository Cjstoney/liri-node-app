// set any environment variables with the dotenv package
require("dotenv").config();

// importing the keys file and storing it in a variable
var keys = require("./keys");
const axios = require('axios');
var movie = keys.ID.OMDB.id
// var Spotify = require('node-spotify-api');
var command = process.argv[2];
var input = process.argv[3];

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


///////////////////////////// function to get movies
function getMovieInfo() {

  console.log("Here is the movie info you asked for: ")
  axios.get("http://www.omdbapi.com/?apikey=" + movie + "&t=" + input)
    .then(function (response) {
      // handle success
      console.log("Movie: " + response.data.Title);
      console.log("Relaeased: " + response.data.Year);
      console.log("IMDB rates it " + response.data.imdbRating);
      console.log("Rotten Tomatoes rates it: " + response.data.Ratings[1].source);
      console.log("The movie was produced in: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot Summary: " + response.data.Plot);
      console.log("Starring " + response.data.Actors);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
    });
}


// //////////////////////// function for Bands

function bandsInTown() {
  console.log("Here is that band info you asked for:")
  axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // handle success
      for (let index = 0; index < response.data.length; index++) {
        console.log("venue: " + response.data[index].venue.name);
        console.log("State: " + response.data[index].venue.region);
        console.log("City: " + response.data[index].venue.city);
        console.log("");
      }
      // console.log(response.data[0].venue);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

// switch case

switch (command) {
  case "movie-this":
    //     // code block
    getMovieInfo()
    break;
  case "concert-this":
    bandsInTown()
    break;
  //   default:
  //     // code block
}