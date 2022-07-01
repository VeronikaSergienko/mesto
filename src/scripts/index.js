import '../pages/index.css';
import {Card} from './classes/Card.js';
import {initialCards} from './arrayOfCards.js';
import {FormValidator} from './classes/FormValidator.js';
import { Section } from './classes/Section.js';
import { UserInfo } from './classes/UserInfo.js';
import { PopupWithForm } from './classes/PopupWithForm.js';
import { PopupWithImage } from './classes/PopupWithImage.js';

const profileEditingButton = document.querySelector('.profile__edit-button');
const popupPlaceImage = document.querySelector('.popup_type_place-image');
const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_place');
const nameInput = document.querySelector('#popupName');
const jobInput = document.querySelector('#popupTypeOfActivity');
const placeName = document.querySelector('#place-name');
const linkToThePicture = document.querySelector('#link-to-the-picture');
const cardCreationButton = document.querySelector('.profile__add-button');
const placeImage = popupPlaceImage.querySelector('img');
const placeTitle = popupPlaceImage.querySelector('.popup__place-title');
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
const cardsConteinerSelector = '.elements';

// создаём массив форм, перебором создаём экземпляры класса, валидируем
const formList = {};

Array.from(document.forms).forEach((formListElement) => {
  formList[formListElement.name] = new FormValidator(validationConfig, formListElement);
  formList[formListElement.name].enableValidation();
});

const user = new UserInfo({nameSelector:'.profile__name', jobSelector:'.profile__type-of-activity'});
console.log(user);


// создание объекта класса Section___________________________________________
const cardsConteiner = new Section({
  items: initialCards.reverse(),
  renderer: createCard,
}, cardsConteinerSelector);

cardsConteiner.rendererAll();

const handleCardSubmit = (item) => {
  cardsConteiner.addItem(item);
};

// ____________создание экземпляра попапа редактирования профиля
const popupProfile = new PopupWithForm('.popup_type_edit-profile', submitFormHandlerProfile);

// ____________создание экземпляра попапа добавления карточки
const popupNewPlace = new PopupWithForm('.popup_type_new-place', submitTheFormNewPlace);

// открытие формы редактирования профиля при клике на кнопку
profileEditingButton.addEventListener("click", function(evt) {
  formList[formProfile.name].resetValidation();
  openPopupProfile();
});

// функция открытия попапа редактирования профиля
function openPopupProfile() {
  popupProfile.open();
  const data = user.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  popupProfile.setEventListeners();
};

// Обработчик «отправки» формы редактирования профиля
function submitFormHandlerProfile (data) {
    user.setUserInfo(data);
};

// ____________создание экземпляра попапа с изображением
const popupImageCard = new PopupWithImage('.popup_type_place-image');

// открытие формы создания новой карточки
cardCreationButton.addEventListener("click", (evt) => {
  formPlace.reset();
  formList[formPlace.name].resetValidation();
  popupNewPlace.open();
  popupNewPlace.setEventListeners();
});

function handleCardClick(name, link) {
  placeImage.src = link;
  placeImage.alt = name;
  placeTitle.textContent = name;
  popupImageCard.open({name, link});
  popupImageCard.setEventListeners();
}

// функция создания экземпляра класса карточки 
function createCard(item) {
  const card = new Card(item, '#element', handleCardClick);
  const cardElement = card.generate();
  return cardElement;  
};

// обработчик отправки формы нового места
  function submitTheFormNewPlace (evt) {
    // evt.preventDefault();
    const item = {};
    item.name = placeName.value;
    item.link = linkToThePicture.value;
    console.log(item);
    handleCardSubmit(item);
    popupNewPlace.close();
  };