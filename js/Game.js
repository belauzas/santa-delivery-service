"use strict";

class SantaDeliveryService {
    constructor ( target ) {
        this.GAME = null;
        this.dt = 0;
        this.lastTime = Date.now();
        this.DOM = document.querySelector(target);

        this.init();
    }

    init() {
        this.DOM.classList.add('game');
        this.spashScreen();

        // start / stop animations
        // window.requestAnimationFrame = window.requestAnimationFrame
        //     || window.mozRequestAnimationFrame
        //     || window.webkitRequestAnimationFrame
        //     || window.msRequestAnimationFrame;
        // window.cancelAnimationFrame = window.cancelAnimationFrame
        //     || window.mozCancelAnimationFrame;
        // this.GAME = window.requestAnimationFrame( () => this.gameLoop() );
    }

    spashScreen() {
        const tree = Math.ceil(Math.random() * 3);
        this.DOM.innerHTML = `
        <div class="spashScreen">
            <div class="title">
                <div class="line">
                    <span>Santa
                        <img src="./img/santa-hat.png" class="santa-hat">
                    </span>
                </div>
                <div class="line">
                    <span>delivery</span>
                </div>
                <div class="line">
                    <span>service</span>
                </div>
            </div>
            <div class="loading">
                <div class="bar"></div>
                <img src="./img/mini-tree/tree-${tree}-min.png" class="tree" />
            </div>
        </div>`;
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
