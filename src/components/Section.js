export class Section {
    constructor({ renderer }, selectorConteiner) {
        this._renderer = renderer;
        this._selectorConteiner = selectorConteiner;
        this._conteiner = document.querySelector(this._selectorConteiner);
    };

    addItem(item) {
        this._conteiner.prepend(this._renderer(item));   
    };

    rendererAll(items) {
        items.forEach(item => {
            this.addItem(item);
        });
    };
};