import Event from './Event';

class Spawn extends Event {
    constructor(game, settings) {
        super(game, settings);
        this.flagIsVisible = false;
    }

    update() {
        if (this.inCamera && !this.flagIsVisible) {
            this.flagIsVisible = true;
            this.onVisible();
        } else if (!this.inCamera && this.flagIsVisible) {
            this.flagIsVisible = false;
        }
    }

    onVisible() {
        this.game.spawnEnemy(this.settings.type, this.body.x + this.body.width / 2, this.body.y + this.body.height / 2);
    }
}

export default Spawn;
