var EventTypes = {
    transport: require('../events/TransportEvent'),
    dialog: require('../events/DialogEvent')
};

function Map(game, config) {
	this.game = game;
	this.config = config;
    this.map = game.add.tilemap(config.id);
    Object.keys(config.tilesets).forEach(function(tileset) {
		this.map.addTilesetImage(tileset, tileset);
	}, this);

    game.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    this.backgroundLayer = this.map.createLayer('background');
    this.foregroundLayer = this.map.createLayer('foreground');
    //floatingLayer = map.createLayer('floating');

    this.locations = this.setupLocations(this.map);
    this.events = this.setupEvents(this.game, this.map);

    var slopeLookup = {
	    291: 0,
		158: 4,
		159: 5,
		97: 0,
		80: 4,
		81: 5,
		82: 5
	}
    var slopeMap = [];
    for (var i = 0; i < 291; i++) {
        slopeMap.push(slopeLookup[i] !== undefined ? slopeLookup[i] : 1);
	}
    this.collisonTiles = game.physics.ninja.convertTilemap(this.map, this.backgroundLayer, slopeMap);
}

Map.prototype.getCollisionMap = function () {
	return this.collisonTiles;
}

Map.prototype.getEvents = function () {
    return this.events;
}

Map.prototype.setupEvents = function (game, map) {
    events = [];
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

Map.prototype.getConfig = function() {
    return this.config;
}

module.exports = Map;