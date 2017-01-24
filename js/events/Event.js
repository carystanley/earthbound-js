
function Event(game, settings) {
	this.game = game;
	this.settings = settings;

    Phaser.Sprite.call(this, game, settings.x || 0, settings.y || 0);
    this.renderable = false;
    this.width = settings.width || 16;
    this.height = settings.height || 16;
    game.physics.arcade.enable(this);
    this.body.immovable = true;
}

Event.prototype = Object.create(Phaser.Sprite.prototype);
Event.prototype.constructor = Event;

Event.prototype.onTouch = function() {};

module.exports = Event;
