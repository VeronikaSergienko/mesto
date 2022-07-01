import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        console.log(this._popup);
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

// Создайте класс PopupWithImage
// Создайте класс PopupWithImage, который наследует от Popup. 
// Этот класс должен перезаписывать родительский метод open. 
// В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.