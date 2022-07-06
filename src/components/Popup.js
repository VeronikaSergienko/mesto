export default class Popup {
    constructor(selectorPopup) {
        this._selectorPopup = selectorPopup;
        this._popup = document.querySelector(this._selectorPopup);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // публичный метод, отвечает за открытие попапа
    open() {
        document.addEventListener('keydown', this._handleEscClose);
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
            this.close();
        };
    };

    setEventListeners() {        
        this._closeButton = this._popup.querySelector('.popup__clouse-button');
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