
var DialogSubState = function(state) {
    this.parent = state;
}

DialogSubState.prototype.enter = function() {
    var state = this.parent;

	  state.playerDisabled = true;
	  state.chatDialog.show();
};

DialogSubState.prototype.update = function() {
    var state = this.parent;

		if (state.spaceKey.isDown) {
		  	state.switchSubState('world');
		}
};

DialogSubState.prototype.exit = function() {
	  this.parent.chatDialog.hide();
};

module.exports = DialogSubState;
