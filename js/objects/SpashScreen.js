class SpashScreen {
    constructor ( DOM ) {
        this.DOM = null;

        this.init( DOM );
    }

    init( DOM ) {
        const tree = Math.ceil(Math.random() * 3);
        DOM.innerHTML = `
        <div class="spashScreen">
            <div class="title">
                <div class="line">
                    <span>Santa's
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
        this.DOM = DOM.querySelector('.spashScreen');

        setTimeout(() => {
            this.remove();
        }, 1500)
    }

    remove() {
        this.DOM.parentNode.removeChild(this.DOM);
    }
}

export default SpashScreen;