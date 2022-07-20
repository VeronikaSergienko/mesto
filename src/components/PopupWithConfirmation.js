import Popup from "./Popup.js";

export class PopupWithConfirmation extends Popup {
    constructor(selectorPopup, submitCallBack) {
        super(selectorPopup);
        this._submitCallBack = submitCallBack;
        this._form = this._popup.querySelector('.popup__form');
    }

    _handleSubmit = (evt) => {
        evt.preventDefault();
        this._submitCallBack(this._cardID, this._deleteCardElement);
    }

    // Перезаписывает родительский метод setEventListeners, добавляет обработчик сабмита формы.
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    };

    // перезаписывает родительский метод открытия, принимает id карты и метод для удаления со страницы
    open(cardId, deleteCardElement) {
        this._cardID = cardId;
        this._deleteCardElement = deleteCardElement;
        super.open();
    }
}