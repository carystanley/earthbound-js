
DialogComponent = function(game) {
	game.cache.addNinePatch('dialogpatch', 'dialog', null, 8, 8, 16, 16);
    this.container = new Phaser.NinePatchImage(game, 96, 8, 'dialogpatch');
    this.container.targetWidth = 152;
    this.container.targetHeight = 64
    this.container.fixedToCamera = true;
    this.chatTxt = game.make.bitmapText(8, 8, 'basic', '', 16, this.container);
    this.chatTxt.maxWidth = 144;
    this.container.addChild(this.chatTxt);
    this.container.visible = false;
    this.buffer = '';
    this.displayText = '';
    game.time.events.loop(25, this.update, this);
};

DialogComponent.prototype.update = function() {
	if (this.buffer.length > 0) {
	    this.displayText += this.buffer.substr(0, 1);
	    this.buffer = this.buffer.substr(1);
	    this.chatTxt.setText(this.displayText);
	}
};

DialogComponent.prototype.setText = function(displayText) {
	this.buffer = displayText;
};

DialogComponent.prototype.show = function() {
    this.container.visible = true;
};

DialogComponent.prototype.hide = function() {
    this.container.visible = false;
    this.clear();
};

DialogComponent.prototype.clear = function() {
    this.buffer = '';
    this.displayText = '';
    this.chatTxt.setText(this.displayText);
};

module.exports = DialogComponent;