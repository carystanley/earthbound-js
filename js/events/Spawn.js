var Event = require('./Event');

function Spawn(game, settings) {
    Event.call(this, game, settings);
    this.flagIsVisible = false;
}

Spawn.prototype = Object.create(Event.prototype);
Spawn.prototype.constructor = Spawn;

Spawn.prototype.update = function() {
    if (this.inCamera && !this.flagIsVisible) {
        this.flagIsVisible = true;
        console.error('Spawn!');
        this.onVisible();
    } else if (!this.inCamera && this.flagIsVisible) {
        this.flagIsVisible = false;
    }
}

Spawn.prototype.onVisible = function() {
    this.game.spawnEnemy(this.settings.type, this.body.x + this.body.width / 2, this.body.y + this.body.height / 2);
};

module.exports = Spawn;
