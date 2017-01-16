
var BattleSubState = function(state) {
    this.parent = state;
    this.isBlack = false;
}

BattleSubState.prototype.enter = function() {
    var self = this;
    var state = this.parent;

		state.playerDisabled = true;
    this.isBlack = false;
    state.encounterMatte.show(function() {
        self.isBlack = true;
    });
};

BattleSubState.prototype.update = function() {
    var state = this.parent;
    if (this.isBlack && state.spaceKey.isDown) {
        state.encounterMatte.hide(function() {
            state.switchSubState('world');
        });
  	}
};

module.exports = BattleSubState;
