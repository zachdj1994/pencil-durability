const Pencil = require("./../library/Pencil");
const FileHandler = require("./../library/FileHandler");

describe("Pencil", function () {
    it("should initialize the FileHandler", function () {
        let pencil = new Pencil();
        expect(pencil.fileHandler).toBeInstanceOf(FileHandler);
        expect(pencil.fileHandler.fileLocation).toEqual(pencil.fileLocation)
    });
});
