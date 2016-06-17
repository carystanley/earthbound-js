
function Character(game, x, y, skin, physics) {
	var offest = skin * 8;
    Phaser.Sprite.call(this, game, x, y, 'actors');
    this.animations.add('up', [offest + 0, offest + 1], 5, true);
    this.animations.add('right', [offest + 2, offest + 3], 10, true);
    this.animations.add('down', [offest + 4, offest + 5], 5, true);
    this.animations.add('left', [offest + 6, offest + 7], 10, true);

    if (physics) {
        game.physics.arcade.enable(this);
        game.slopes.enable(this);
        //this.body.aabb = new Phaser.Physics.Ninja.AABB(this.body, this.x, this.y, 16, 7);
        //this.body.shape = this.body.aabb;
    }

    this.anchor.x = 0.5;
    this.anchor.y = 1;
}

Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;

module.exports = Character;