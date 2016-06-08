var properties = require('./properties')
  , states =
    { boot: require('./states/boot.js')
    , preloader: require('./states/preloader.js')
    , game: require('./states/game.js')
    }
  , game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game', null, false, false);

// Automatically register each state.
Object.keys(states).forEach(function(key) {
    var state = states[key];
    game.state.add(key, state);
});

game.state.start('boot');
