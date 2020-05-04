const FileHandler = require("./../library/FileHandler");

class Pencil {
    paperFileLocation = "data/paper.txt";
    pencilFileLocation = "data/pencil.txt";
    paperFileHandler;
    pencilFileHandler;
    durability;

    constructor(durabilityOverride) {
        this.paperFileHandler = new FileHandler(this.paperFileLocation);
        this.pencilFileHandler = new FileHandler(this.pencilFileLocation);
        if (durabilityOverride == undefined) {
            this.setDurability();
        } else {
            this.durability = durabilityOverride;
        }
    }

    setDurability() {
        let parts = this.pencilFileHandler.readFromFile().split(":");
        if (parts.length > 1) {
            this.durability = parts[1].trim();
        }
    }

    write(text) {
        if (this.durability != undefined) {
            text = this.getWritableText(text)
        }

        this.paperFileHandler.appendToFile(text);
        this.pencilFileHandler.writeToFile("durability: " + this.durability);
    }

    getWritableText(initialText) {
        let writableText = "";
        for (let i = 0; i < initialText.length; i++) {
            if (this.durability > 0) {
                writableText += initialText.charAt(i);
            } else {
                writableText += " ";
            }
            this.degradePencil(initialText.charAt(i));
        }

        return writableText;
    }

    degradePencil(character) {
        if(this.isSpace(character)) {
            this.durability -= 0;
        } else if (
            this.isNumber(character) ||
            this.isSpecialCharacter(character) ||
            this.isLowerCase(character)
        ) {
            this.durability--;
        } else if (this.isUpperCase(character)) {
            this.durability -= 2;
        }
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

    isUpperCase(character) {
        return character == character.toUpperCase();
    }
}
module.exports = Pencil;
