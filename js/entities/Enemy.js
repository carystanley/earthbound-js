Character = require('./Character');

function Enemy(game, type, x, y) {
    Character.call(this, game, x, y, 7, true);
    this.timer = 0;
    this.accel = 80;
    this.visLife = 60;

    this.velX = 0;
    this.velY = 0;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    if (!this.inCamera) {
        this.visLife--;
        if (this.visLife < 0) {
            this.kill();
            return;
        }
    } else {
        this.visLife = 60;
    }

    if (this.game.state.getCurrentState().playerDisabled) {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
	   	this.animations.stop();
	    return;
    }

  this.timer--;
  if (this.timer <= 0) {
      this.velX = Math.floor(Math.random() * 2 - 1) * this.accel;
      this.velY = Math.floor(Math.random() * 2 - 1) * this.accel;
      this.timer = 60;
  }

  this.body.velocity.x = this.velX;
  this.body.velocity.y = this.velY;

	var direction = null;

    if ((this.body.velocity.x < this.body.velocity.y) && (this.body.velocity.x < 0))
    {
        direction = 'left';
    }
    else if ((this.body.velocity.x > this.body.velocity.y) && (this.body.velocity.x > 0))
    {
        direction = 'right';
    }

    if ((this.body.velocity.y < this.body.velocity.x) && (this.body.velocity.y < 0))
    {
        direction = 'up';
    }
    else if ((this.body.velocity.y > this.body.velocity.x) && (this.body.velocity.y > 0))
    {
        direction = 'down';
    }

    if (direction) {
        this.play(direction);
    } else {
        this.animations.stop();
    }
};

Enemy.prototype.onTouch = function() {
    this.game.state.getCurrentState().switchSubState('battle');
    this.kill();
};

module.exports = Enemy;
