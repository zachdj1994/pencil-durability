const fs = require("fs");

class FileHandler {
    fileLocation = "";

    constructor(fileLocation) {
        this.fileLocation = fileLocation;
    }

    writeToFile(textToWrite) {
        fs.appendFile(this.fileLocation, textToWrite)
    }
}
module.exports = FileHandler;
