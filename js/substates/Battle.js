
var BattleSubState = function(state) {
    this.parent = state;
}

BattleSubState.prototype.transitionIn = function(callback) {
    this.parent.encounterMatte.show(callback);
}

BattleSubState.prototype.update = function() {
    var state = this.parent;
    if (state.actionKey.isDown) {
        state.switchSubState('world');
    }
};

BattleSubState.prototype.transitionOut = function(callback) {
    this.parent.encounterMatte.hide(callback);
}

module.exports = BattleSubState;
