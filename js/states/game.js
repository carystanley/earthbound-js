var Config = require('../utils/Config')
var Loader = require('../utils/Loader');
var SubState = require('../utils/SubState');
var Follower = require('../entities/Follower');
var Player = require('../entities/Player');
var Map = require('../map/Map');
var substates = {
    world: require('../substates/World'),
    transition: require('../substates/Transition'),
    dialog: require('../substates/Dialog'),
    battle: require('../substates/Battle'),
    menu: require('../substates/Menu')
};
var DialogComponent = require('../components/DialogComponent');
var MenuComponent = require('../components/MenuComponent');
var MatteComponent = require('../components/MatteComponent');
var EncounterMatteComponent = require('../components/EncounterMatteComponent');

var game = {};

game.substate = new SubState(game, substates);

game.init = function(mapid, startLocation) {
    this.mapId = mapid;
    this.startLocationId = startLocation;
}

game.preload = function () {
	Loader.loadResource(game.game, 'default');
	Loader.loadResource(game.game, this.mapId);

    game.load.spritesheet('actors', 'images/actors.png', 24, 32);
}

var follower;
var follower2;

game.create = function () {
	this.mapConfig = Config.getResource(this.mapId);

	this.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);
	game.physics.arcade.gravity.y = 0;

    if (this.mapConfig.bgm) {
        this.backgroundMusic = game.add.audio(this.mapConfig.bgm);
        this.backgroundMusic.play('', 0, 1, true);
    }
    this.soundEffects = {
        sfx_door_open: game.add.audio('sfx_door_open')
    };
    this.currentMap = new Map(game, this.mapConfig);
    this.characters = game.add.group();
    var playerStart = this.currentMap.getLocation(this.startLocationId);
    this.player = new Player(game.game, this.currentMap, playerStart.x, playerStart.y, 0);
    follower = new Follower(game.game, 1, this.player);
    follower2 = new Follower(game.game, 2, follower);
    this.characters.add(this.player);
    this.characters.add(follower);
    this.characters.add(follower2);
    this.matte = new MatteComponent(game.game);
    this.encounterMatte = new EncounterMatteComponent(game.game);
    this.chatDialog = new DialogComponent(game.game);
    this.menuDialog = new MenuComponent(game.game);
    this.switchSubState('world');

    this.cursors = game.input.keyboard.createCursorKeys();
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    this.matte.fadeIn();
};

/* Simple Debug
game.render = function () {
    game.game.debug.body(this.player);
}
*/

game.update = function () {
    this.substate.update();
}

game.switchSubState = function (id) {
    this.substate.switch(id);
};

/* ------- Actions ---------- */

game.fadeIn = function (callback) {
	this.matte.fadeIn(callback);
};

game.fadeOut = function (callback) {
	this.matte.fadeOut(callback);
};

game.soundEffectPlay = function (id) {
    this.soundEffects[id].play();
};

game.transport = function(mapId, locationId) {
	var self = this;
	this.switchSubState('transition');
	this.soundEffectPlay('sfx_door_open');
	this.fadeOut(function() {
		if (self.mapId === mapId) {
            var locationPos = self.currentMap.getLocation(locationId);
            self.player.reset(locationPos.x, locationPos.y);
            self.fadeIn(function() {
		        self.switchSubState('world');
			});
        } else {
            self.backgroundMusic.stop();
            self.state.start('game', true, false, mapId, locationId);
	    }
    });
};

game.showDialog = function (displayText) {
	this.chatDialog.setText(displayText);
    this.switchSubState('dialog');
}

game.mapTint = function (tint) {
    this.currentMap.foregroundLayer.tint = tint;
    this.currentMap.backgroundLayer.tint = tint;
}

// Use //foregroundLayer.tint = 0x222299; to simulate nighttime


module.exports = game;
