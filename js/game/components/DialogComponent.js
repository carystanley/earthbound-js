
DialogComponent = function(game) {
    this.container = game.add.image(96, 8, 'chat_dialog');
    this.container.fixedToCamera = true;
    this.chatTxt = game.make.bitmapText(8, 8, 'basic', '', 16, this.container);
    this.chatTxt.maxWidth = 144;
    this.container.addChild(this.chatTxt);
    this.container.visible = false;
};

DialogComponent.prototype.setText = function(displayText) {
	console.error(displayText);
    this.chatTxt.setText(displayText);
};

DialogComponent.prototype.show = function() {
    this.container.visible = true;
};

DialogComponent.prototype.hide = function() {
    this.container.visible = false;
};

module.exports = DialogComponent;