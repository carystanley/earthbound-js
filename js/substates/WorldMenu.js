var MenuSubState = require('./Menu');

var WorldMenuSubState = function(state) {
    MenuSubState.call(this, state);
}

WorldMenuSubState.prototype = Object.create(MenuSubState.prototype);
WorldMenuSubState.prototype.constructor = WorldMenuSubState;

WorldMenuSubState.prototype.menuId = 'menuDialog';

WorldMenuSubState.prototype.getOptions = function() {
    return [
        {action: 'goods', text:'Goods'},
        {action: 'equip', text:'Equip'},
        {action: 'status', text:'Status'}
    ];
};

WorldMenuSubState.prototype.onCancel = function() {
    this.menu.hide();
    this.parent.switchSubState('world');
};

module.exports = WorldMenuSubState;
