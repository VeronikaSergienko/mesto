import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { Api } from '../components/Api.js';
import {profileEditingButton, 
  formProfile, 
  formPlace, 
  nameInput, 
  jobInput,
  cardCreationButton,
  validationConfig, 
  cardsConteinerSelector, 
  formAvatar,
  profileAvatar} from '../components/utils/constants.js';

// создаём массив форм, перебором создаём экземпляры класса, валидируем
const formList = {};

Array.from(document.forms).forEach((formListElement) => {
  formList[formListElement.name] = new FormValidator(validationConfig, formListElement);
  formList[formListElement.name].enableValidation();
});

const api = new Api({ baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45/' });
const user = new UserInfo({ nameSelector:'.profile__name', jobSelector:'.profile__type-of-activity', avatarSelector: '.profile__avatar' });

// ____________создание экземпляра попапа с изображением
const popupImageCard = new PopupWithImage('.popup_type_place-image');
popupImageCard.setEventListeners();

function handleCardClick(name, link) {
  popupImageCard.open({name, link});  
}

// функция колбэк лайка и дизлайка карточки
function addOrRemoveLike(cardId, isLiked, setLikes) {
  api.toggleLikes(cardId, isLiked)
  .then(({ likes }) => setLikes(likes))
  .catch((err) => {
    console.log(err);
  })
};

// обработчик отправки формы нового места
function submitTheFormNewPlace (evt) {
  const item = popupNewPlace._getInputValues();
  popupNewPlace.toggleButtonText(true);
  api.postCard(item)
  .then((res) => {
    cardsConteiner.addItem(res);
    popupNewPlace.close();
  })
  .catch((err) => {
    console.log(err);
  })  
  .finally(() => {
    popupNewPlace.toggleButtonText(false);
  })
};

// Обработчик «отправки» формы редактирования профиля
function submitFormHandlerProfile (data) {
  popupProfile.toggleButtonText(true);
  api.patchUserInfo(data)
  .then((res) => {
    user.setUserInfo(res);
    popupProfile.close();
  })
  .catch((err) => {
    console.log(err);
  })  
  .finally(() => {
    popupProfile.toggleButtonText(false);
  })
};

// функция колбэк удаления карточки
function handleCardDelete(cardId, deleteCardElement) {
  api.deleteCard(cardId)
  .then((res) => {
    console.log(res);
    deleteCardElement();
    popupWithConfirmation.close();
  })
  .catch((err) => {
    console.log(err);
  })
}

// ____________создание экземпляра попапа добавления карточки
const popupNewPlace = new PopupWithForm('.popup_type_new-place', submitTheFormNewPlace);
popupNewPlace.setEventListeners();

// ____________создание экземпляра попапа редактирования профиля
const popupProfile = new PopupWithForm('.popup_type_edit-profile', submitFormHandlerProfile);
popupProfile.setEventListeners();

// __________создание экземпляра попапа с согласием удаления карточки
const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirmation', handleCardDelete);
popupWithConfirmation.setEventListeners();

function openPopupWithConfirmation(cardId, deleteCardElement) {
  popupWithConfirmation.open(cardId, deleteCardElement);
}

// функция создания экземпляра класса карточки 
function createCard(item) {
  const card = new Card(item, user.getUserId(), '#card', handleCardClick, openPopupWithConfirmation, addOrRemoveLike);
  const cardElement = card.generate();
  return cardElement;  
};

// создание объекта класса Section
const cardsConteiner = new Section({
  renderer: createCard,
}, cardsConteinerSelector);

// функция открытия попапа редактирования профиля
function openPopupProfile() {
  popupProfile.open();
  const data = user.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.about;
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

// функция-колбэк для отправки аватара профиля
function submitFormHandlerAvatar (data) {
  popupAvatar.toggleButtonText(true);
  api.patchUserAvatar(data)
  .then((res) => {
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupAvatar.toggleButtonText(false);
  })
}

// создание экземпляра класса для попапа смены аватара
// навешивание слушателя для открытия попапа
const popupAvatar = new PopupWithForm('.popup_type_edit-avatar', submitFormHandlerAvatar);
popupAvatar.setEventListeners();
profileAvatar.addEventListener("click", (evt) => {
  formList[formAvatar.name].resetValidation();
  popupAvatar.open();
})

Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
.then(([profile, cards]) => {
  user.setUserInfo(profile);  
  cardsConteiner.rendererAll(cards.reverse());
})
.catch((err) => {
  console.log(err);
})