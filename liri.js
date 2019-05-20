require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');

var command = process.argv[2];
var input = process.argv[3];

commands(command, input);

function commands(command, input) {
    switch (command) {
        case "concert-this":
            searchConcert(input);
            break;

        case "spotify-this-song":
            searchSong(input);
            break;

        case "movie-this":
            searchMovie(input);
            break;

        case "do-what-it-says":
            searchRandom();
            break;

        default:
            console.log("You have not entered any command, please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' followed by parameter.");
    }
}

function searchConcert(input) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    request(queryUrl, function (error, response) {

        if (!error) {
            var concerts = JSON.parse(response);
            for (var i = 0; i < concerts.length; i++) {
                console.log(i);
                fs.appendFile("log.txt",
                    i + "\n"
                    + "Name of the Venue: " + concerts[i].venue.name + "\n"
                    + "Venue Location: " + concerts[i].venue.city + "\n"
                    + "Date of the Event: " + concerts[i].datetime + "\n");
                console.log(
                    i + " "
                    + "Name of the Venue: " + concerts[i].venue.name
                    + "Venue Location: " + concerts[i].venue.city
                    + "Date of the Event: " + concerts[i].datetime);
            }
        } else {
            console.log('There was an error. Please try again.');
        }
    });
}

commands(command, input);