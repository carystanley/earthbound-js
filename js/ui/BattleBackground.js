/* global Phaser */

function BattleBackgroundLine(game, y, width, height, skin) {
    Phaser.Sprite.call(this, game, 0, y, skin);
    this.lineWidth = width;
    this.lineHeight = height;
    this.t = 0;
}

BattleBackgroundLine.prototype = Object.create(Phaser.Sprite.prototype);
BattleBackgroundLine.prototype.constructor = BattleBackgroundLine;

BattleBackgroundLine.prototype.update = function () {
    var t = this.t++;
    var y = this.y;
    var width = this.lineWidth;
    var height = this.lineHeight;

    var A = 30;
    var F = 0.03;
    var S = 0.04;

    var offset = A * Math.sin(F * y + S * t);
    this.crop(new Phaser.Rectangle(Math.floor((offset + width) % width), y % 64, width, height));
    this.updateCrop();
};

function BattleBackground(game, config) {
    var width = game.width;
    var height = game.height;
    var background = game.add.group();
    var size = 2;

    background.fixedToCamera = true;
    for (var y = 0; y < height; y += 2) {
        background.add(new BattleBackgroundLine(game, y, width, size, 'battlebg_1'));
    }

    background.visible = false;
    this.background = background;
};

BattleBackground.prototype.show = function() {
    this.background.visible = true;
};

BattleBackground.prototype.hide = function() {
    this.background.visible = false;
};

module.exports = BattleBackground;
