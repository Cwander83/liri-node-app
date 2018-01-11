require("dotenv").config();
const keys = require("./keys")
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require("fs");

var userInput = process.argv[2];
var songInput = "";


fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(error);
    }

    console.log(Tweets());
});
// functions ------------------------------------
//function for twitter to find the last 20 tweets
//from the dummy account i created
function Tweets() {
    const client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'chriswandermail',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i <= 20; i++) {

                console.log("#" + i + ": ");
                console.log(tweets[i].text);
                console.log("=======================");
                // console.log(materials.map(material => material.length));
            }
        } else {
            console.log("twitter: " + error);
        }
    });
}

function spotifySearch() {
    const spotify = new Spotify(keys.spotify);
    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("function spotify: " + data);
    });
}