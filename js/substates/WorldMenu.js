
function WorldMenuSubState (gameState) {
    this.gameState = gameState;
}

WorldMenuSubState.prototype.getMenu = function (id) {
    return this.gameState.ui[id];
}

WorldMenuSubState.prototype.getFocusMenu = function (id) {
    return this.getMenu(this.focusMenuId);
}

WorldMenuSubState.prototype.focusMenu = function (id) {
    this.focusMenuId = id;
    var menu = this.getMenu(id);
    menu.setOptions(this.getOptions(id));
    menu.show();
    this.setCoolOff();
}


WorldMenuSubState.prototype.enter = function() {
    this.focusMenu('worldmenu');
};

WorldMenuSubState.prototype.getOptions = function(menuId) {
    switch (menuId) {
        case 'worldmenu':
            return [
                {id: 'goods', text: 'Goods'},
                {id: 'equip', text: 'Equip'},
                {id: 'status', text: 'Status'}
            ];

        case 'worldgoodsmenu':
            return [
                {id: 'sneaker', text: 'Old Sneaker'},
                {id: 'stungun', text: 'Stun Gun'},
                {id: 'sock', text: 'Sock'}
            ];
    }
};

WorldMenuSubState.prototype.onCancel = function(menuId) {
    switch (menuId) {
        case 'worldmenu':
            this.getMenu('worldmenu').hide();
            this.gameState.switchSubState('world');
            break;

        case 'worldgoodsmenu':
            this.getMenu('worldgoodsmenu').hide();
            this.focusMenu('worldmenu');
    }
};

WorldMenuSubState.prototype.onSelect = function(menuId, id) {
    switch (menuId) {
        case 'worldmenu':
            switch (id) {
                case 'goods': this.focusMenu('worldgoodsmenu'); break;
            }
            break;

        case 'worldgoodsmenu':
    }
};

WorldMenuSubState.prototype.update = function() {
    var state = this.gameState;

    if (this.coolOff <= 0) {
        if (state.cancelKey.isDown) {
            this.onCancel && this.onCancel(this.focusMenuId);
        } else if (state.actionKey.isDown) {
            this.onSelect && this.onSelect(this.focusMenuId, this.getFocusMenu().getSelectedId());
        } else if (state.cursors.up.isDown) {
            this.getFocusMenu().selectionUp()
            this.setCoolOff();
        } else if (state.cursors.down.isDown) {
            this.getFocusMenu().selectionDown()
            this.setCoolOff();
        }
    } else {
        this.coolOff--;
    }
};

WorldMenuSubState.prototype.setCoolOff = function() {
    this.coolOff = 10;
};

module.exports = WorldMenuSubState;
