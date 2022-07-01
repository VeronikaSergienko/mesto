export class Section {
    constructor({items, renderer}, selectorConteiner) {
        this._items = items;
        this._renderer = renderer;
        this._selectorConteiner = selectorConteiner;
        this._conteiner = document.querySelector(this._selectorConteiner);
    };

    addItem(item) {
        this._conteiner.prepend(this._renderer(item));   
    };

    rendererAll() {
        this._items.forEach(item => {
            this.addItem(item);
        });
    };
};