var Character = require('./Character');

function Player(game, map, x, y, skin) {
    Character.call(this, game, x, y, skin, true);
    this.map = map;

    // this.body.drag.x = 640;
    // this.body.drag.y = 640;
    // this.body.maxVelocity.x = 80;
    // this.body.maxVelocity.y = 80;
    this.accel = 80;
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    if (this.game.state.getCurrentState().playerDisabled) {
        this.animations.stop();
        return;
    }

    var direction = null;
    var cursors = this.game.state.getCurrentState().cursors;

    if (cursors.left.isDown)
    {
        this.body.velocity.x = -this.accel;
        direction = 'left';
    }
    else if (cursors.right.isDown)
    {
        this.body.velocity.x = this.accel;
        direction = 'right';
    }

    if (cursors.up.isDown)
    {
        this.body.velocity.y = -this.accel;
        direction = 'up';
    }
    else if (cursors.down.isDown)
    {
        this.body.velocity.y = this.accel;
        direction = 'down';
    }

    if (direction) {
        this.play(direction);
    } else {
        this.animations.stop();
    }
};

module.exports = Player;
