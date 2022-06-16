import {Card} from './classes/Card.js';
import {initialCards} from './arrayOfCards.js';
import {FormValidator} from './classes/FormValidator.js';

const profileEditingButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_new-place');
const popupPlaceImage = document.querySelector('.popup_type_place-image');
const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_place');
const profileName = document.querySelector('.profile__name');
const profileTypeOfActivity = document.querySelector('.profile__type-of-activity');
const nameInput = document.querySelector('#popupName');
const jobInput = document.querySelector('#popupTypeOfActivity');
const placeName = document.querySelector('#place-name');
const linkToThePicture = document.querySelector('#link-to-the-picture');
const cardCreationButton = document.querySelector('.profile__add-button');
const listOfCards = document.querySelector('.elements');
const placeImage = popupPlaceImage.querySelector('img');
const placeTitle = popupPlaceImage.querySelector('.popup__place-title');
const cardTemplate = document.querySelector('#card').content;
const allPopups = document.querySelectorAll('.popup');
const classOpenPopup = 'popup_opened';
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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

// создаём массив форм, перебором создаём экземпляры класса, валидируем
const formList = {};

Array.from(document.forms).forEach((formListElement) => {
  formList[formListElement.name] = new FormValidator(validationConfig, formListElement);
  formList[formListElement.name].enableValidation();
});

// закрытия попапов
popupEditProfile.querySelector('.popup__clouse-button').addEventListener("click", (evt) => {
    closePopup(popupEditProfile);
  });

popupPlaceImage.querySelector('.popup__clouse-button').addEventListener('click', (evt) => {
  closePopup(popupPlaceImage);
});

popupAddPlace.querySelector('.popup__clouse-button').addEventListener('click', (evt) => {
  closePopup(popupAddPlace);
});

// функция открытия попапа редактирования профиля
function openPopupProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileTypeOfActivity.textContent;
};

// открытие формы редактирования профиля при клике на кнопку
profileEditingButton.addEventListener("click", function(evt) {
  openPopupProfile();
});

// Обработчик «отправки» формы редактирования профиля
function submitFormHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileTypeOfActivity.textContent = jobInput.value;
    closePopup(popupEditProfile);
};

// Прикрепляем обработчик отправки к форме редактирования профиля
formProfile.addEventListener('submit', submitFormHandlerProfile);

// открытие формы создания новой карточки
cardCreationButton.addEventListener("click", (evt) => {
      openPopup(popupAddPlace);
    });

// функция, которая делает кнопку неактивной
const inactiveButton = (button) => {
  button.classList.add('popup__save-button_disabled');
  button.disabled = true;
};

// создание новой карточки
const makeCard = (item) => {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__text').textContent = item.name;
  const image = card.querySelector('.element__image');
  image.src = item.link;
  image.alt = item.name;
  card.querySelector('.element__like-button').addEventListener("click", (evt) => {
    evt.target.classList.toggle('element__like-button_active');
  });
  card.querySelector('.element__delete-button').addEventListener("click", (evt) => {
    const place = evt.target.closest('.element');
    place.remove();
  });
  image.addEventListener("click", (evt) => {
    const clickImage = evt.target;
    placeImage.src = clickImage.src;
    placeImage.alt = clickImage.alt;
    placeTitle.textContent = clickImage.alt;
    openPopup(popupPlaceImage);
  });
  return card;
};

// добавление карточки
function addCard(item) {
  const newCard = makeCard(item);
  listOfCards.prepend(newCard);
};

// обработчик отправки формы нового места
  function submitTheFormNewPlace (evt) {
    evt.preventDefault();
    const item = {};
    item.name = placeName.value;
    item.link = linkToThePicture.value;
    console.log(item);
    addCard(item);
    evt.target.reset();
    const buttonElement = popupAddPlace.querySelector('.popup__save-button');
    inactiveButton(buttonElement);
    closePopup(popupAddPlace);
  };

//   прикрепляем к форме обработчик
formPlace.addEventListener('submit', submitTheFormNewPlace);

// функция закрытия попапа кликом на overlay.
// перебирает массив попапов, вешает слушатели. Если при клике у попапа есть класс 'открытый папап', то закрывает попап.
allPopups.forEach((popup) => { 
  document.addEventListener('click', (evt) => { 
    if (evt.target.classList.contains(classOpenPopup)) {
        closePopup(popup);
    };
  });
});

// функция добавления карточки при клике на enter
function addPlaceWhenClickingOnEnter(evt) {
  if (evt.key === 'Enter') {
  submitTheFormNewPlace;
};
};

formPlace.addEventListener('keydown', addPlaceWhenClickingOnEnter);

// создание экземпляров карточек, перебором массива
initialCards.forEach((item) => {
  const Card1 = new Card(item);
  const card = Card1.generate();
  listOfCards.prepend(card);
});

export {openPopup, cardTemplate, popupPlaceImage, placeImage, placeTitle};