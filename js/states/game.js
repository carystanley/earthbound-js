/* global Phaser */

var Config = require('../utils/Config')
var Loader = require('../utils/Loader');
var SubState = require('../utils/SubState');
var PlayerGroup = require('../entities/PlayerGroup');
var Enemy = require('../entities/Enemy');
var Map = require('../map/Map');
var substates = {
    world: require('../substates/World'),
    transition: require('../substates/Transition'),
    dialog: require('../substates/Dialog'),
    battle: require('../substates/Battle'),
    worldmenu: require('../substates/WorldMenu'),
    worldgoodsmenu: require('../substates/WorldGoodsMenu')
};
var DialogComponent = require('../hud/DialogComponent');
var uiTypes = {
    menu: require('../hud/MenuComponent')
};
var MatteComponent = require('../hud/MatteComponent');
var EncounterMatteComponent = require('../hud/EncounterMatteComponent');

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
    this.enemies = game.add.group();

    this.spawns = game.add.group();
    this.currentMap.spawns.forEach(function (spawn) {
        this.spawns.add(spawn);
    }, this);

    var playerStart = this.currentMap.getLocation(this.startLocationId);
    this.player = new PlayerGroup(game.game, this.currentMap, playerStart.x, playerStart.y);
    this.matte = new MatteComponent(game.game);
    this.encounterMatte = new EncounterMatteComponent(game.game);
    this.chatDialog = new DialogComponent(game.game);
    this.setupUI();
    this.switchSubState('world');

    this.cursors = game.input.keyboard.createCursorKeys();
    this.actionKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.cancelKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
    this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.X ]);

    this.matte.fadeIn();
};

game.setupUI = function() {
    var uiConfig = Config.getConfig('ui');
    var ui = {};
    Object.keys(uiConfig).forEach(function (key) {
        var config = uiConfig[key];
        ui[key] = new (uiTypes[config.type])(game.game, config);
    });
    this.ui = ui;
}

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

game.spawnEnemy = function (type, x, y) {
    this.enemies.add(new Enemy(this.game, type, x, y));
}

// Use //foregroundLayer.tint = 0x222299; to simulate nighttime


module.exports = game;
