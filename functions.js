const fs = require('fs');
const resemble = require('resemblejs');
const compare = require("resemblejs").compare;
const path = require('path');

module.exports = {
	/*
	* Compare two images with Resemblejs
	*/
	compareImages: function(currentImage, expectedImage) {
		const options = {
			returnEarlyThreshold: 5
		};
		
		var diff = resemble(currentImage).compareTo(expectedImage).ignoreLess().onComplete(function(data){
			console.log(data);
		});
		
		return diff;
	},
	
	/*
	* List children of folder
	*/
	listFiles: function(folderPath) {
		let files = fs.readdirSync(folderPath);
		return files;
	}
}




