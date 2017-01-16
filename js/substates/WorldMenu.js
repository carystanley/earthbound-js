var MenuSubState = require('./Menu');

var WorldMenuSubState = function(state) {
    MenuSubState.call(this, state);
}

WorldMenuSubState.prototype = Object.create(MenuSubState.prototype);
WorldMenuSubState.prototype.constructor = WorldMenuSubState;

WorldMenuSubState.prototype.menuId = 'world';

WorldMenuSubState.prototype.getOptions = function() {
    return [
        {id: 'goods', text:'Goods'},
        {id: 'equip', text:'Equip'},
        {id: 'status', text:'Status'}
    ];
};

WorldMenuSubState.prototype.onCancel = function() {
    this.menu.hide();
    this.parent.switchSubState('world');
};

WorldMenuSubState.prototype.onSelect = function(id) {
    switch (id) {
        case 'goods': this.parent.switchSubState('worldgoodsmenu'); break;
    }
};

module.exports = WorldMenuSubState;
