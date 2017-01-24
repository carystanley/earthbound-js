/* global Phaser */

var Follower = require('./Follower');
var Player = require('./Player');

function PlayerGroup(game, currentMap, x, y) {
    Phaser.Group.call(this, game);
    this.player = new Player(game, currentMap, x, y, 0);
    var follower = new Follower(game, 1, this.player);
    var follower2 = new Follower(game, 2, follower);
    this.add(this.player);
    this.add(follower);
    this.add(follower2);
}

PlayerGroup.prototype = Object.create(Phaser.Group.prototype);
PlayerGroup.prototype.constructor = PlayerGroup;

PlayerGroup.prototype.reset = function (x, y) {
    this.player.reset(x, y);
};

PlayerGroup.prototype.getLeader = function () {
    return this.player;
};

module.exports = PlayerGroup;
