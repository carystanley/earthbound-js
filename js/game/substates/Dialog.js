
var DialogSubState = {
    enter: function() {
	   this.playerDisabled = true;
	   this.chat_dialog.visible = true;
	},
    update: function() {
    },
    exit: function() {
	    this.chat_dialog.visible = false;
	}
};

module.exports = DialogSubState;