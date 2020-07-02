const Controller = require("./../library/Controller");
const MinimistWrapper = require("./../library/MinimistWrapper");
const Pencil = require("./../library/Pencil");
let writeSpy;
let sharpenSpy;
let createSpy;
let eraseSpy;
let editSpy;
let controller;

describe("Controller", function () {
    beforeEach(function () {
        controller = new Controller;
    });
    it("should initialize the minimist wrapper", function () {
        expect(controller.minimist).toBeInstanceOf(MinimistWrapper);
    });

    it("should initialize the pencil object", function () {
        expect(controller.pencil).toBeInstanceOf(Pencil);
    });

    describe("run", function () {
        beforeEach(function () {
            writeSpy = spyOn(controller.pencil, "write");
            createSpy = spyOn(controller.pencil, "create");
            sharpenSpy = spyOn(controller.pencil, "sharpen");
            eraseSpy = spyOn(controller.pencil, "erase");
            editSpy = spyOn(controller.pencil, "edit");
        });

        it("should call the write method when write is the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["write"] }));
            controller.run();

            expect(writeSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).not.toHaveBeenCalled();
            expect(sharpenSpy).not.toHaveBeenCalled();
        });

        it("should not call the write method when write is not the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["erase"] }));
            controller.run();

            expect(writeSpy).not.toHaveBeenCalled();
        });

        it("should call the create method when create is the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["create"] }));
            controller.run();

            expect(createSpy).toHaveBeenCalled();
            expect(writeSpy).not.toHaveBeenCalled();
            expect(sharpenSpy).not.toHaveBeenCalled();
        });

        it("should not call the create method when create is not the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["erase"] }));
            controller.run();

            expect(createSpy).not.toHaveBeenCalled();
        });

        it("should call the sharpen method when create is the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["sharpen"] }));
            controller.run();

            expect(sharpenSpy).toHaveBeenCalled();
            expect(writeSpy).not.toHaveBeenCalled();
            expect(createSpy).not.toHaveBeenCalled();
        });

        it("should not call the sharpen method when create is not the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["erase"] }));
            controller.run();

            expect(sharpenSpy).not.toHaveBeenCalled();
        });

        it("should pass the pencilDurability when creating a pencil", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["create"], point: 10 } ));
            controller.run();

            expect(createSpy).toHaveBeenCalledWith(10, undefined);
        });

        it("should pass the eraserDurability when creating a pencil", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["create"], eraser: 10 } ));
            controller.run();

            expect(createSpy).toHaveBeenCalledWith(undefined, 10);
        });

        it("should not pass the eraserDurability when creating a pencil if undefined", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["create"]} ));
            controller.run();

            expect(createSpy).toHaveBeenCalledWith(undefined, undefined);
        });

        it("should call the erase method when erase is the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["erase"] }));
            controller.run();

            expect(eraseSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).not.toHaveBeenCalled();
            expect(sharpenSpy).not.toHaveBeenCalled();
        });

        it("should not call the erase method when erase is not the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["write"] }));
            controller.run();

            expect(eraseSpy).not.toHaveBeenCalled();
        });

        it("should call the edit method when edit is the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["edit"] }));
            controller.run();

            expect(editSpy).toHaveBeenCalledTimes(1);
            expect(createSpy).not.toHaveBeenCalled();
            expect(sharpenSpy).not.toHaveBeenCalled();
        });

        it("should not call the edit method when edit is not the command", function () {
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["write"] }));
            controller.run();

            expect(editSpy).not.toHaveBeenCalled();
        });
    });
});
