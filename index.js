var path = require('path')
var resemble = require('resemblejs');
const compare = require("resemblejs").compare;
const fs = require("fs");

const screenShotsFolder = "./cypress/screenshots/expected.js"
const file1 = path.join(screenShotsFolder, "/Home actions -- Los estudiantes login -- Creates an account twice.png")
const file2 = path.join(screenShotsFolder, "/Home actions -- Teachers page actions -- Visits los estudiantes and goes for a teachers page (1).png")

function getDiff() {
    /*const options = {
        returnEarlyThreshold: 5
    };

    compare(file1, file2, options, function(err, data) {
        if (err) {
            console.log("An error!");
        } else {
            console.log(data);
        }
    });
	*/
	
	var directory = './cypress/screenshots/simple_spec.js/';
	let dirBuffer = Buffer.from(directory);
	let files = fs.readdirSync(directory);
	console.log(files);
	return files;
}

getDiff();