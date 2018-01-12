require("dotenv").config();
const keys = require("./keys")
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const fs = require("fs");
const userInput = process.argv[2];
let Input = process.argv;
let titleInput = "";
// calling multi word titles to one
string()


fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
        return console.log("readfile: " + error);
    } else if (userInput === "my-tweets") {
        Tweets();
    } else if (userInput === "spotify-this-song") {
        spotifySearch();
    } else if (userInput === "movie-this") {
        movieSearch();
    }
});

// functions ------------------------------------

// functions to turn multiple word titles into a single string for the song and  movie input
function string() {
    for (var j = 3; j < Input.length; j++) {
        if (j > 3 && j < Input.length) {
            titleInput = titleInput + "+" + Input[j];
        } else {
            titleInput += Input[j];
        }
    }
}

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
            for (let i = 1; i < 20; i++) {
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
    if (!titleInput) {
        console.log("");
        console.log("no song entered, check out Ace of Base");
        titleInput = 'The Sign';
    }

    spotify.search({
        type: 'track',
        query: '"' + titleInput + '"'
    }, function (err, data) {
        let song = data.tracks.items[0];
        if (err) {
            return console.log("spotify error: " + err);
        } else {
            console.log("--------------------------------------------");
            console.log("     **Spotify Song Search**      ");
            console.log("\n *Top Artist in Search: \n" + song.artists[0].name);
            console.log("\n *Name of track: \n" + song.name);
            console.log("\n *Name of the Album: \n" + song.album.name);
            console.log("\n *URL to Preview Song: \n");
            console.log(song.preview_url);
            console.log("--------------------------------------------");
            //console.log(JSON.stringify(data, null, 2));
        }
    });

}
//function for the movie search----------
function movieSearch() {
    if (!titleInput) {
        console.log("");
        console.log("no movie entered check this movie out");
        titleInput = 'Mr. Nobody';
    }
    request("http://www.omdbapi.com/?t=" + titleInput + "&y=&plot=short&apikey=83c5fdcd", function (error, response, body) {

        let movie = JSON.parse(body);

        if (!error && response.statusCode === 200) {

            console.log("---------------------------------------");
            console.log("\n     **OMDB Movie Information**");
            console.log("\nMovie Name: " + movie.Title);
            console.log("\nRelease Year: " + movie.Year);
            console.log("\nActors: " + movie.Actors);
            console.log("\nLanguage: " + movie.Language);
            console.log("\nCountry where the movie was produced: " + movie.Country);
            console.log("\nimdbRating: " + movie.imdbRating);
            console.log("\nRotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("\nPlot: " + movie.Plot);
        } else {
            console.log("Movie error: " + error);
        }
    });
}