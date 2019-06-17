// set any environment variables with the dotenv package
require("dotenv").config();

// importing the keys file and storing it in a variable
var keys = require("./keys");
const axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var movie = keys.ID.OMDB.id;
var bands = keys.ID.Bands.id;
var command = process.argv[2];
var input = process.argv[3];



// /////////////////////////// Spotify request
function getSongInfo() {
  var spotify = new Spotify({
    id: keys.ID.spotify.id,
    secret: keys.ID.spotify.secret,
  });

  if (input === "") {
    spotify.search({ type: 'track', query: "The Sign", limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("\r\n\r\n\r\n");

      var artist = data.tracks.items[0].name;
      var trackTitle = data.tracks.items[0].artists[0].name;
      var spotInfo = data.tracks.items[0].preview_url;
      console.log("You forgot to search for a song. Check this one out:")
      console.log("This song is by: " + trackTitle);
      console.log("This is the song I found: " + artist);
      console.log("Have a listen: " + spotInfo);
      
      // console.log(data.tracks.items.name); 
      // console.log(data.tracks.items.album); 
      console.log("\r\n\r\n\r\n");
    }
    )}else{
        spotify.search({ type: 'track', query: input, limit: 1 }, function (err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
          console.log("\r\n\r\n\r\n");

          var artist = data.tracks.items[0].name;
          var trackTitle = data.tracks.items[0].artists[0].name;
          var spotInfo = data.tracks.items[0].preview_url;
          var albumName = data.tracks.items[0].album.name;

          console.log("This song is by: " + trackTitle);
          console.log("This is the song I found: " + artist);
          console.log("Have a listen: " + spotInfo)
          console.log(albumName);

          console.log("\r\n\r\n\r\n");

        });
      };
    }
  



  ///////////////////////////// function to get movies
  function getMovieInfo() {
    console.log("\r\n\r\n\r\n");
    console.log("Here is the movie info you asked for: ")
    axios.get("http://www.omdbapi.com/?apikey=" + movie + "&t=" + input)
      .then(function (response) {

        // handle success
        console.log("Movie: " + response.data.Title);
        console.log("Relaeased: " + response.data.Year);
        console.log("IMDB rates it " + response.data.imdbRating);
        console.log("Rotten Tomatoes rates it: " + response.data.Ratings[1].Value);
        console.log("The movie was produced in: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot Summary: " + response.data.Plot);
        console.log("Starring: " + response.data.Actors);
        console.log("\r\n\r\n\r\n");

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
    console.log("\r\n\r\n\r\n");
    console.log("Here is that band info you asked for:")
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=" + bands)
      .then(function (response) {
        // handle success
        for (let index = 0; index < response.data.length; index++) {
          console.log("Venue: " + response.data[index].venue.name);
          console.log("State: " + response.data[index].venue.region);
          console.log("City: " + response.data[index].venue.city);
          moment(response.data[index].datetime).format("MM/DD/YYY");
          console.log(moment(response.data[index].datetime).format("MM/DD/YYY"))
          console.log("");
          console.log("\r\n\r\n\r\n");

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

  // switch case to run the program

  switch (command) {
    case "movie-this":
      //     // code block
      getMovieInfo()
      break;
    case "concert-this":
      bandsInTown()
      break;
    case "spotify-this-song":
      getSongInfo()
      break;
    //   default:
    //     // code block
  }