const fs = require("fs");

class FileHandler {
    fileLocation = "";
    callback = function(err, result) {
        if(err) console.log('error', err);
    }

    constructor(fileLocation) {
        this.fileLocation = fileLocation;
    }

    appendToFile(textToWrite) {
        fs.appendFile(this.fileLocation, textToWrite, this.callback);
    }

    writeToFile(textToWrite) {
        fs.writeFile(this.fileLocation, textToWrite, this.callback);
    }
}
module.exports = FileHandler;
