var MenuSubState = function(state) {
    this.parent = state;
}

MenuSubState.prototype.enter = function() {
    var state = this.parent;
    this.menu = state.menus[this.menuId];
    this.menu.setOptions(this.getOptions());
    this.menu.show();
    this.setCoolOff();
};

MenuSubState.prototype.update = function() {
    var state = this.parent;

    if (this.coolOff <= 0) {
        if (state.cancelKey.isDown) {
            this.onCancel && this.onCancel();
        } else if (state.actionKey.isDown) {
            this.onSelect && this.onSelect(this.menu.getSelectedId());
        } else if (state.cursors.up.isDown) {
            this.menu.selectionUp()
            this.setCoolOff();
        } else if (state.cursors.down.isDown) {
            this.menu.selectionDown()
            this.setCoolOff();
        }
    } else {
        this.coolOff--;
    }
};

MenuSubState.prototype.setCoolOff = function() {
    this.coolOff = 10;
};

module.exports = MenuSubState;
