const Pencil = require("./../library/Pencil");
const MinimistWrapper = require("./../library/MinimistWrapper");

class Controller {
    minimist;
    pencil;

    constructor() {
        this.minimist = new MinimistWrapper;
        this.pencil = new Pencil(1000);
    }

    run() {
        let args = this.minimist.getArguments();
        const command = args._[0];

        switch (command) {
            case "write":
                this.pencil.write(args._[1]);
        }
    }
}
module.exports = Controller;
