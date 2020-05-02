const FileHandler = require("./../library/FileHandler");
const fs = require('fs');
let fileLocation;
let handler;

describe("FileHandler", function () {
    beforeEach(function () {
        fileLocation = "paper.txt";
        handler = new FileHandler(fileLocation);
    });

    describe("appendToFile", function () {
        it("should append content to a file", function () {
            let spy = spyOn(fs, "appendFile");
            handler.appendToFile('test data');
            expect(spy).toHaveBeenCalledWith(fileLocation, 'test data', handler.writeCallback);
        });
    });

    describe("writeToFile", function () {
        it("should write content to a new file", function () {
            let spy = spyOn(fs, "writeFile");
            handler.writeToFile('test data');
            expect(spy).toHaveBeenCalledWith(fileLocation, 'test data', handler.writeCallback);
        });
    });

    describe("readFromFile", function () {
        it("should read content from a file", function () {
            let spy = spyOn(fs, "readFileSync");
            handler.readFromFile();
            expect(spy).toHaveBeenCalledWith(fileLocation, 'utf8');
        });

        it("should return undefined if there is no file", function () {
            let spy = spyOn(fs, "readFileSync").and.throwError("");
            expect(handler.readFromFile()).toEqual(undefined);
        });
    });
});
