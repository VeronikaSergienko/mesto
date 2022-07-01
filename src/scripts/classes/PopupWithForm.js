import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    // Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    constructor (selectorPopup, submitCallBack) {
        super(selectorPopup);
        this._submitCallBack = submitCallBack;
        // this._popup = document.querySelector(this._selectorPopup);
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

    open() {
        if(this._getterCallBack) {
            this._setInputValues(this._getterCallBack());
        } else {
            this._form.reset();
        }
        super.open();
    }

    close() {
        super.close();
        // this._submitHandler.reset();
    };

};

// Создайте класс PopupWithForm
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
// Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. 
// Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm.