var Event = require('./Event');

function DialogEvent(game, settings) {
    Event.call(this, game, settings);
}

DialogEvent.prototype = Object.create(Event.prototype);
DialogEvent.prototype.constructor = DialogEvent;

DialogEvent.prototype.onTouch = function() {
	var properties = this.settings.properties;
    this.game.showDialog(properties.text);
};

module.exports = DialogEvent;