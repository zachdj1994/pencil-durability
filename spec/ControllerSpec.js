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
});
