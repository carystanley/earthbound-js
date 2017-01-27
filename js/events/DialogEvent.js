import Event from './Event';

class DialogEvent extends Event {
    constructor(game, settings) {
        super(game, settings);
    }

    onTouch() {
        var properties = this.settings.properties;
        this.game.showDialog(properties.text);
    }
}

export default DialogEvent;
