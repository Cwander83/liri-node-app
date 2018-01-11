require("dotenv").config();
const keys = require("./keys")
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require("fs");

var userInput = process.argv[2];
var Input = process.argv[3];

fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log("readfile: " + error);
    } else if (userInput === "my-tweets") {
        console.log(Tweets());
    } else if (userInput === "spotify-this-song") {
        console.log(spotifySearch());
    } else if (userInput === "movie-this") {
        console.log(movieSearch());
    }
});

// functions ------------------------------------

//function for twitter to find the last 20 tweets
//from the dummy account i created
function Tweets() {
    const client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'chriswandermail',
        count: 21
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < 20; i++) {
                console.log("");
                console.log("#" + i + ": " + tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("");
                console.log("=======================");
                // console.log(materials.map(material => material.length));
            }
        } else {
            console.log("twitter: " + error);
        }
    });
}
// function for spotify, to search for songs,
function spotifySearch() {
    const spotify = new Spotify(keys.spotify);

    spotify.search({
        type: 'track',
        query: Input,
        limit: 5
    }, function (err, data) {
        let song = data.tracks.items[0];
        if (err) {
            return console.log('Error occurred: ' + err);
        };
        console.log(data.tracks.href);
        console.log("function spotify: " + song.name);
        console.log("function spotify: " + song.album.name);
        console.log("function spotify: " + song.href);
    });

}
//function for the movie search----------
function movieSearch() {
    request("http://www.omdbapi.com/?t=" + Input + "&y=&plot=short&apikey=83c5fdcd", function (error, response, body) {

        movie = JSON.parse(body);
        if (!error) {
            console.log("Movie Name: " + movie.Title);
            console.log("Release Year: " + movie.Year);
            console.log("Actors: " + movie.Actors);
            console.log("Language: " + movie.Language);
            console.log("Country where the movie was produced: " + movie.Country);
            console.log("imdbRating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("Plot: " + movie.Plot);
        }
        console.log(object);

    });

}