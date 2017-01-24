
var DialogSubState = function(state) {
    this.parent = state;
}

DialogSubState.prototype.enter = function() {
      this.parent.chatDialog.show();
};

DialogSubState.prototype.update = function() {
    var state = this.parent;

        if (state.actionKey.isDown) {
            state.switchSubState('world');
        }
};

DialogSubState.prototype.exit = function() {
      this.parent.chatDialog.hide();
};

module.exports = DialogSubState;
