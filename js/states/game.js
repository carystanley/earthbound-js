var Config = require('../utils/Config')
var Loader = require('../utils/Loader');
var Follower = require('../entities/Follower');
var Player = require('../entities/Player');
var Map = require('../map/Map');
var SubState = {
    World: require('../substates/World'),
    Transition: require('../substates/Transition'),
    Dialog: require('../substates/Dialog'),
    Battle: require('../substates/Battle')
};
var DialogComponent = require('../components/DialogComponent');
var MatteComponent = require('../components/MatteComponent');

var game = {};

game.SubState = SubState;

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
    this.chatDialog = new DialogComponent(game.game);
    this.switchSubState(SubState.World);

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
    if (this.substate && this.substate.update) {
        this.substate.update.call(this);
	}
}

game.switchSubState = function (newSubState) {
    if (this.substate && this.substate.exit) {
	    this.substate.exit.call(this);
	}
    this.substate = newSubState;
    if (this.substate && this.substate.enter) {
        this.substate.enter.call(this);
	}
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
	this.switchSubState(SubState.Transition);
	this.soundEffectPlay('sfx_door_open');
	this.fadeOut(function() {
		if (self.mapId === mapId) {
            var locationPos = self.currentMap.getLocation(locationId);
            self.player.reset(locationPos.x, locationPos.y);
            self.fadeIn(function() {
		        self.switchSubState(SubState.World);
			});
        } else {
            self.backgroundMusic.stop();
            self.state.start('game', true, false, mapId, locationId);
	    }
    });
};

game.showDialog = function (displayText) {
	this.chatDialog.setText(displayText);
    this.switchSubState(SubState.Dialog);
}

// Use //foregroundLayer.tint = 0x222299; to simulate nighttime


module.exports = game;
