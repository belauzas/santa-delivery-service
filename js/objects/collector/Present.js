class Present {
    constructor ( DOM, index, speed ) {
        this.parentDOM = DOM;
        this.DOM = null;
        this.index = index;
        this.speed = speed;
        this.left = -40;

        this.init();
    }

    init() {
        this.parentDOM.insertAdjacentHTML('beforeend', `
            <div class="present run" data-index="${this.index}"></div>
        `);
        this.DOM = this.parentDOM.querySelector(`.present[data-index="${this.index}"]`);
    }

    move( dt ) {
        this.left += this.speed * dt;
        this.DOM.style.left = this.left + 'px';
    }
}

export default Present;