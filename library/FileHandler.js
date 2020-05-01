const fs = require("fs");

class FileHandler {
    fileLocation = "";
    writeCallback = function(err, result) {
        if(err) console.log('error', err);
    }
    readCallback = function(error, data) {
        if (error) {
            console.error(error);
            return;
        }
        return data;
    }

    constructor(fileLocation) {
        this.fileLocation = fileLocation;
    }

    appendToFile(textToWrite) {
        fs.appendFile(this.fileLocation, textToWrite, this.writeCallback);
    }

    writeToFile(textToWrite) {
        fs.writeFile(this.fileLocation, textToWrite, this.writeCallback);
    }

    readFromFile() {
        return fs.readFile(this.fileLocation, this.readCallback);
    }
}
module.exports = FileHandler;
