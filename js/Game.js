"use strict";
import SpashScreen from './objects/SpashScreen.js';
import MapScreen from './objects/MapScreen.js';

class SantaDeliveryService {
    constructor ( target ) {
        this.GAME = null;
        this.MAP_SCREEN = null;
        this.dt = 0;
        this.lastTime = Date.now();
        this.DOM = document.querySelector(target);

        this.init();
    }

    init() {
        this.DOM.classList.add('game');
        const spashScreen = new SpashScreen( this.DOM );
        this.MAP_SCREEN = new MapScreen( this.DOM );

        // start / stop animations
        window.requestAnimationFrame = window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.msRequestAnimationFrame;
        window.cancelAnimationFrame = window.cancelAnimationFrame
            || window.mozCancelAnimationFrame;
        
    }

    gameLoop() {
        const now = Date.now();
        this.dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.GAME = window.requestAnimationFrame( () => this.gameLoop() );
    }
}

const santa = new SantaDeliveryService('#game');
console.log(santa);
