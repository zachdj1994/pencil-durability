const fs = require("fs");

class FileHandler {
    fileLocation = "";

    constructor(fileLocation) {
        this.fileLocation = fileLocation;
    }

    appendToFile(textToWrite) {
        fs.appendFileSync(this.fileLocation, textToWrite);
    }

    writeToFileFromScratch(textToWrite) {
        fs.writeFileSync(this.fileLocation, textToWrite);
    }

    storePencilState(durability, initialDurability) {
        fs.truncateSync(this.fileLocation, 0);
        let string = "durability:" + durability;
        if (initialDurability !== undefined) {
            string += ",initialDurability:" + initialDurability;
        }
        fs.writeFileSync(this.fileLocation, string);
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
