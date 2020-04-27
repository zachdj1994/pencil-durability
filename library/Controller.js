const Pencil = require("./../library/Pencil");
const MinimistWrapper = require("./../library/MinimistWrapper");

class Controller {
    minimist;
    pencil;

    constructor() {
        this.minimist = new MinimistWrapper;
        this.pencil = new Pencil();
    }
}
module.exports = Controller;
