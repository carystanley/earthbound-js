var preloader = {};

preloader.preload = function () {
    // this.game.load.image('logo', 'images/phaser.png');
};

preloader.create = function () {
    this.game.state.start('game', true, false, 'map_house', 'start');
};

module.exports = preloader;
