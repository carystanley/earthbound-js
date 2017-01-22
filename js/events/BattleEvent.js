var Event = require('./Event');

function BattleEvent(game, settings) {
    Event.call(this, game, settings);
}

BattleEvent.prototype = Object.create(Event.prototype);
BattleEvent.prototype.constructor = BattleEvent;

BattleEvent.prototype.onTouch = function() {
    this.game.switchSubState('battle');
};

module.exports = BattleEvent;
