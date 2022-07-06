import './index.css';
import {Card} from '../components/Card.js';
import {initialCards} from '../components/utils/arrayOfCards.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import {profileEditingButton, 
  formProfile, 
  formPlace, 
  nameInput, 
  jobInput,
  cardCreationButton,
  validationConfig, 
  cardsConteinerSelector} from '../components/utils/constants';

// создаём массив форм, перебором создаём экземпляры класса, валидируем
const formList = {};

Array.from(document.forms).forEach((formListElement) => {
  formList[formListElement.name] = new FormValidator(validationConfig, formListElement);
  formList[formListElement.name].enableValidation();
});

const user = new UserInfo({nameSelector:'.profile__name', jobSelector:'.profile__type-of-activity'});

// ____________создание экземпляра попапа с изображением
const popupImageCard = new PopupWithImage('.popup_type_place-image');
popupImageCard.setEventListeners();

function handleCardClick(name, link) {
  popupImageCard.open({name, link});  
}

// функция создания экземпляра класса карточки 
function createCard(item) {
  const card = new Card(item, '#card', handleCardClick);
  const cardElement = card.generate();
  return cardElement;  
};

// создание объекта класса Section
const cardsConteiner = new Section({
  items: initialCards.reverse(),
  renderer: createCard,
}, cardsConteinerSelector);

cardsConteiner.rendererAll();

const handleCardSubmit = (item) => {
  cardsConteiner.addItem(item);
};

// Обработчик «отправки» формы редактирования профиля
function submitFormHandlerProfile (data) {
  user.setUserInfo(data);
};

// обработчик отправки формы нового места
function submitTheFormNewPlace (evt) {
  const item = popupNewPlace._getInputValues();
  item.name = item.title;
  handleCardSubmit(item);
  popupNewPlace.close();
};

// ____________создание экземпляра попапа добавления карточки
const popupNewPlace = new PopupWithForm('.popup_type_new-place', submitTheFormNewPlace);
popupNewPlace.setEventListeners();

// ____________создание экземпляра попапа редактирования профиля
const popupProfile = new PopupWithForm('.popup_type_edit-profile', submitFormHandlerProfile);
popupProfile.setEventListeners();

// функция открытия попапа редактирования профиля
function openPopupProfile() {
  popupProfile.open();
  const data = user.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
};

// открытие формы редактирования профиля при клике на кнопку
profileEditingButton.addEventListener("click", function(evt) {
  formList[formProfile.name].resetValidation();
  openPopupProfile();
});

// открытие формы создания новой карточки
cardCreationButton.addEventListener("click", (evt) => {
  formList[formPlace.name].resetValidation();
  popupNewPlace.open();
});