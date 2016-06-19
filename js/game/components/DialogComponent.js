
DialogComponent = function(game) {
	game.cache.addNinePatch('dialogpatch', 'dialog', null, 8, 8, 16, 16);
    this.container = new Phaser.NinePatchImage(game, 96, 8, 'dialogpatch');
    this.container.targetWidth = 152;
    this.container.targetHeight = 64
    this.container.fixedToCamera = true;
    this.chatTxt = [];
    this.lineCount = 3;
    for (var i = 0; i < this.lineCount; i++) {
        var chatLine = game.make.bitmapText(8, 8 + (i * 16), 'basic', '', 16, this.container);
        chatLine.maxWidth = 128;
        this.container.addChild(chatLine);
        this.chatTxt.push(chatLine);
    }
    this.container.visible = false;
    this.clear();
    game.time.events.loop(25, this.update, this);
};

DialogComponent.prototype.update = function() {
	if (this.buffer.length > 0) {
		// If we have more text to show, and we have reached lineCount
	    if (this.currentLine >= this.lineCount) {
	        this.currentLine--;
		    for (var i = 0; i < (this.lineCount - 1); i++) {
			    this.chatTxt[i].setText(this.chatTxt[i+1].text);
			}
		    this.chatTxt[this.currentLine].setText('');
		}

        if (this.buffer[0].length > 0) {
	        var c = this.buffer[0].substr(0, 1);
	        this.buffer[0] = this.buffer[0].substr(1);
	        this.chatTxt[this.currentLine].setText(this.chatTxt[this.currentLine].text + c);
	    } else {
	        this.buffer.shift();
	        this.currentLine++;
	    }
    }
};

DialogComponent.prototype.setText = function(text) {
    do {
        // Private method I wish was Public
        var line = this.chatTxt[0].scanLine(this.chatTxt[0]._data.font, 1, text);
        this.buffer.push(line.text);
        text = text.substr(line.text.length + 1);
    } while (line.end === false);
};

DialogComponent.prototype.show = function() {
    this.container.visible = true;
};

DialogComponent.prototype.hide = function() {
    this.container.visible = false;
    this.clear();
};

DialogComponent.prototype.clear = function() {
    this.buffer = [];
    this.currentLine = 0;
    for (var i = 0; i < this.lineCount; i++) {
        this.chatTxt[i].setText('');
    }
};

module.exports = DialogComponent;