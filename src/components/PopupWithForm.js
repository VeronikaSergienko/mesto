import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    // Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    constructor (selectorPopup, submitCallBack) {
        super(selectorPopup);
        this._submitCallBack = submitCallBack;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitButton = this._form.querySelector('.popup__save-button');
    }

    // приватный метод _getInputValues, который собирает данные всех полей формы.
    _getInputValues() {
        const values = {};
        this._inputList.forEach((inputElement) => {
            values[inputElement.name.slice(6)] = inputElement.value;
        })

        return values;
    };

    _setInputValues(values) {
        this._inputList.forEach((inputElement) => {
            inputElement.value = values[inputElement.name.slice(6)];
        })
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._submitCallBack(this._getInputValues());
        this.close();
    }

    // Перезаписывает родительский метод setEventListeners, добавляет обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    };

    close() {
        super.close();
        this._form.reset();
    };

};