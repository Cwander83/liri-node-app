require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var fs = require("fs");

fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log(error);
    }
    console.log(data);
});

function Tweets() {
    var client = new Twitter(keys.twitter);
    var params = {
        screen_name: 'chriswandermail',
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i <= 20; i++) {
                console.log("#" + i + ": " + tweets);
                // console.log(materials.map(material => material.length));
            }
        } else {
            console.log(error);
        }
    });
}

function spotifySearch() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data);
    });
}