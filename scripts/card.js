let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddPlace = document.querySelector('.popup_type_new-place');
let formElement = document.querySelector('.popup__form');
let clouseButton = document.querySelector('.popup__clouse-button');
let profileName = document.querySelector('.profile__name');
let profileTypeOfActivity = document.querySelector('.profile__type-of-activity');
let nameInput = document.querySelector('#popupName');
let jobInput = document.querySelector('#popupTypeOfActivity');

// функция открытия формы редактирования профиля
function openPopup() {
    popup.classList.add('popup_opened');
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

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

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

  // добавление карточки в начало
    elements.prepend(card);
  });


  // открытие попапа создания карточки
  const addButton = document.querySelector('.profile__add-button');
  const popupNewPlace = document.querySelector('.popup_new-place');

  function openPopupNewPlace() {
    popup.classList.add('popup_opened');
  };

  addButton.addEventListener('click', openPopupNewPlace);
