var WorldSubState = {
    enter: function() {
        this.playerDisabled = false;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
	},
    update: function() {
        this.characters.sort('y', Phaser.Group.SORT_ASCENDING);
        if (!this.playerDisabled) {

            var events = this.currentMap.getEvents();

            this.physics.arcade.collide(this.player, this.currentMap.backgroundLayer);
            this.physics.arcade.overlap(this.player, events, function(player, event) {
        		event.onTouch();
        	});
        }
    },
    exit: function() {
	}
};

module.exports = WorldSubState;