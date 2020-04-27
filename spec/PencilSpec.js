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
});
