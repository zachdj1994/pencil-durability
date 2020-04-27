const Pencil = require("./../library/Pencil");
const FileHandler = require("./../library/FileHandler");

describe("Pencil", function () {
    it("should initialize the FileHandler", function () {
        let pencil = new Pencil();
        expect(pencil.fileHandler).toBeInstanceOf(FileHandler);
        expect(pencil.fileHandler.fileLocation).toEqual(pencil.fileLocation)
    });

    describe("write", function () {
        it("should pass the text to the FileHandler to write", function () {
            let pencil = new Pencil();
            let spy = spyOn(pencil.fileHandler, "writeToFile");
            let text = "test data";
            pencil.write(text);
            expect(spy).toHaveBeenCalledWith(text);
        });
    });
});