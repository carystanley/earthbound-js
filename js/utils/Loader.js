var Config = require('./Config');

var Loader = {};

Loader.loadResource = function (game, id) {
	var self = this;
    var dep = Config.getResource(id);

	switch (dep.type) {
		case 'image':
            if (game.cache.checkImageKey(dep.id)) return;
		    game.load.image(dep.id, dep.path);
		    break;

		case 'sprite':
		    break;

		case 'map':
		    if (game.cache.checkTilemapKey(dep.id)) return;
		    game.load.tilemap(dep.id, dep.path, null, Phaser.Tilemap.TILED_JSON);
		    if (dep.tileset) {
                dep.tileset.forEach(function(tilesetId) {
					self.loadResource(game, tilesetId);
				});
			}
		    if (dep.bgm) {
				self.loadResource(game, dep.bgm);
		    }
		    break;

		case 'resources':
		    if (dep.resources) {
                dep.resources.forEach(function(rId) {
					self.loadResource(game, rId);
				});
			}
		    break;

		case 'audio':
		    if (game.cache.checkSoundKey(dep.id)) return;
		    game.load.audio(dep.id, dep.path);
		    break;

		case 'bitmapfont':
		    if (game.cache.checkBitmapFontKey(dep.id)) return;
		    game.load.bitmapFont(dep.id, dep.path, dep.meta);
		    break;
    }
};

module.exports = Loader;