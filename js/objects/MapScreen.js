import levels from '../data/levels.js';

class MapScreen {
    constructor ( DOM ) {
        this.DOM = null;
        this.DOMtop = null;
        this.DOMlevelContainer = null;
        this.DOMsanta = null;
        this.levels = null;
        this.userLevel = 1;
        this.userLevelGame = 1;
        this.santaCurrentCity = 0;
        this.santaMovingIntoCity = 0;
        this.santaMoving = false;

        this.init( DOM );
    }

    init( DOM ) {
        DOM.insertAdjacentHTML('afterbegin', `
            <div class="map">
                <div class="top">
                    <div class="fullscreen"></div>
                </div>
                <div class="levels">
                    <div class="container">
                        <img class="track" src="./img/map-track.png">
                        <div class="santa"></div>
                        <div class="level start"></div>
                    </div>
                </div>
                <div class="level-options">
                    <div class="background"></div>
                    <div class="popup">
                        <div class="title">Level&nbsp;<span>1</span></div>
                        <div class="close"></div>
                        <div class="list">
                            <div class="option" data-game="presents">
                                <img src="./img/present.png">
                            </div>
                            <div class="option" data-game="race">
                                <img src="./img/present.png">
                            </div>
                            <div class="option" data-game="deliver">
                                <img src="./img/present.png">
                            </div>
                        </div>
                        <div class="selected">
                            <div>Collect presents</div>
                            <div>Faster to the town</div>
                            <div>Deliver presents</div>
                        </div>
                        <div class="action">
                            <div class="play">Play</div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        this.DOM = document.querySelector('.map');
        this.DOMtop = this.DOM.querySelector('.top');
        this.DOMfullscreen = this.DOMtop.querySelector('.fullscreen');
        this.DOMlevelContainer = this.DOM.querySelector('.levels > .container');
        this.DOMlevelOptions = this.DOM.querySelector('.level-options');
        this.DOMcloseLevelOptions = this.DOMlevelOptions.querySelector('.close');
        this.DOMpopupTitle = this.DOMlevelOptions.querySelector('.title > span');
        this.DOMsanta = this.DOMlevelContainer.querySelector('.santa');
        this.renderLevelMap();

        this.DOMfullscreen.addEventListener('click', () => {
            if ( this.DOMfullscreen.classList.contains('full') ) {
                this.DOMfullscreen.classList.remove('full');
                document.exitFullscreen();
            } else {
                this.DOMfullscreen.classList.add('full');
                document.documentElement.requestFullscreen();
            }
        })

        this.DOMlevels = this.DOMlevelContainer.querySelectorAll('.level.city');
        for ( let i=0; i<this.DOMlevels.length; i++ ) {
            const level = this.DOMlevels[i];
            level.addEventListener('click', () => {
                this.santaMovingIntoCity = 10 - i;
                this.moveSantaToCity();
            })
        }

        this.DOMcloseLevelOptions.addEventListener('click', () => {
            this.DOMlevelOptions.classList.remove('show');
        })

        this.DOMsanta.addEventListener('click', () => {
            if ( !this.santaMoving && this.santaCurrentCity !== 0 ) {
                this.DOMlevelOptions.classList.add('show');
            }
        })
    }

    moveSantaToCity() {
        if ( !this.santaMoving ) {
            if ( this.santaMovingIntoCity > this.userLevel ) {
                this.santaMovingIntoCity = this.userLevel;
            }
            if ( this.santaMovingIntoCity === this.santaCurrentCity ) {
                return;
            }
            // console.log(this.santaMovingIntoCity, this.userLevel, this.santaCurrentCity);
            if ( this.santaCurrentCity < this.santaMovingIntoCity ) {
                this.santaCurrentCity += 1;
            } else if ( this.santaCurrentCity > this.santaMovingIntoCity ) {
                this.santaCurrentCity -= 1;
            }
            const city = levels.filter( c => c.level === this.santaCurrentCity )[0];

            this.santaMoving = !this.santaMoving;
            this.DOMsanta.classList.add('moving');
            this.DOMsanta.style.top = city.top + '%';
            this.DOMsanta.style.left = city.left + '%';
            
            setTimeout(() => {
                this.santaMoving = !this.santaMoving;
                this.DOMsanta.classList.remove('moving');
                if ( this.santaMovingIntoCity !== this.santaCurrentCity ) {
                    this.moveSantaToCity();
                } else {
                    this.selectLevelGamePopup();
                }
            }, 1000)
        }
    }

    renderLevelMap() {
        let HTML = '';
        for ( let i=0; i<levels.length; i++ ) {
            const level = levels[i];
            HTML += `<div class="level city"
                        style="top: ${level.top}%;
                                left: ${level.left}%;">
                        <div class="city-name">${level.cityName}</div>
                    </div>`;
        }
        this.DOMlevelContainer.insertAdjacentHTML('beforeend', HTML);
    }

    selectLevelGamePopup() {
        this.DOMpopupTitle.textContent = this.santaCurrentCity;
        this.DOMlevelOptions.classList.add('show');
    }
}

export default MapScreen;