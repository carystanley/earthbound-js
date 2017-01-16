var WorldSubState = function(parent) {
    this.parent = parent;
}

WorldSubState.prototype.enter = function() {
    var state = this.parent;
    state.playerDisabled = false;
    state.game.camera.follow(state.player, Phaser.Camera.FOLLOW_TOPDOWN);
};

WorldSubState.prototype.update = function() {
    var state = this.parent;

    state.characters.sort('y', Phaser.Group.SORT_ASCENDING);
    if (!state.playerDisabled) {
        var events = state.currentMap.getEvents();

        state.physics.arcade.collide(state.player, state.currentMap.backgroundLayer);
        state.physics.arcade.collide(state.player, events, function(player, event) {
            event.onTouch();
        });
    }
};

WorldSubState.prototype.exit = function() {
    this.parent.playerDisabled = true;
}

module.exports = WorldSubState;
