const minimist = require("minimist");

class MinimistWrapper {
    getArguments() {
        return minimist(process.argv.slice(2));
    }
}
module.exports = MinimistWrapper;
