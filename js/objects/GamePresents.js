import levels from '../data/presents/levels.js';

class PresentCollector {
    constructor ( level ) {
        this.DOM = null;
        this.level = level - 1;

        this.init();
    }

    init() {
        console.log(`GAME: presents is starting... (level: ${this.level+1})`);
        console.log(game);
        console.log('Game data:');
        console.log(levels[this.level]);
    }
}

export default PresentCollector;