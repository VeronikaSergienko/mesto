import {openPopup, cardTemplate, popupPlaceImage, placeImage, placeTitle} from '../index.js';

class Card {

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

  export {Card};