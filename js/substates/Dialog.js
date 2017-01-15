
var DialogSubState = {
    enter: function() {
	   this.playerDisabled = true;
	   this.chatDialog.show();
	},
    update: function() {
		if (this.spaceKey.isDown) {
			this.switchSubState(this.SubState.World);
		}
    },
    exit: function() {
	    this.chatDialog.hide();
	}
};

module.exports = DialogSubState;
