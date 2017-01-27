class DialogSubState {
    constructor(state) {
        this.parent = state;
    }

    enter() {
        this.parent.chatDialog.show();
    }

    update() {
        var state = this.parent;

        if (state.actionKey.isDown) {
            state.switchSubState('world');
        }
    }

    exit() {
        this.parent.chatDialog.hide();
    }
};

module.exports = DialogSubState;
