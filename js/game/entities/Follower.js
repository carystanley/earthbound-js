Character = require('./Character');

function Follower(game, followCharacter) {
    Character.call(this, game, followCharacter.x, followCharacter.y, false);
    this.initQueue(followCharacter, 16);
}

Follower.prototype = Object.create(Character.prototype);
Follower.prototype.constructor = Follower;

Follower.prototype.initQueue = function(followCharacter, followMax) {
    this.followCharacter = followCharacter;
    this.followQueue = [];
    this.leaderCursor = 0;
    this.followerCursor = 1;
    this.followMax = followMax;
    for (var f = 0; f < followMax; f++) {
		this.followQueue[f] = {animation: 'down', x: followCharacter.x, y: followCharacter.y};
	}
};

Follower.prototype.updateQueue = function() {
    this.leaderCursor = (this.leaderCursor + 1) % this.followMax;
    this.followerCursor = (this.followerCursor + 1) % this.followMax;
    this.followQueue[this.leaderCursor].animation = this.followCharacter.animations.currentAnim.name;
    this.followQueue[this.leaderCursor].x = this.followCharacter.x;
    this.followQueue[this.leaderCursor].y = this.followCharacter.y;
    var followerMeta = this.followQueue[this.followerCursor];
    this.x = followerMeta.x;
    this.y = followerMeta.y;
    this.play(followerMeta.animation);
};

Follower.prototype.update = function () {
    if (this.game.state.getCurrentState().playerDisabled) return;

    // Handle Following
    if (this.followCharacter.animations.currentAnim.isPlaying) {
        this.updateQueue();
    } else {
		this.animations.stop();
	}
}

module.exports = Follower;