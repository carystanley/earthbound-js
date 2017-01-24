/* global Phaser */

function MenuComponent (game, options) {
    game.cache.addNinePatch('ninepatch_dialog', 'image_dialog', null, 8, 8, 16, 16);
    this.container = new Phaser.NinePatchImage(game, options.x, options.y, 'ninepatch_dialog');
    this.container.targetWidth = options.width;
    this.container.targetHeight = options.height
    this.container.fixedToCamera = true;

    this.menuItems = [];
    this.menuItemCount = options.rows;
    this.options = [];
    this.selection = 0;
    for (var i = 0; i < this.menuItemCount; i++) {
        var menuItem = game.make.bitmapText(8, 8 + (i * 16), 'font_basic', '', 16, this.container);
        menuItem.maxWidth = options.width - 24;
        this.container.addChild(menuItem);
        this.menuItems.push(menuItem);
    }
    this.container.visible = false;
    this.setOptions();
};

MenuComponent.prototype.setOptions = function(options) {
    this.options = options || [];
    this.selection = 0;
    this.reset();
};

MenuComponent.prototype.reset = function() {
    var options = this.options;
    for (var i = 0; i < this.menuItemCount; i++) {
        var option = options[i];
        this.menuItems[i].setText((this.selection === i ? '@ ' : '') + ((option && option.text) || ''));
    }
};

MenuComponent.prototype.selectionUp = function() {
    this.selection--;
    if (this.selection < 0) {
        this.selection = 0;
    }
    this.reset();
};

MenuComponent.prototype.selectionDown = function() {
    this.selection++;
    if (this.selection >= this.menuItemCount) {
        this.selection = this.menuItemCount - 1;
    }
    this.reset();
};

MenuComponent.prototype.getSelectedId = function() {
    return this.options &&
        this.options[this.selection] &&
        this.options[this.selection].id;
};

MenuComponent.prototype.show = function() {
    this.container.visible = true;
};

MenuComponent.prototype.hide = function() {
    this.container.visible = false;
};

module.exports = MenuComponent;
