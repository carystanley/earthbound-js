/* global Phaser */

function Frame(game, config) {
    game.cache.addNinePatch('ninepatch_dialog', 'image_dialog', null, 8, 8, 16, 16);
    var frame = new Phaser.NinePatchImage(game, config.x, config.y, 'ninepatch_dialog');
    frame.targetWidth = config.width;
    frame.targetHeight = config.height;
    frame.fixedToCamera = true;
    frame.visible = false;

    this.frame = frame;
};

Frame.prototype.show = function() {
    this.frame.visible = true;
};

Frame.prototype.hide = function() {
    this.frame.visible = false;
};

module.exports = Frame;
