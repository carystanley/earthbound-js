Character = require('./Character');

function Enemy(game, type, x, y) {
    Character.call(this, game, x, y, 7, true);
    this.timer = 0;
    this.accel = 80;
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function () {
    //this.body.velocity.x = 0;
    //this.body.velocity.y = 0;
    if (this.game.state.getCurrentState().playerDisabled) {
	   	this.animations.stop();
	    return;
    }

  this.timer--;
  if (this.timer <= 0) {
      this.body.velocity.x = Math.floor(Math.random() * 2 - 1) * this.accel;
      this.body.velocity.y = Math.floor(Math.random() * 2 - 1) * this.accel;
      this.timer = 60;
  }

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
