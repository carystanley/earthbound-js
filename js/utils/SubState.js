
function SubState(state, substates) {
    this.parentState = state;
    this.substates = substates;
    this.currentState = null;
}

SubState.prototype.switch = function (id) {
    if (this.currentState && this.currentState.exit) {
	      this.currentState.exit();
	  }
    var newState = this.substates[id];
    this.currentState = new newState(this.parentState);
    if (this.currentState && this.currentState.enter) {
        this.currentState.enter(this);
	  }
};

SubState.prototype.update = function () {
    if (this.currentState && this.currentState.update) {
        this.currentState.update();
    }
}


module.exports = SubState;
