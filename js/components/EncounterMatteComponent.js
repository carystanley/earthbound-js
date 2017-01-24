
var EncounterMatteComponent = function(game) {
  var matte = game.add.graphics(0, 0);
    matte.fixedToCamera = true;
    matte.beginFill(0xFF0000, 1);
    matte.drawRect(0, 0, game.width, game.height);
    matte.alpha = 0;
    matte.endFill();
    this.matte = matte;
    this.game = game;
};

EncounterMatteComponent.prototype.fadeTween = function (alpha, callback) {
    callback = callback || function() {};

    s = this.game.add.tween(this.matte);
    s.to({ alpha: alpha }, 500, null);
    s.onComplete.add(callback);
    s.start();
};

EncounterMatteComponent.prototype.hide = function(callback) {
    callback = callback || function() {};
    this.matte.alpha = 0;
    callback();
};

EncounterMatteComponent.prototype.show = function(callback) {
    this.fadeTween(0.5, callback);
};

module.exports = EncounterMatteComponent;
