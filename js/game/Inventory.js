
var Inventory = function (maxSize) {
    this.items = [];
    this.maxSize = maxSize;
};

Inventory.prototype.add = function(itemId) {
    if (this.items.length < this.maxSize) {
        this.items.push(itemId);
    }
}

Inventory.prototype.remove = function(itemPos) {
    this.items.splice(itemPos, 1);
}

Inventory.prototype.getList = function() {
    return this.items;
}

Inventory.prototype.contains = function(itemId) {
    this.items.indexOf(itemId);
}

Inventory.prototype.isFull = function() {
    return (this.items.length >= this.maxSize);
}

module.exports = Inventory;
