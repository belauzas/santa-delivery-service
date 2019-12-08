import levels from '../data/levels.js';

class MapScreen {
    constructor ( DOM ) {
        this.DOM = null;
        this.DOMtop = null;
        this.DOMlevelContainer = null;
        this.DOMsanta = null;
        this.levels = null;
        this.userLevel = 1;
        this.santaCurrentCity = 0;
        this.santaMoving = false;

        this.init( DOM );
    }

    init( DOM ) {

        DOM.insertAdjacentHTML('afterbegin', `
            <div class="map">
                <div class="top"></div>
                <div class="levels">
                    <div class="container">
                        <img class="track" src="./img/map-track.png">
                        <div class="santa"></div>
                        <div class="level start"></div>
                    </div>
                </div>
            </div>
        `)
        this.DOM = document.querySelector('.map');
        this.DOMtop = this.DOM.querySelector('.top');
        this.DOMlevelContainer = this.DOM.querySelector('.levels > .container');
        this.DOMsanta = this.DOMlevelContainer.querySelector('.santa');
        this.renderLevelMap();

        this.DOMlevels = this.DOMlevelContainer.querySelectorAll('.level.city');
        for ( let i=0; i<this.DOMlevels.length; i++ ) {
            const level = this.DOMlevels[i];
            level.addEventListener('click', () => {
                this.moveSantaToCity(10-i);
            })
        }

    }

    moveSantaToCity( cityIndex ) {
        if ( !this.santaMoving ) {
            this.santaMoving = !this.santaMoving;
            const city = levels.filter( c => c.level === cityIndex )[0];
            this.DOMsanta.style.top = city.top + '%';
            this.DOMsanta.style.left = city.left + '%';
            
            setTimeout(() => {
                this.santaMoving = !this.santaMoving;
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
}

export default MapScreen;