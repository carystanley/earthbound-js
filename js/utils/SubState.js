var noop = function(callback) {
    return callback();
};

function SubState(state, substates) {
    this.parentState = state;
    this.substates = substates;
    this.currentState = null;
}

SubState.prototype.switch = function (id) {
    var self = this;
    var transitionOut = self.currentState && self.currentState.transitionOut ?
        self.currentState.transitionOut.bind(self.currentState) : noop;

    transitionOut(function() {
        if (self.currentState && self.currentState.exit) {
            self.currentState.exit();
        }
        self.currentState = null;
        var SubState = self.substates[id];
        var newState = new SubState(self.parentState);
        var transitionIn = newState && newState.transitionIn ?
            newState.transitionIn.bind(newState) : noop;

        transitionIn(function() {
            self.currentState = newState;
            if (self.currentState && self.currentState.enter) {
                self.currentState.enter();
            }
        });
    });
};

SubState.prototype.update = function () {
    if (this.currentState && this.currentState.update) {
        this.currentState.update();
    }
}


module.exports = SubState;
