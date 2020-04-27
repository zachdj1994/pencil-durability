const FileHandler = require("./../library/FileHandler");
const fs = require('fs');

describe("FileHandler", function () {
    describe("appendToFile", function () {
        it("should append content to a file", function () {
            let fileLocation = "paper.txt";
            let handler = new FileHandler(fileLocation);
            let spy = spyOn(fs, "appendFile");
            handler.appendToFile('test data');
            expect(spy).toHaveBeenCalledWith(fileLocation, 'test data', handler.callback);
        });
    });

    describe("writeToFile", function () {
        it("should write content to a new file", function () {
            let fileLocation = "paper.txt";
            let handler = new FileHandler(fileLocation);
            let spy = spyOn(fs, "writeFile");
            handler.writeToFile('test data');
            expect(spy).toHaveBeenCalledWith(fileLocation, 'test data', handler.callback);
        });
    });
});
