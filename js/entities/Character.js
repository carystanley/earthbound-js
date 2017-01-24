
function Character(game, x, y, skin, physics) {
	var offest = skin * 8;
    Phaser.Sprite.call(this, game, x, y, 'actors', offest + 4);
    this.animations.add('up', [offest + 0, offest + 1], 5, true);
    this.animations.add('right', [offest + 2, offest + 3], 10, true);
    this.animations.add('down', [offest + 4, offest + 5], 5, true);
    this.animations.add('left', [offest + 6, offest + 7], 10, true);

    this.anchor.setTo(0.5, 1);

    if (physics) {
        game.physics.arcade.enable(this);
        this.body.setSize(14, 7, 5, 27);
        game.slopes.enable(this);
    }
}

Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;

module.exports = Character;
