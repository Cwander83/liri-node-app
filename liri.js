require("dotenv").config();
const keys = require("./keys")
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require("fs");

var userInput = process.argv[2];
var songInput = process.argv[3];

fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log("readdfile: " +error);
    }
    else if (userInput === "my-tweets"){
        console.log(Tweets());
    }
    else if (userInput === "spotify-this-song"){
        console.log(spotifySearch());
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

                console.log("#" + i + ": "+ tweets[i].created_at);
                console.log(tweets[i].text);
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
        query: songInput
    }, function (err, data) {
        let input = data.tracks.items[0];
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("function spotify: " + input.name);
    });
}
//function for the movie search----------
