const FileHandler = require("./../library/FileHandler");

class Pencil {
    fileLocation = "data/paper.txt";
    fileHandler;

    constructor() {
        this.fileHandler = new FileHandler(this.fileLocation);
    }

    write(text) {
        this.fileHandler.writeToFile(text);
    }
}
module.exports = Pencil;
