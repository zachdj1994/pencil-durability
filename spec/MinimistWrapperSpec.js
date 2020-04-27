const MinimistWrapper = require("./../library/MinimistWrapper");

describe("MinimistWrapper", function () {
    describe("getArguments", function () {
        it("should return an object", function () {
            let minimist = new MinimistWrapper();
            expect(minimist.getArguments() instanceof Object).toBeTrue();
        });
    });
});
