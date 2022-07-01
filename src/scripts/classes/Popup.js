export default class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._popup = document.querySelector(this._selectorPopup);
        // this._classOpenPopup = this._popup.querySelector('popup_opened');
        // this._closeButtonSelector = this._popup.querySelector('.popup__clouse-button');
    }

    // публичный метод, отвечает за открытие попапа
    open() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popup.classList.add('popup_opened');

    // публичный метод, отвечает за закрытие попапа
    };
    close() {
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.classList.remove('popup_opened');
    };

    // закрытие попапа при клике на esc
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            console.log('меня закрыли эскейпом');
            this.close();
        };
    };

    setEventListeners() {        
        this._closeButton = this._popup.querySelector('.popup__clouse-button');
        this._popup.addEventListener('keydown', this._handleEscClose);
        this._closeButton.addEventListener('click', () => {
            this.close()
        });

        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
    };
};

// Создайте класс Popup
// Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
// Принимает в конструктор единственный параметр — селектор попапа.
// Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
// Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
// Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа. 
// Модальное окно также закрывается при клике на затемнённую область вокруг формы.