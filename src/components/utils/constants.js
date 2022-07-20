const profileEditingButton = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.popup__form_profile');
const formPlace = document.querySelector('.popup__form_place');
const formAvatar = document.querySelector('.popup__form_avatar');
const nameInput = document.querySelector('#popup-name');
const jobInput = document.querySelector('#popup-about');
const cardCreationButton = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__avatar');
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};
const cardsConteinerSelector = '.elements';

export {profileEditingButton, formProfile, formPlace, nameInput, jobInput, cardCreationButton, validationConfig, cardsConteinerSelector, profileAvatar, formAvatar};