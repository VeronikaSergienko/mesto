export class Section {
    constructor({items, renderer}, selectorConteiner) {
        this._items = items;
        this._renderer = renderer;
        this._selectorConteiner = selectorConteiner;
        this._conteiner = document.querySelector(this._selectorConteiner);
    }

    addItem(item) {
        this._conteiner.prepend(this._renderer(item));   
    };

    rendererAll() {
        this._items.forEach(item => {
            this.addItem(item);
        });
    }
}

// Создайте класс Section
// Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
// Первым параметром конструктора принимает объект с двумя свойствами: items и renderer. 
// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
//  Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
// Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
// У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.