const FileHandler = require("./../library/FileHandler");
const fs = require('fs');

describe("FileHandler", function () {
    describe("writeToFile", function () {
        it("should append content to a file", function () {
            let fileLocation = "paper.txt";
            let handler = new FileHandler(fileLocation);
            let spy = spyOn(fs, "appendFile");
            handler.writeToFile('test data');
            expect(spy).toHaveBeenCalledWith(fileLocation, 'test data', handler.callback);
        });
    })
});
