
var DialogSubState = {
    enter: function() {
	   this.playerDisabled = true;
	   this.chatDialog.visible = true;
	},
    update: function() {
    },
    exit: function() {
	    this.chatDialog.visible = false;
	}
};

module.exports = DialogSubState;