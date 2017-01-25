function MatteComponent (game) {
    var matte = game.add.graphics(0, 0);
    matte.fixedToCamera = true;
    matte.beginFill(0x000000, 1);
    matte.drawRect(0, 0, game.width, game.height);
    matte.alpha = 1;
    matte.endFill();
    this.matte = matte;
    this.game = game;
};

MatteComponent.prototype.fadeTween = function (alpha, callback) {
    callback = callback || function() {};

    var s = this.game.add.tween(this.matte);
    s.to({ alpha: alpha }, 500, null);
    s.onComplete.add(callback);
    s.start();
};

MatteComponent.prototype.fadeIn = function(callback) {
    this.fadeTween(0, callback);
};

MatteComponent.prototype.fadeOut = function(callback) {
    this.fadeTween(1, callback);
};

module.exports = MatteComponent;
