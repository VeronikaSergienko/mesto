let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddPlace = document.querySelector('.popup_type_new-place');
let popupPlaceImage = document.querySelector('.popup_type_place_image');
let formElement = document.querySelector('.popup__form');
let clouseButton = document.querySelector('.popup__clouse-button');
let profileName = document.querySelector('.profile__name');
let profileTypeOfActivity = document.querySelector('.profile__type-of-activity');
let nameInput = document.querySelector('#popupName');
let jobInput = document.querySelector('#popupTypeOfActivity');
const addButton = document.querySelector('.profile__add-button');

// функция открытия формы редактирования профиля
function openPopup() {
    popupEditProfile.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileTypeOfActivity.textContent;
};

// функция закрытия формы нажатием на "крестик"
function clousePopup() {
    popup.classList.remove('popup_opened');
};

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileTypeOfActivity.textContent = jobInput.value;
    clousePopup();
};

editButton.addEventListener("click", openPopup);

clouseButton.addEventListener("click", clousePopup);

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', formSubmitHandler);

const cardTemplate = document.querySelector('#card').content;
const elements = document.querySelector('.elements');

// создание карточки

initialCards.forEach((item) => {
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__text').textContent = item.name;
    const img = card.querySelector('.element__image');
    img.src = item.link;
    img.alt = `Фото ${item.name}.`;
    // переключатель для лайка
    card.querySelector('.element__like-button').addEventListener("click", function(evt) {
      evt.target.classList.toggle('element__like-button_active');
  });

      // удаление карточки
    card.querySelector('.element__delete-button').addEventListener("click", function(evt) {
      const place = evt.target.closest('.element');
      place.remove();
    });

    // слушатель картинки для открытия в отдельном окне
    img.addEventListener("click", function(evt) {
      console.log('кликнули на картинку');
    });

  // добавление карточки в начало
    elements.prepend(card);
  });


  // функция открытия попапа с изображением
  function openPopupPlaceImage() {};


  // открытие попапа создания карточки

  function openPopupNewPlace() {
    popupAddPlace.classList.add('popup_opened');
  };

  addButton.addEventListener('click', openPopupNewPlace);

  // обработчик отправки формы нового места
  // function submitTheFormNewPlace (evt)