var WorldSubState = {
    enter: function() {
        this.playerDisabled = false;
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);
	},
    update: function() {
        this.characters.sort('y', Phaser.Group.SORT_ASCENDING);
        if (!this.playerDisabled) {

            var collisonTiles = this.currentMap.getCollisionMap();
            var events = this.currentMap.getEvents();

            for (var i = 0; i < collisonTiles.length; i++) {
                this.player.body.aabb.collideAABBVsTile(collisonTiles[i].tile);
            }
            //var tiles = collisonTiles.map(function(t) { return t.tile; });
            //game.physics.ninja.collide(player, tiles);
            this.physics.ninja.overlap(this.player, events, function(player, event) {
        		event.onTouch();
        	});
        }
    },
    exit: function() {
	}
};

module.exports = WorldSubState;