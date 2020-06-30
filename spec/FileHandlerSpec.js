const FileHandler = require("./../library/FileHandler");
const fs = require('fs');
let fileLocation;
let handler;

describe("FileHandler", function () {
    beforeEach(function () {
        fileLocation = "data/paper.txt";
        handler = new FileHandler(fileLocation);
    });

    describe("appendToFile", function () {
        it("should append content to a file", function () {
            let spy = spyOn(fs, "appendFileSync");
            handler.appendToFile('test data');
            expect(spy).toHaveBeenCalledWith(fileLocation, 'test data');
        });
    });

    describe("writeToFileFromScratch", function () {
        it("should write content to a file", function () {
            let spy = spyOn(fs, "writeFileSync");
            handler.writeToFileFromScratch('test data');
            expect(spy).toHaveBeenCalledWith(fileLocation, 'test data');
        });
    });

    describe("storePencilState", function () {
        it("should write content to a new file", function () {
            let writeSpy = spyOn(fs, "writeFileSync");
            handler.storePencilState(1, 12, 5);
            expect(writeSpy).toHaveBeenCalledWith(fileLocation, 'durability:1,initialDurability:12,eraserDurability:5');

            handler.storePencilState(22, 33, 44);
            expect(writeSpy).toHaveBeenCalledWith(fileLocation, 'durability:22,initialDurability:33,eraserDurability:44');
        });

        it("should not write initialPencilDurability if it's not defined", function () {
            let writeSpy = spyOn(fs, "writeFileSync");
            handler.storePencilState(1);
            expect(writeSpy).toHaveBeenCalledWith(fileLocation, 'durability:1');

            handler.storePencilState(22);
            expect(writeSpy).toHaveBeenCalledWith(fileLocation, 'durability:22');
        });

        it("should not write eraserDurability if it's not defined", function () {
            let writeSpy = spyOn(fs, "writeFileSync");
            handler.storePencilState(1, 12);
            expect(writeSpy).toHaveBeenCalledWith(fileLocation, 'durability:1,initialDurability:12');

            handler.storePencilState(22,  33);
            expect(writeSpy).toHaveBeenCalledWith(fileLocation, 'durability:22,initialDurability:33');
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
