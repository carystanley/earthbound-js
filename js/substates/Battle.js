
var BattleSubState = function(state) {
    this.parent = state;
}

BattleSubState.prototype.transitionIn = function(callback) {
    var state = this.parent;
    state.encounterIn(function () {
        state.hideWorld();
        state.showBattle();
        callback();
    });
}

BattleSubState.prototype.update = function() {
    var state = this.parent;
    if (state.actionKey.isDown) {
        state.switchSubState('world');
    }
};

BattleSubState.prototype.transitionOut = function(callback) {
    var state = this.parent;
    state.showWorld();
    state.hideBattle();
    state.encounterOut(callback);
}

module.exports = BattleSubState;
