var EventTypes = {
    transport: require('../events/TransportEvent'),
    dialog: require('../events/DialogEvent')
};
var Spawn = require('../events/Spawn');

function Map(game, config) {
    this.game = game;
    this.id = config.id;
    this.map = game.add.tilemap(config.id);
    config.tileset.forEach(function(tileset) {
        this.map.addTilesetImage(tileset, tileset);
    }, this);

    game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.backgroundLayer = this.map.createLayer('background');
    this.foregroundLayer = this.map.createLayer('foreground');
    // floatingLayer = map.createLayer('floating');

    this.locations = this.setupLocations(this.map);
    this.events = this.setupEvents(this.game, this.map);
    this.spawns = this.setupSpawns(this.game, this.map);

    var slopeLookup = {
        291: null,
        158: 'HALF_TOP_RIGHT',
        159: 'HALF_TOP_LEFT',
        97: null,
        80: 'HALF_TOP_RIGHT',
        81: 'HALF_TOP_LEFT',
        82: 'HALF_TOP_LEFT'
    }
    var slopeMap = [];
    for (var i = 0; i <= 291; i++) {
        slopeMap.push(slopeLookup[i] !== null ? slopeLookup[i] || 'FULL' : undefined);
    }
    this.game.game.slopes.convertTilemapLayer(this.backgroundLayer, slopeMap);
    // this.map.setCollisionBetween(0, 291, true, 'background');
}

Map.prototype.getEvents = function () {
    return this.events;
}

Map.prototype.setupSpawns = function (game, map) {
    var spawns = [];
    map.objects['Spawns'].forEach(function(element){
        spawns.push(new Spawn(game, element));
    });
    return spawns;
}

Map.prototype.setupEvents = function (game, map) {
    var events = [];
    map.objects['Events'].forEach(function(element){
        events.push(new (EventTypes[element.type])(game, element));
    });
    return events;
}

Map.prototype.setupLocations = function (map) {
    var locations = {};
    map.objects['Locations'].forEach(function(element){
        locations[element.name] = {
            x: element.x + element.width / 2,
            y: element.y + element.height / 2
        };
    });
    return locations;
}

Map.prototype.getLocation = function(id) {
    return this.locations[id];
}

module.exports = Map;
