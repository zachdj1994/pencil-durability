const FileHandler = require("./../library/FileHandler");

class Pencil {
    paperFileLocation = "data/paper.txt";
    pencilFileLocation = "data/pencil.txt";
    paperFileHandler;
    pencilFileHandler;
    durability;
    initialDurability;

    constructor() {
        this.paperFileHandler = new FileHandler(this.paperFileLocation);
        this.pencilFileHandler = new FileHandler(this.pencilFileLocation);
    }

    sharpen() {
        this.setDurability();
        this.pencilFileHandler.storePencilState(this.initialDurability, this.initialDurability);
    }

    write(text) {
        this.setDurability();
        if (this.durability !== 'undefined' && this.durability !== undefined) {
            text = this.getWritableText(text);
        }

        this.paperFileHandler.appendToFile(text);
        this.pencilFileHandler.storePencilState(this.durability, this.initialDurability);
    }

    create(initialDurability) {
        this.durability = initialDurability;
        this.initialDurability = initialDurability;
        this.pencilFileHandler.storePencilState(this.durability, this.durability);
    }

    setDurability() {
        let pencilData = this.parsePencilData(this.pencilFileHandler.readFromFile());
        if (pencilData.durability !== undefined && pencilData.durability !== "") {
            this.durability = pencilData.durability;
        }

        if (pencilData.initialDurability !== undefined  && pencilData.durability !== "") {
            this.initialDurability = pencilData.initialDurability;
        }
    }

    parsePencilData(content) {
        let properties = content.split(",");
        let data = {};
        for (let i = 0; i < properties.length; i++) {
            let parts = properties[i].split(":");
            data[parts[0]] = parts[1];
        }

        return data;
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
