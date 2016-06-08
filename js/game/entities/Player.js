Character = require('./Character');

function Player(game, map, x, y) {
    Character.call(this, game, x, y, true);
    this.map = map;

    this.body.drag = 0.80;
    this.body.maxSpeed = 60;
    this.accel = 15;

    this.cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(this, Phaser.Camera.FOLLOW_TOPDOWN);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    if (this.game.state.getCurrentState().playerDisabled) return;

	var direction = null;
	var cursors = this.cursors;

    if (cursors.left.isDown)
    {
        this.body.moveLeft(this.accel);
        direction = 'left';
    }
    else if (cursors.right.isDown)
    {
        this.body.moveRight(this.accel);
        direction = 'right';
    }

    if (cursors.up.isDown)
    {
        this.body.moveUp(this.accel);
        direction = 'up';
    }
    else if (cursors.down.isDown)
    {
        this.body.moveDown(this.accel);
        direction = 'down';
    }

    if (direction) {
        this.play(direction);
    } else {
        this.animations.stop();
    }
};

module.exports = Player;