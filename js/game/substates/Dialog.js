
var DialogSubState = {
    enter: function() {
	   this.playerDisabled = true;
	   this.chatDialog.visible = true;
	},
    update: function() {
		if (this.spaceKey.isDown) {
			this.switchSubState(this.SubState.World);
		}
    },
    exit: function() {
	    this.chatDialog.visible = false;
	}
};

module.exports = DialogSubState;