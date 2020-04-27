const Pencil = require("./../library/Pencil");
const MinimistWrapper = require("./../library/MinimistWrapper");

class Controller {
    minimist;
    pencil;

    constructor() {
        this.minimist = new MinimistWrapper;
        this.pencil = new Pencil();
    }

    run() {
        let args = this.minimist.getArguments();
        const command = args._[0];

        switch (command) {
            case "write":
                this.pencil.write(args);
        }
    }
}
module.exports = Controller;
