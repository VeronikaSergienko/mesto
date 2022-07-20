class Card {
    constructor({ name, link, _id, likes, owner: { _id: ownerId } }, userId, cardTemplateSelector, handleCardClick, handleCardDelete, addOrRemoveLike) {
      this._name = name,
      this._link = link,
      this._likes = likes;
      this._id = _id;
      this._userId = userId;
      this._isOwner = userId === ownerId;
      this._cardTemplateSelector = cardTemplateSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._handleCardLike = addOrRemoveLike;
      this.getIdCard = this.getIdCard.bind(this);
      this.setLikes = this.setLikes.bind(this);
      this.generate = this.generate.bind(this);
      this.deleteCardElement = this.deleteCardElement.bind(this);
    }

    getIdCard() {
      return this._id;
    }
  
    _getElement() {
      const card = document.querySelector(this._cardTemplateSelector).content.querySelector('#element').cloneNode(true);
      return card;
    }
  
    _handleLikeClick() {
      this._handleCardLike(this._id, this._isLiked(), this.setLikes);
    }
  
    deleteCardElement() {
      this._element.remove('element');
    }

    // из массива карточек делаем массив id карточек и проверяем, есть ли среди них id user
    _isLiked() {
      return this._likes.map((item) => item._id).includes(this._userId);
    }

    _renderLikes() {
      if (this._isLiked()) {
        this._likeButton.classList.add('element__like-button_active');
      } else {
        this._likeButton.classList.remove('element__like-button_active');
      }
      this._cardlikes.textContent = this._likes.length;
    }

    setLikes(newLikes) {
      this._likes = newLikes;
      this._renderLikes();
    }

    _handleDeleteClick() {
      this._handleCardDelete(this._id, this.deleteCardElement);
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeClick();
      }); 
      // если владелец карты, то вешаем слушатель на кнопку удаления(открытие попапа с согласием) иначе удаляем кнопку
      if (this._isOwner) {
        this._buttonDelete.addEventListener("click", () => {
          this._handleDeleteClick();
        });
      } else {
        this._buttonDelete.remove();
      }
    //  при клике на картинку открываем попап с изображением
      this._image.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
    }

    generate() {
      this._element = this._getElement();
      this._element.querySelector(".element__text").textContent = this._name;
      this._image = this._element.querySelector('.element__image');
      this._cardlikes = this._element.querySelector('.element__likes');   
      this._image.src = this._link;
      this._image.alt = this._name;
      this._buttonDelete = this._element.querySelector('.element__delete-button');
      this._likeButton = this._element.querySelector('.element__like-button');
      this._renderLikes();
      this._setEventListeners();
      return this._element;
    }
    
  }

  export {Card};