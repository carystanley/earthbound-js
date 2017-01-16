var MenuSubState = require('./Menu');

var WorldGoodsMenuSubState = function(state) {
    MenuSubState.call(this, state);
}

WorldGoodsMenuSubState.prototype = Object.create(MenuSubState.prototype);
WorldGoodsMenuSubState.prototype.constructor = WorldGoodsMenuSubState;

WorldGoodsMenuSubState.prototype.menuId = 'worldgoods';

WorldGoodsMenuSubState.prototype.getOptions = function() {
    return [
        {id: 'sneaker', text:'Old Sneaker'},
        {id: 'stungun', text:'Stun Gun'},
        {id: 'sock', text:'Sock'}
    ];
};

WorldGoodsMenuSubState.prototype.onCancel = function() {
    this.menu.hide();
    this.parent.switchSubState('worldmenu');
};

WorldGoodsMenuSubState.prototype.onSelect = function(id) {

};

module.exports = WorldGoodsMenuSubState;
