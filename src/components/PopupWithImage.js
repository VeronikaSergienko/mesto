import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._imageElement = this._popup.querySelector('img');
        this._captionElement = this._popup.querySelector('.popup__place-title');
    };

     // публичный метод, отвечает за открытие попапа
    open = ({name, link}) => {
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        super.open();
    }

};