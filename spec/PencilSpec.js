const Pencil = require("./../library/Pencil");
const FileHandler = require("./../library/FileHandler");

describe("Pencil", function () {
    it("should initialize the FileHandler", function () {
        let pencil = new Pencil();
        expect(pencil.fileHandler).toBeInstanceOf(FileHandler);
        expect(pencil.fileHandler.fileLocation).toEqual(pencil.fileLocation)
    });

    it("should set the durability", function () {
        let pencil = new Pencil(1000);
        expect(pencil.durability).toEqual(1000);
    });

    describe("write", function () {
        it("should pass the text to the FileHandler to write", function () {
            let pencil = new Pencil();
            let spy = spyOn(pencil.fileHandler, "appendToFile");
            let text = "test data";
            pencil.write(text);
            expect(spy).toHaveBeenCalledWith(text);
        });
    });

    describe("isSpace", function () {
        it("should return true if the character is a space", function () {
            let pencil = new Pencil();
            expect(pencil.isSpace(" ")).toBeTrue();
        });

        it("should return false if the character is not a space", function () {
            let pencil = new Pencil();
            expect(pencil.isSpace("n")).toBeFalse();
            expect(pencil.isSpace("1")).toBeFalse();
            expect(pencil.isSpace("$")).toBeFalse();
        })
    });

    describe("isNumber", function () {
        it("should return true if the character is a number", function () {
            let pencil = new Pencil();
            expect(pencil.isNumber("1")).toBeTrue();
            expect(pencil.isNumber("2")).toBeTrue();
            expect(pencil.isNumber("3")).toBeTrue();
        });

        it("should return false if the character is not a number", function () {
            let pencil = new Pencil();
            expect(pencil.isNumber("n")).toBeFalse();
            expect(pencil.isNumber(" ")).toBeFalse();
            expect(pencil.isNumber("$")).toBeFalse();
        })
    });

    describe("isSpecialCharacter", function () {
        it("should return true if the character is a special character", function () {
            let pencil = new Pencil();
            expect(pencil.isSpecialCharacter("$")).toBeTrue();
            expect(pencil.isSpecialCharacter("%")).toBeTrue();
            expect(pencil.isSpecialCharacter("`")).toBeTrue();
        });

        it("should return false if the character is not a special character", function () {
            let pencil = new Pencil();
            expect(pencil.isSpecialCharacter("n")).toBeFalse();
            expect(pencil.isSpecialCharacter(" ")).toBeFalse();
            expect(pencil.isSpecialCharacter("3")).toBeFalse();
        })
    });

    describe("isLowerCase", function () {
        it("should return true if the character is lower case", function () {
            let pencil = new Pencil();
            expect(pencil.isLowerCase("a")).toBeTrue();
            expect(pencil.isLowerCase("p")).toBeTrue();
            expect(pencil.isLowerCase("i")).toBeTrue();
        });

        it("should return false if the character is not lower case", function () {
            let pencil = new Pencil();
            expect(pencil.isLowerCase("A")).toBeFalse();
            expect(pencil.isLowerCase("P")).toBeFalse();
            expect(pencil.isLowerCase("I")).toBeFalse();
        })
    });
});
