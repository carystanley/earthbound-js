
DialogComponent = function(game) {
    this.container = game.add.image(96, 8, 'chat_dialog');
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