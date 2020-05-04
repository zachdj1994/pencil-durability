const Controller = require("./../library/Controller");
const MinimistWrapper = require("./../library/MinimistWrapper");
const Pencil = require("./../library/Pencil");

describe("Controller", function () {
    it("should initialize the minimist wrapper", function () {
        let controller = new Controller();
        expect(controller.minimist).toBeInstanceOf(MinimistWrapper);
    });

    it("should initialize the pencil object", function () {
        let controller = new Controller();
        expect(controller.pencil).toBeInstanceOf(Pencil);
    });

    describe("run", function () {
        it("should call the write method when write is the command", function () {
            let controller = new Controller;
            let pencilSpy = spyOn(controller.pencil, "write");
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["write"] }));
            controller.run();

            expect(pencilSpy).toHaveBeenCalled();
        });

        it("should not call the write method when write is not the command", function () {
            let controller = new Controller;
            let pencilSpy = spyOn(controller.pencil, "write");
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["erase"] }));
            controller.run();

            expect(pencilSpy).not.toHaveBeenCalled();
        });

        it("should pass the text to the write method", function () {
            let controller = new Controller;
            let pencilSpy = spyOn(controller.pencil, "write");
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["write", "text"] }));
            controller.run();

            expect(pencilSpy).toHaveBeenCalledWith("text");
        });

        it("should create a new pencil when create is the command", function () {
            let controller = new Controller;
            let initialPencil = controller.pencil;
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["create"] }));
            controller.run();

            expect(initialPencil).not.toEqual(controller.pencil);
        });

        it("should not create a new pencil when create is not the command", function () {
            let controller = new Controller;
            let initialPencil = controller.pencil;
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["hey Alexa"] }));
            controller.run();

            expect(initialPencil).toEqual(controller.pencil);
        });

        it("should pass the durability when creating a pencil", function () {
            let controller = new Controller;
            let minimistSpy = spyOn(controller.minimist, "getArguments")
                .and
                .returnValue(Object({ _: ["create"], point: 10 } ));
            controller.run();

            expect(controller.pencil.durability).toEqual(10);
        });
    });
});
