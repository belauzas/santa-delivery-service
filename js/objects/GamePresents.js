import levels from '../data/presents/levels.js';

class PresentCollector {
    constructor ( level ) {
        this.DOM = game.querySelector('.game-content');
        this.level = level - 1;
        this.timeLimit = levels[this.level].timeLimit;
        this.collectionSize = levels[this.level].collectionSize;
        this.floors = levels[this.level].floors;

        this.init();
    }

    init() {
        console.log(`GAME: presents is starting... (level: ${this.level+1})`);
        console.log('Game data:');
        console.log(levels[this.level]);

        this.render();
        this.DOM.classList.add('show');
    }

    render() {
        let HTML = '';
        for ( let i=0; i<this.floors.length; i++ ) {
            const floor = this.floors[i];
            console.log(floor);
            HTML += `
                <div class="floor">
                    <div class="top">
                        <div class="lamp">
                            <div class="bulb"></div>
                        </div>
                        <div class="lamp">
                            <div class="bulb"></div>
                        </div>
                    </div>
                    <div class="middle">
                        <div class="line top"></div>
                        <div class="line bottom"></div>
                        <div class="leg left">
                            <div class="circle"></div>
                        </div>
                        <div class="leg right">
                            <div class="circle"></div>
                        </div>
                    </div>
                    <div class="bottom">
                    </div>
                </div>`;
        }
        this.DOM.innerHTML = `
            <div class="header">
                <div class="score">
                    <img src="./img/game-collector/present.png">
                    <div class="value">0</div>
                </div>
                <div class="timer">00:00</div>
            </div>
            <div class="floors floors-${this.floors.length}">
                ${HTML}
            </div>`;
    }
}

export default PresentCollector;