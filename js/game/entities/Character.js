
function Character(game, x, y, physics) {
    Phaser.Sprite.call(this, game, x, y, 'actors');
    this.animations.add('up', [1,2], 5, true);
    this.animations.add('right', [13,14], 10, true);
    this.animations.add('down', [25,26], 5, true);
    this.animations.add('left', [37,38], 10, true);

    if (physics) {
        game.physics.ninja.enableAABB(this);
        this.body.aabb = new Phaser.Physics.Ninja.AABB(this.body, this.x, this.y, 16, 7);
        this.body.shape = this.body.aabb;
    }

    this.anchor.x = 0.5;
    this.anchor.y = 1;
}

Character.prototype = Object.create(Phaser.Sprite.prototype);
Character.prototype.constructor = Character;

module.exports = Character;