import levels from '../../data/presents/levels.js';
import Present from './Present.js';

class PresentCollector {
    constructor ( level ) {
        this.GAME = null;
        this.DOM = game.querySelector('.game-content');
        this.DOMfloors = null;
        this.DOMtimer = null;
        this.DOMscore = null;
        this.DOMcounter = null;
        this.level = level - 1;
        this.timeLimit = levels[this.level].timeLimit;
        this.timeLeft = this.timeLimit;
        this.lastTime = Date.now();
        this.dt = 0;
        this.collectionSize = levels[this.level].collectionSize;
        this.floors = levels[this.level].floors;
        this.presents = [];
        this.presentCounter = 1;

        this.init();
    }

    init() {
        console.log(`GAME: presents is starting... (level: ${this.level+1})`);
        console.log('Game data:');
        console.log(levels[this.level]);

        for (  let i=0; i<this.floors.length; i++ ) {
            this.floors[i].time.current = Math.random() * this.floors[i].time.max;
        }

        this.render();
        this.DOM.classList.add('show');
    }

    render() {
        let HTML = '';
        for ( let i=0; i<this.floors.length; i++ ) {
            const floor = this.floors[i];
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
                        <div class="presents"></div>
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
                    <div class="value from">0</div>
                    <div class="value">/${this.collectionSize}</div>
                </div>
                <div class="timer">00:00</div>
            </div>
            <div class="floors floors-${this.floors.length} stop">
                ${HTML}
            </div>
            <div class="counter">
                <div class="number">3</div>
                <div class="number">2</div>
                <div class="number">1</div>
            </div>`;
        
        this.DOMfloors = this.DOM.querySelector('.floors');
        this.DOMtimer = this.DOM.querySelector('.timer');
        this.DOMscore = this.DOM.querySelector('.score > .value.from');
        this.DOMcounter = this.DOM.querySelector('.counter');

        for (  let i=0; i<this.floors.length; i++ ) {
            this.floors[i].DOM = this.DOMfloors.querySelector(`.floor:nth-of-type(${i+1}) > .middle > .presents`);
        }

        this.DOMscore.textContent = 0;
        this.timer();

        // start game after 3 seconds
        setTimeout(() => {
            // enable CSS animations
            this.DOMfloors.classList.remove('stop');

            // compensate 3 seconds for game start delay
            this.timeLeft += 3;
            
            this.DOM.removeChild(this.DOMcounter);
            
            this.gameLoop();
        }, 3000);
    }
    
    gameLoop() {
        const now = Date.now();
        this.dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.timer();
        this.presentSpawn();
        this.movePresents();
        
        if ( this.timeLeft > 0 ) {
            this.GAME = window.requestAnimationFrame(() => {
                this.gameLoop();
            });
        } else {
            window.cancelAnimationFrame(this.GAME);
            this.DOMfloors.classList.add('stop');
        }
    }

    timer() {
        this.timeLeft -= this.dt;
        let s = Math.ceil( this.timeLeft );
        
        let secs = s % 60;
        s = (s - secs) / 60;
        let mins = s % 60;
      
        let time = `${mins < 10 ? '0'+mins : mins}:${secs < 10 ? '0'+secs : secs}`;

        this.DOMtimer.textContent = time;
    }

    presentSpawn() {
        for (  let i=0; i<this.floors.length; i++ ) {
            const present = this.floors[i];
            const time = present.time;
            time.current -= this.dt;
            if ( time.current < 0 ) {
                time.current = time.min + Math.random() * (time.max - time.min);
                this.presentCounter++;
                this.presents.push( new Present( present.DOM, this.presentCounter, present.speed ) )
            }
        }
    }

    movePresents() {
        for ( let i=0; i<this.presents.length; i++ ) {
            this.presents[i].move( this.dt );
        }
    }
}

export default PresentCollector;