const server = require('./functions')

// Modules required
const path = require('path');

// Constants
const screenShotsFolder = "./screenshots/simple_spec"
const screenShotsExpectedFolder = "./screenshots/expected"

var fileList = server.listFiles(screenShotsFolder);
for (i = 0; i < fileList.length; i++){
	console.log("==============================================================");
	console.log("================== SCREENSHOT " + (i+1) +"===============");
	console.log("==============================================================");
	currentImage = path.join(screenShotsFolder, fileList[i]);
	expectedImage = path.join(screenShotsExpectedFolder, fileList[i]);
	var result = server.compareImages(currentImage, expectedImage);
	console.log(result);
}