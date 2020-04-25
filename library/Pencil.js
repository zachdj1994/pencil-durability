const FileHandler = require("./../library/FileHandler");

class Pencil {
    fileLocation = "paper.txt";
    fileHandler;

    constructor() {
        this.fileHandler = new FileHandler(this.fileLocation);
    }

    write() {

    }
}
module.exports = Pencil;
