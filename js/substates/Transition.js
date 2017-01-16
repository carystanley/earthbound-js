
var TransitionSubState = function(state) {
    this.parent = state;
};

TransitionSubState.prototype.enter = function() {
    this.parent.playerDisabled = true;
}

module.exports = TransitionSubState;
