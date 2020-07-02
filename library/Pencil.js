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
        this.pencilFileHandler.storePencilState(this.initialPencilDurability, this.initialPencilDurability, this.eraserDurability);
    }

    write(text) {
        this.setDurability();
        if (this.pencilDurability !== 'undefined' && this.pencilDurability !== undefined) {
            text = this.getWritableText(text);
        }

        this.paperFileHandler.appendToFile(text);
        this.pencilFileHandler.storePencilState(this.pencilDurability, this.initialPencilDurability, this.eraserDurability);
    }

    create(initialDurability, eraserDurability) {
        this.pencilDurability = initialDurability;
        this.initialPencilDurability = initialDurability;
        this.eraserDurability = eraserDurability;
        this.pencilFileHandler.storePencilState(initialDurability, initialDurability, eraserDurability);
    }

    erase(textToErase) {
        this.setDurability();
        let currentText = this.paperFileHandler.readFromFile();
        let startIndex = currentText.lastIndexOf(textToErase);
        let endIndex = startIndex + textToErase.length;

        if (startIndex < 0) {
            return;
        }

        let newText = currentText.substring(endIndex);
        let currentIndex = endIndex;

        for (let i = endIndex; i > startIndex; i--) {
            if (this.eraserDurability > 0 || this.eraserDurability == undefined) {
                newText = ' ' + newText;
                currentIndex = i - 1;
                if (this.eraserDurability != undefined) {
                    this.eraserDurability--;
                }
            }
        }

        newText = currentText.substring(0, currentIndex) + newText;

        this.pencilFileHandler.storePencilState(this.pencilDurability, this.initialPencilDurability, this.eraserDurability);
        this.paperFileHandler.writeToFileFromScratch(newText);
    }

    edit(textToAdd) {
        this.setDurability();
        let currentText = this.paperFileHandler.readFromFile();
        let startIndex = this.getLastBlankSpaceIndex(currentText);

        if (startIndex < 0) {
            return;
        }

        //will stop writing and leave existing text in place if the pencil is degraded
        if (this.pencilDurability !== 'undefined' && this.pencilDurability !== undefined) {
            textToAdd = this.getWritableText(textToAdd).trim();
        }

        let endIndex = startIndex + textToAdd.length;
        let newText = currentText.substring(0, startIndex);
        let currentIteration = 0;
        for (startIndex; startIndex < endIndex; startIndex++) {
            if (currentText.substring(startIndex, startIndex + 1) === ' ') {
                newText += textToAdd.substring(currentIteration, currentIteration + 1);
            } else {
                newText += '@';
            }
            currentIteration++;
        }

        newText += currentText.substring(startIndex);
        this.paperFileHandler.writeToFileFromScratch(newText);
        this.pencilFileHandler.storePencilState(this.pencilDurability, this.initialPencilDurability, this.eraserDurability);
    }

    getLastBlankSpaceIndex(text) {
        let regex = /[ ]{2,}/g;
        let match;
        let matches = [];
        while ((match = regex.exec(text)) != null) {
            matches.push(match.index)
        }

        if (matches.length < 1) {
            return -1;
        }

        return matches[matches.length - 1] + 1;
    }

    setDurability() {
        let pencilData = this.parsePencilData(this.pencilFileHandler.readFromFile());
        if (pencilData.durability !== undefined && pencilData.durability !== "") {
            this.pencilDurability = pencilData.durability;
        }

        if (pencilData.initialDurability !== undefined && pencilData.durability !== "") {
            this.initialPencilDurability = pencilData.initialDurability;
        }

        if (pencilData.eraserDurability !== undefined && pencilData.eraserDurability !== "") {
            this.eraserDurability = pencilData.eraserDurability;
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
        if (this.isSpace(character)) {
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
