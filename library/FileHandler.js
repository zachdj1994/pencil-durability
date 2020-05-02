const fs = require("fs");

class FileHandler {
    fileLocation = "";
    writeCallback = function(err, result) {
        if(err) console.log('error', err);
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
        try {
            return fs.readFileSync(this.fileLocation, 'utf8');
        } catch(e) {
            return undefined;
        }
    }
}
module.exports = FileHandler;
