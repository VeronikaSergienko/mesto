class Card {
    constructor(item, cardSelector, handleCardClick) {
      this._name = item.name,
      this._link = item.link,
      this._cardSelector = cardSelector,
      this._handleCardClick = handleCardClick;
    }
  
    _getElement() {
      const card = document.querySelector('#card').content.querySelector(this._cardSelector).cloneNode(true);
      return card;
    }
  
    _toggleLike() {
      this._likeButton.classList.toggle('element__like-button_active');
    }
  
    _deleteButton() {
      this._element.remove();
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener("click", () => {
        this._toggleLike();
      }); 
      this._buttonDelete.addEventListener("click", () => {
        this._deleteButton();
      });
      this._image.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
    }

    generate() {
      this._element = this._getElement();
      this._element.querySelector(".element__text").textContent = this._name;
      this._image = this._element.querySelector('.element__image');
      this._image.src = this._link;
      this._image.alt = this._name;
      this._buttonDelete = this._element.querySelector('.element__delete-button');
      this._likeButton = this._element.querySelector('.element__like-button');
      this._setEventListeners();
      return this._element;
    }
    
  }

  export {Card};