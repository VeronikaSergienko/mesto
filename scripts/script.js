const editButton = document.querySelector('.profile__edit-button');
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
const addButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const placeImg = popupPlaceImage.querySelector('img');
const placeTitle = popupPlaceImage.querySelector('.popup__place-title');
const cardTemplate = document.querySelector('#card').content;

// универсальные функции открытия и закрытия профиля
function openPopup (namePopap) {
  namePopap.classList.add('popup_opened');
};

function clousePopup (namePopap) {
  namePopap.classList.remove('popup_opened');
};

// закрытия попапов
const popupProfileCloseButton = popupEditProfile.querySelector('.popup__clouse-button').addEventListener("click", (evt) => {
    clousePopup(popupEditProfile);
  });

const popupImageCloseButton = popupPlaceImage.querySelector('.popup__clouse-button').addEventListener('click', (evt) => {
  clousePopup(popupPlaceImage);
});

const popupNewPlaceCloseButton = popupAddPlace.querySelector('.popup__clouse-button').addEventListener('click', (evt) => {
  clousePopup(popupAddPlace);
});

// внесение данных в форму редактирования профиля из профиля
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileTypeOfActivity.textContent;
};

// открытие формы редактирования профиля при клике на кнопку
editButton.addEventListener("click", function(evt) {
  openPopup(popupEditProfile);
  openPopupProfile();
});

// Обработчик «отправки» формы редактирования профиля
function submitFormHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileTypeOfActivity.textContent = jobInput.value;
    clousePopup(popupEditProfile);
};

// Прикрепляем обработчик отправки к форме редактирования профиля
formProfile.addEventListener('submit', submitFormHandlerProfile);

// открытие формы создания новой карточки
  addButton.addEventListener('click', (evt) => {
      openPopup(popupAddPlace);
    });

// создание новой карточки
const makeCard = (item) => {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__text').textContent = item.name;
  const img = card.querySelector('.element__image');
  img.src = item.link;
  img.alt = item.name;
  card.querySelector('.element__like-button').addEventListener("click", (evt) => {
          evt.target.classList.toggle('element__like-button_active');
      });
  card.querySelector('.element__delete-button').addEventListener("click", (evt) => {
          const place = evt.target.closest('.element');
          place.remove();
      });
  img.addEventListener("click", (evt) => {
      const clickimg = evt.target;
      placeImg.src = clickimg.src;
      placeImg.alt = clickimg.alt;
      placeTitle.textContent = clickimg.alt;
      openPopup(popupPlaceImage);
      });
  return card;
};

// добавление карточки
function addCard(item) {
  const newCard = makeCard(item);
  elements.prepend(newCard);
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
    clousePopup(popupAddPlace);
  };

//   прикрепляем к форме обработчик
formPlace.addEventListener('submit', submitTheFormNewPlace);

// создание карточек перебором из массива
initialCards.forEach(addCard);