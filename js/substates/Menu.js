var MenuSubState = function(state) {
    this.parent = state;
}

MenuSubState.prototype.enter = function() {
    var state = this.parent;
		state.playerDisabled = true;
    state.menuDialog.show();
    this.setCoolOff();
};

MenuSubState.prototype.update = function() {
    var state = this.parent;

    if (this.coolOff <= 0) {
        var cursors = state.cursors;
        var direction = null;

        if (cursors.up.isDown) {
          state.menuDialog.selectionUp()
          this.setCoolOff();
        } else if (cursors.down.isDown) {
          state.menuDialog.selectionDown()
          this.setCoolOff();
        }
    } else {
        this.coolOff--;
    }
};

MenuSubState.prototype.setCoolOff = function() {
    this.coolOff = 10;
};

MenuSubState.prototype.exit = function() {
    var state = this.parent;
    state.menuDialog.hide();
};

module.exports = MenuSubState;
