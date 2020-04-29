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

    describe("isUpperCase", function () {
        it("should return true if the character is upper case", function () {
            let pencil = new Pencil();
            expect(pencil.isUpperCase("A")).toBeTrue();
            expect(pencil.isUpperCase("P")).toBeTrue();
            expect(pencil.isUpperCase("I")).toBeTrue();
        });

        it("should return false if the character is not upper case", function () {
            let pencil = new Pencil();
            expect(pencil.isUpperCase("a")).toBeFalse();
            expect(pencil.isUpperCase("p")).toBeFalse();
            expect(pencil.isUpperCase("i")).toBeFalse();
        })
    });

    describe("degradePencil", function () {
        it("should not degrade the pencil when writing a space", function () {
            let pencil = new Pencil(2);
            let spy = spyOn(pencil, "isSpace").and.returnValue(true);
            pencil.degradePencil(" ");
            expect(pencil.durability).toEqual(2);
        });

        it("should degrade the pencil by 1 point when writing a numeral", function () {
            let pencil = new Pencil(2)
            let spy = spyOn(pencil, "isNumber").and.returnValue(true);
            pencil.degradePencil("1");
            expect(pencil.durability).toEqual(1);
        });

        it("should degrade the pencil by 1 point when writing a special character", function () {
            let pencil = new Pencil(2)
            let spy = spyOn(pencil, "isSpecialCharacter").and.returnValue(true);
            pencil.degradePencil("%");
            expect(pencil.durability).toEqual(1);
        });

        it("should degrade the pencil by 1 point when writing a lowercase letter", function () {
            let pencil = new Pencil(2)
            let spy = spyOn(pencil, "isLowerCase").and.returnValue(true);
            pencil.degradePencil("a");
            expect(pencil.durability).toEqual(1);
        });

        it("should degrade the pencil by 2 points when writing an uppercase letter", function () {
            let pencil = new Pencil(2)
            let spy = spyOn(pencil, "isUpperCase").and.returnValue(true);
            pencil.degradePencil("A");
            expect(pencil.durability).toEqual(0);
        });
    });
});
