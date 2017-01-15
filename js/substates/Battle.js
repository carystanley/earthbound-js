
var isBlack = false;

var BattleSubState = {
    enter: function() {
		    this.playerDisabled = true;
        isBlack = false;
      	this.fadeOut(function() {
      	  	isBlack = true;
        });
	  },
    update: function() {
        var self = this;
        if (isBlack && this.spaceKey.isDown) {
            self.fadeIn(function() {
                self.switchSubState(self.SubState.World);
            });
  		  }
    },
    exit: function() {
    }
};

module.exports = BattleSubState;
