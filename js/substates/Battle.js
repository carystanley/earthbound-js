class BattleSubState {
    constructor(state) {
        this.parent = state;
    }

    transitionIn(callback) {
        var state = this.parent;
        state.encounterIn(function () {
            state.hideWorld();
            state.showBattle();
            callback();
        });
    }

    update () {
        var state = this.parent;
        if (state.actionKey.isDown) {
            state.switchSubState('world');
        }
    }

    transitionOut(callback) {
        var state = this.parent;
        state.showWorld();
        state.hideBattle();
        state.encounterOut(callback);
    }
}

export default BattleSubState;
