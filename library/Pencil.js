const FileHandler = require("./../library/FileHandler");

class Pencil {
    fileLocation = "data/paper.txt";
    fileHandler;
    durability;

    constructor(durability) {
        this.fileHandler = new FileHandler(this.fileLocation);
        this.durability = durability;
    }

    write(text) {
        this.fileHandler.appendToFile(text);
    }

    isSpace(character) {
        return character.trim() === '';
    }

    isNumber(character) {
        return !isNaN(parseInt(character));
    }

    isSpecialCharacter(character) {
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(character);
    }

    isLowerCase(character) {
        return character == character.toLowerCase()
    }
}
module.exports = Pencil;
