class MapScreen {
    constructor ( DOM ) {
        this.DOM = null;

        this.init( DOM );
    }

    init( DOM ) {
        DOM.insertAdjacentHTML('beforeend', `
            <div class="map">
                MAP
            </div>
        `)
        this.DOM = document.querySelector('.map');
    }
}

export default MapScreen;