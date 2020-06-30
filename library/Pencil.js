const FileHandler = require("./../library/FileHandler");

class Pencil {
    paperFileLocation = "data/paper.txt";
    pencilFileLocation = "data/pencil.txt";
    paperFileHandler;
    pencilFileHandler;
    pencilDurability;
    initialPencilDurability;
    eraserDurability;

    constructor() {
        this.paperFileHandler = new FileHandler(this.paperFileLocation);
        this.pencilFileHandler = new FileHandler(this.pencilFileLocation);
    }

    sharpen() {
        this.setDurability();
        this.pencilFileHandler.storePencilState(this.initialPencilDurability, this.initialPencilDurability);
    }

    write(text) {
        this.setDurability();
        if (this.pencilDurability !== 'undefined' && this.pencilDurability !== undefined) {
            text = this.getWritableText(text);
        }

        this.paperFileHandler.appendToFile(text);
        this.pencilFileHandler.storePencilState(this.pencilDurability, this.initialPencilDurability);
    }

    create(initialDurability, eraserDurability) {
        this.pencilDurability = initialDurability;
        this.initialPencilDurability = initialDurability;
        this.eraserDurability = eraserDurability;
        this.pencilFileHandler.storePencilState(initialDurability, initialDurability, eraserDurability);
    }

    erase(textToErase) {
        let currentText = this.paperFileHandler.readFromFile();
        let startIndex = currentText.lastIndexOf(textToErase);
        let endIndex = startIndex + textToErase.length;
        if (startIndex > -1) {
            let newText = currentText.substring(endIndex);
            let currentIndex = endIndex;
            for(let i = endIndex; i > startIndex; i--) {
                if (this.eraserDurability > 0) {
                    newText = ' ' + newText;
                    currentIndex = i - 1;
                    this.eraserDurability--;
                }
            }
            newText = currentText.substring(0, currentIndex) + newText;
            this.paperFileHandler.writeToFileFromScratch(newText);
        }
    }

    setDurability() {
        let pencilData = this.parsePencilData(this.pencilFileHandler.readFromFile());
        if (pencilData.durability !== undefined && pencilData.durability !== "") {
            this.pencilDurability = pencilData.durability;
        }

        if (pencilData.initialDurability !== undefined  && pencilData.durability !== "") {
            this.initialPencilDurability = pencilData.initialDurability;
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
            if (this.pencilDurability > 0) {
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
            this.pencilDurability -= 0;
        } else if (
            this.isNumber(character) ||
            this.isSpecialCharacter(character) ||
            this.isLowerCase(character)
        ) {
            this.pencilDurability--;
        } else if (this.isUpperCase(character)) {
            this.pencilDurability -= 2;
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
