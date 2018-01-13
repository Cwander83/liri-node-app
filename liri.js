require("dotenv").config();
const keys = require("./keys")
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const request = require("request");
const inquirer = require('inquirer');
const fs = require("fs");
let userInput = process.argv[2];
let Input = process.argv;
let titleInput = "";
// functions needed to call first
string();
command(userInput, titleInput);

//******NOT WORKING **** */
// inquirer.prompt([{

//         type: "list",
//         name: "userInput",
//         message: "Please choice which command to continue",
//         choices: ["my-tweets", "Spotify", "OMDB", "Do What It Says"]
//     }

// ]).then(function (choices) {

//     command(choices.userInput);
//     console.log(choices);

// });


// main function control the user request
function command(userInput, titleInput) {
    switch (userInput) {
        case "spotify-this-song":

            // inquirer.prompt([{
            //         type: "type",
            //         name: "song",
            //         message: "Enter a Track",
            //     }
            // ]).then(function (choices) {
            //     console.log(choices);
            // });
            spotifySearch();
            break;
        case "movie-this":
            movieSearch();
            break;
        case "my-tweets":
            Tweets();
            break;
        case "do-what-it-says":
            doWhat();
            break;

        default:
            console.log("default");

    }
    //NOT WORKING PROPERLY===========================
    // fs.appendFile('log.txt', userInput, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
}


// function to turn multiple word titles into a single string for the song and  movie input
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
            for (let i = 0; i < tweets.length; i++) {

                console.log("\nCreated At: \n" + tweets[i].created_at);
                console.log("\n" + tweets[i].text);
                console.log("\n=======================");
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



//function for the do-what-it-says command
// it goes to the random.txt page and display the data
function doWhat() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("doWhat error: " + error);
        }
        let random = data.split(",");
        titleInput = random[1];
        command(random[0], titleInput);
    });
}