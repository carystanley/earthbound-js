function MatteComponent (game) {
    var matte = game.add.graphics(0, 0);
    matte.fixedToCamera = true;
    matte.alpha = 1;

    this.matte = matte;
    this.game = game;
};

MatteComponent.prototype.transition = function (color, alpha, time, callback) {
    callback = callback || function() {};

    var game = this.game;
    var matte = this.matte;
    matte.clear();
    matte.beginFill(color, 1);
    matte.drawRect(0, 0, game.width, game.height);
    matte.endFill();

    var s = this.game.add.tween(this.matte);
    s.to({ alpha: alpha }, time, null);
    s.onComplete.add(callback);
    s.start();
};

module.exports = MatteComponent;
