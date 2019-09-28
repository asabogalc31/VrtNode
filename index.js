// Modules required
const fs = require("fs");
const path = require('path');
const resemble = require('resemblejs');
const compare = require("resemblejs").compare;

// Constants
const screenShotsFolder = "./screenshots/simple_spec"
const screenShotsExpectedFolder = "./screenshots/expected"

/*
* Compare two images with Resemblejs
*/
function compareImages(currentImage, expectedImage) {
    const options = {
        returnEarlyThreshold: 5
    };
	
	var diff = resemble(currentImage).compareTo(expectedImage).ignoreLess().onComplete(function(data){
		console.log(data);
	});
	
	return diff;
}

/*
* List children of folder
*/
function listFiles(folderPath) {
	let files = fs.readdirSync(folderPath);
	return files;
}

var fileList = listFiles(screenShotsFolder);
for (i = 0; i < fileList.length; i++){
	console.log("==============================================================");
	console.log("================== SCREENSHOT " + (i+1) +"===============");
	console.log("==============================================================");
	currentImage = path.join(screenShotsFolder, fileList[i]);
	expectedImage = path.join(screenShotsExpectedFolder, fileList[i]);
	var result = compareImages(currentImage, expectedImage);
	console.log(result);
}