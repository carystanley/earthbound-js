var Event = require('./Event');

function TransportEvent(game, settings) {
    Event.call(this, game, settings);
}

TransportEvent.prototype = Object.create(Event.prototype);
TransportEvent.prototype.constructor = TransportEvent;

TransportEvent.prototype.onTouch = function() {
	var properties = this.settings.properties;
    this.game.transport(properties.map, properties.location);
};

module.exports = TransportEvent;