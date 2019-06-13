// set any environment variables with the dotenv package
require("dotenv").config();

var command = process.argv[2];
var input = process.argv[3];
// importing the keys file and storing it in a variable
var keys = require("keys.js");

// importing spotify
var Spotify = require('node-spotify-api');




if(command === "spotify-this-song"){
    Spotify.search({ type: 'track', query: "'" + input +"'" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}else{
    return("error")
}