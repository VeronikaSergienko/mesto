const cardTemplate = document.querySelector('#card').content;
const popupPlaceImage = document.querySelector('.popup_type_place-image');
const placeImage = popupPlaceImage.querySelector('img');
const placeTitle = popupPlaceImage.querySelector('.popup__place-title');
const classOpenPopup = 'popup_opened';

// функция для закрытия попапа при  клике на esc
function closeWhenClickingOnEsc(evt) {
  if (evt.key === 'Escape') {
    const classOpenPopup = document.querySelector('.popup_opened');
    closePopup(classOpenPopup);
};
};

// универсальные функции открытия и закрытия профиля
function openPopup(popup) {
  popup.classList.add(classOpenPopup);
  document.addEventListener('keydown', closeWhenClickingOnEsc);
};

function closePopup(popup) {
  popup.classList.remove(classOpenPopup);
  document.removeEventListener('keydown', closeWhenClickingOnEsc);
};


export class Card {

    _element = '#element';
  
    constructor(item) {
      this._name = item.name,
      this._link = item.link
    }
  
    _getElement() {
      const card = cardTemplate.querySelector(this._element).cloneNode(true);
      return card;
    }
  
    _toggleLike() {
      this._likeButton.addEventListener("click", (evt) => {
        evt.target.classList.toggle('element__like-button_active');
      });    
    }
  
    _deleteButton() {
      this._buttonDelete.addEventListener("click", (evt) => {
        const place = evt.target.closest('.element');
        place.remove();
      });
    }
  
    _openCardImage() {
      this._image.addEventListener("click", (evt) => {
        const clickImage = evt.target;
        placeImage.src = clickImage.src;
        placeImage.alt = clickImage.alt;
        placeTitle.textContent = clickImage.alt;
        openPopup(popupPlaceImage);
      });
    }
  
    generate() {
      this._element = this._getElement();
      this._element.querySelector(".element__text").textContent = this._name;
      this._image = this._element.querySelector('.element__image');
      this._image.src = this._link;
      this._image.alt = this._name;
      this._openCardImage();
      this._buttonDelete = this._element.querySelector('.element__delete-button');
      this._deleteButton();
      this._likeButton = this._element.querySelector('.element__like-button');
      this._toggleLike();
      return this._element;
    }
    
  }