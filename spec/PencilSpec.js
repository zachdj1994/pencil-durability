const Pencil = require("./../library/Pencil");
const FileHandler = require("./../library/FileHandler");
let paperHandlerSpy;
let pencilHandlerSpy;
let pencil;

describe("Pencil", function () {
    beforeEach(function () {
        pencil = new Pencil();
    });

    it("should initialize the paper FileHandler", function () {
        expect(pencil.paperFileHandler).toBeInstanceOf(FileHandler);
        expect(pencil.paperFileHandler.fileLocation).toEqual(pencil.paperFileLocation)
    });

    it("should initialize the pencil FileHandler", function () {
        expect(pencil.pencilFileHandler).toBeInstanceOf(FileHandler);
        expect(pencil.pencilFileHandler.fileLocation).toEqual(pencil.pencilFileLocation)
    });

    it("should set the durability", function () {
        expect(pencil.durability).not.toEqual(undefined);
    });

    it("should allow the durability to be overridden", function () {
        pencil = new Pencil(12345);
        expect(pencil.durability).toEqual(12345);
    });

    describe("setDurability", function () {
        it("should set the durability from the pencil file if there's data there", function () {
            pencil.durability = undefined;
            let spy = spyOn(pencil.pencilFileHandler, "readFromFile").and.returnValue("data: from the file");
            pencil.setDurability();
            expect(spy).toHaveBeenCalled();
            expect(pencil.durability).toEqual("from the file");
        });

        it("should leave the durability undefined if there's no pencil data", function () {
            pencil.durability = undefined;
            let spy = spyOn(pencil.pencilFileHandler, "readFromFile").and.returnValue("");
            pencil.setDurability();
            expect(spy).toHaveBeenCalled();
            expect(pencil.durability).toEqual(undefined);
        })
    });

    describe("write", function () {
        beforeEach(function() {
            paperHandlerSpy = spyOn(pencil.paperFileHandler, "appendToFile");
            pencilHandlerSpy = spyOn(pencil.pencilFileHandler, "writeToFile");
        });

        it("should pass the text to the FileHandler to write", function () {
            let text = "test data";
            pencil.durability = undefined;

            pencil.write(text);
            expect(paperHandlerSpy).toHaveBeenCalledWith(text);
        });

        it("should determine which text can be written if the durability is defined", function () {
            pencil.durability = 8;
            let writableTextSpy = spyOn(pencil, "getWritableText");

            pencil.write("test data");
            expect(writableTextSpy).toHaveBeenCalled();
        });

        it("should not determine which text can be written if the durability is not defined", function () {
            let writableTextSpy = spyOn(pencil, "getWritableText");
            pencil.durability = undefined;

            pencil.write("test data");
            expect(writableTextSpy).not.toHaveBeenCalled();
        });

        it("should write the pencil's current state to temporary storage", function () {
            pencil.durability = 10;

            pencil.write("test data");
            expect(pencilHandlerSpy).toHaveBeenCalledWith("durability: 2");
        });
    });

    describe("getWritableText", function () {
        beforeEach(function() {
            paperHandlerSpy = spyOn(pencil.paperFileHandler, "appendToFile");
            pencilHandlerSpy = spyOn(pencil.pencilFileHandler, "appendToFile");
        });

        it("should degrade the pencil for each character", function () {
            pencil.durability = 8;
            let degradePencilSpy = spyOn(pencil, "degradePencil");

            pencil.getWritableText("test data");
            expect(degradePencilSpy).toHaveBeenCalledTimes(9);
        });

        it("should return the text it was passed if the pencil does not degrade", function () {
            pencil.durability = 8;

            expect(pencil.getWritableText("test data")).toEqual("test data");
        });

        it("should blank the correct number of characters when the pencil degrades", function () {
            pencil.durability = 8;

            expect(pencil.getWritableText("test data more")).toEqual("test data     ");
        });
    });

    describe("isSpace", function () {
        it("should return true if the character is a space", function () {
            expect(pencil.isSpace(" ")).toBeTrue();
        });

        it("should return false if the character is not a space", function () {
            expect(pencil.isSpace("n")).toBeFalse();
            expect(pencil.isSpace("1")).toBeFalse();
            expect(pencil.isSpace("$")).toBeFalse();
        })
    });

    describe("isNumber", function () {
        it("should return true if the character is a number", function () {
            expect(pencil.isNumber("1")).toBeTrue();
            expect(pencil.isNumber("2")).toBeTrue();
            expect(pencil.isNumber("3")).toBeTrue();
        });

        it("should return false if the character is not a number", function () {
            expect(pencil.isNumber("n")).toBeFalse();
            expect(pencil.isNumber(" ")).toBeFalse();
            expect(pencil.isNumber("$")).toBeFalse();
        })
    });

    describe("isSpecialCharacter", function () {
        it("should return true if the character is a special character", function () {
            expect(pencil.isSpecialCharacter("$")).toBeTrue();
            expect(pencil.isSpecialCharacter("%")).toBeTrue();
            expect(pencil.isSpecialCharacter("`")).toBeTrue();
        });

        it("should return false if the character is not a special character", function () {
            expect(pencil.isSpecialCharacter("n")).toBeFalse();
            expect(pencil.isSpecialCharacter(" ")).toBeFalse();
            expect(pencil.isSpecialCharacter("3")).toBeFalse();
        })
    });

    describe("isLowerCase", function () {
        it("should return true if the character is lower case", function () {
            expect(pencil.isLowerCase("a")).toBeTrue();
            expect(pencil.isLowerCase("p")).toBeTrue();
            expect(pencil.isLowerCase("i")).toBeTrue();
        });

        it("should return false if the character is not lower case", function () {
            expect(pencil.isLowerCase("A")).toBeFalse();
            expect(pencil.isLowerCase("P")).toBeFalse();
            expect(pencil.isLowerCase("I")).toBeFalse();
        })
    });

    describe("isUpperCase", function () {
        it("should return true if the character is upper case", function () {
            expect(pencil.isUpperCase("A")).toBeTrue();
            expect(pencil.isUpperCase("P")).toBeTrue();
            expect(pencil.isUpperCase("I")).toBeTrue();
        });

        it("should return false if the character is not upper case", function () {
            expect(pencil.isUpperCase("a")).toBeFalse();
            expect(pencil.isUpperCase("p")).toBeFalse();
            expect(pencil.isUpperCase("i")).toBeFalse();
        })
    });

    describe("degradePencil", function () {
        it("should not degrade the pencil when writing a space", function () {
            pencil.durability = 2;
            let spy = spyOn(pencil, "isSpace").and.returnValue(true);
            pencil.degradePencil(" ");
            expect(pencil.durability).toEqual(2);
        });

        it("should degrade the pencil by 1 point when writing a numeral", function () {
            pencil.durability = 2;
            let spy = spyOn(pencil, "isNumber").and.returnValue(true);
            pencil.degradePencil("1");
            expect(pencil.durability).toEqual(1);
        });

        it("should degrade the pencil by 1 point when writing a special character", function () {
            pencil.durability = 2;
            let spy = spyOn(pencil, "isSpecialCharacter").and.returnValue(true);
            pencil.degradePencil("%");
            expect(pencil.durability).toEqual(1);
        });

        it("should degrade the pencil by 1 point when writing a lowercase letter", function () {
            pencil.durability = 2;
            let spy = spyOn(pencil, "isLowerCase").and.returnValue(true);
            pencil.degradePencil("a");
            expect(pencil.durability).toEqual(1);
        });

        it("should degrade the pencil by 2 points when writing an uppercase letter", function () {
            pencil.durability = 2;
            let spy = spyOn(pencil, "isUpperCase").and.returnValue(true);
            pencil.degradePencil("A");
            expect(pencil.durability).toEqual(0);
        });
    });
});
