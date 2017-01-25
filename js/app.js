/* global Phaser */

var properties = require('./properties');
var states = {
    boot: require('./states/boot.js'),
    preloader: require('./states/preloader.js'),
    game: require('./states/game.js')
};
var game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game', null, false, false);

var Config = require('./utils/Config');
Config.load({
    resources: require('../config/resources.json'),
    characters: require('../config/characters.json'),
    enemies: require('../config/enemies.json'),
    events: require('../config/events.json'),
    items: require('../config/items.json'),
    lang: require('../config/lang.json'),
    ui: require('../config/ui.json')    
});

// Automatically register each state.
Object.keys(states).forEach(function(key) {
    var state = states[key];
    game.state.add(key, state);
});

game.state.start('boot');
