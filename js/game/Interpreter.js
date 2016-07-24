
var Interpreter = {
    run: function(commands, context, done) {
        var self = this;
        var i = 0;
        function nextCommand() {
            if (i < commands.length) {
                self.execCommand(commands[i], context, function (err) {
                    if (err) {
                        done(err);
                    } else {
                        i++;
                        nextCommand();
                    }
                });
            } else {
                done();
            }
        }
        nextCommand();
    },
    execCommand: function(command, context, done) {
        this.commands[command.cmd](context, command, done);
    },
    registerCommands: function(commands) {
       this.commands = commands;
    }
};

/*

var Commands = {
    print: function(context, params, done) {
        context.console.error(params.text);
        done();
    },
    wait: function(context, params, done) {
        context.window.setTimeout(function() {
            done();
        }, params.time);
    }
};

Interpreter.registerCommands(Commands);

*/

module.exports = Interpreter;