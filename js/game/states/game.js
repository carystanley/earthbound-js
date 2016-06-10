var Follower = require('../entities/Follower');
var Player = require('../entities/Player');
var MapConfig = require('../map/MapConfig');
var Map = require('../map/Map');

var game = {};

game.init = function(mapid, startLocation) {
    this.mapConfig = MapConfig[mapid];
    this.startLocationId = startLocation;
}

game.preload = function () {
	var mapConfig = this.mapConfig;
    game.load.tilemap(mapConfig.id, mapConfig.tilemap, null, Phaser.Tilemap.TILED_JSON);
    Object.keys(mapConfig.tilesets).forEach(function(id) {
        game.load.image(id, mapConfig.tilesets[id]);
    });

    game.load.image('chat_dialog', 'images/chat_dialog.png');

    game.load.bitmapFont('basic', 'fonts/basic.png', 'fonts/basic.xml');
    game.load.bitmapFont('mrsaturn', 'fonts/mrsaturn.png', 'fonts/mrsaturn.xml');

    game.load.audio('background_boymeetsgirl', ['audio/background_boymeetsgirl.mp3']);
    game.load.audio('effect_door_open', ['audio/effect_door_open.wav']);

    game.load.spritesheet('actors', 'images/actors.png', 24, 32);
}

var map;
var player;
var follower;
var follower2;

var music;

game.create = function () {
	game.physics.startSystem(Phaser.Physics.NINJA);
	game.physics.ninja.gravity = 0;

    this.backgroundMusic = game.add.audio('background_boymeetsgirl');
    this.soundEffects = {
        effect_door_open: game.add.audio('effect_door_open')
    };
    this.backgroundMusic.play('', 0, 1, true);

    map = new Map(game, this.mapConfig);
    this.characters = game.add.group();
    var playerStart = map.getLocation(this.startLocationId);
    player = new Player(game.game, map, playerStart.x, playerStart.y, 0);
    follower = new Follower(game.game, 1, player);
    follower2 = new Follower(game.game, 2, follower);
    this.characters.add(player);
    this.characters.add(follower);
    this.characters.add(follower2);
    this.setupMatte();
    this.setupChatDialog();

    this.playerDisabled = false;
};

game.update = function () {
    this.characters.sort('y', Phaser.Group.SORT_ASCENDING);
    if (!this.playerDisabled) {

        var collisonTiles = map.getCollisionMap();
        var events = map.getEvents();

        for (var i = 0; i < collisonTiles.length; i++) {
            player.body.aabb.collideAABBVsTile(collisonTiles[i].tile);
        }
        //var tiles = collisonTiles.map(function(t) { return t.tile; });
        //game.physics.ninja.collide(player, tiles);
        game.physics.ninja.overlap(player, events, function(player, event) {
    		event.onTouch();
    	});
    }
}

//game.render = function () {
//    game.game.debug.body(events[0]);
//    game.game.debug.body(player);
//}

game.setupMatte = function() {
    var matte = game.add.graphics(0, 0);
	matte.fixedToCamera = true;
	matte.beginFill(0x000000, 1);
	matte.drawRect(0, 0, game.game.width, game.game.height);
	matte.alpha = 1;
	matte.endFill();
	this.matte = matte;
	this.fadeIn();
};

game.setupChatDialog = function() {
    this.chat_dialog = game.add.image(96, 8, 'chat_dialog');
    this.chat_dialog.fixedToCamera = true;
    var bitmapDialog = game.make.bitmapText(8, 8, 'basic', 'Hello World', 16, this.chat_dialog);
    bitmapDialog.maxWidth = 144;
    this.chat_dialog.addChild(bitmapDialog);
};

game.fadeTween = function (alpha, callback) {
	var game = this;
	var matte = this.matte;
    callback = callback || function() {};

	s = game.add.tween(matte);
	s.to({ alpha: alpha }, 500, null);
	s.onComplete.add(callback);
	s.start();
};
game.fadeIn = game.fadeTween.bind(game, 0);
game.fadeOut = game.fadeTween.bind(game, 1);

game.soundEffectPlay = function (id) {
    this.soundEffects[id].play();
};

game.transport = function(mapId, locationId) {
	var self = this;
	this.playerDisabled = true;
	this.soundEffectPlay('effect_door_open');
	this.fadeOut(function() {
		if (self.mapConfig.id === mapId) {
            var locationPos = map.getLocation(locationId);
            player.reset(locationPos.x, locationPos.y);
            self.fadeIn(function() {
		        self.playerDisabled = false;
			});
        } else {
            self.backgroundMusic.stop();
            self.state.start('game', true, false, mapId, locationId);
	    }
    });
};

// Use //foregroundLayer.tint = 0x222299; to simulate nighttime

module.exports = game;
