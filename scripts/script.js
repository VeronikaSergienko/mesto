const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddPlace = document.querySelector('.popup_type_new-place');
const popupPlaceImage = document.querySelector('.popup_type_place-image');
const formElement = document.querySelector('.popup__form');
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
const clouseButton = document.querySelector('.popup__clouse-button');

// универсальные функции открытия и закрытия профиля
function openAllPopup (namePopap) {
  namePopap.classList.add('popup_opened');
};

function clouseAllPopup (namePopap) {
  namePopap.classList.remove('popup_opened');
};

// закрытия попапов
clouseButton.addEventListener("click", function(evt) {
  clouseAllPopup(popupEditProfile);
});

const clousePopupImage = popupPlaceImage.querySelector('.popup__clouse-button').addEventListener('click', (evt) => {
  clouseAllPopup(popupPlaceImage);
});

const clouseFormNewPlace = popupAddPlace.querySelector('.popup__clouse-button').addEventListener('click', (evt) => {
  clouseAllPopup(popupAddPlace);
});


// открытие формы редактирования профиля при клике на кнопку
editButton.addEventListener("click", function(evt) {
  openAllPopup(popupEditProfile);
  openPopupProfile();
});

// внесение данных в форму редактирования профиля из профиля
function openPopupProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileTypeOfActivity.textContent;
};

// Обработчик «отправки» формы редактирования профиля
function submitFormHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileTypeOfActivity.textContent = jobInput.value;
    clouseAllPopup(popupEditProfile);
};

// Прикрепляем обработчик отправки к форме редактирования профиля
formProfile.addEventListener('submit', submitFormHandlerProfile);

// открытие формы создания новой карточки
  addButton.addEventListener('click', (evt) => {
      openAllPopup(popupAddPlace);
    });


  // обработчик отправки формы нового места
  function submitTheFormNewPlace (evt) {
    evt.preventDefault();
    let item = {};
    item.name = placeName.value;
    item.link = linkToThePicture.value;
    console.log(item);
    makeCard(item);
    evt.target.reset();
    clouseAllPopup(popupAddPlace);
  };

//   прикрепляем к форме обработчик
formPlace.addEventListener('submit', submitTheFormNewPlace);

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
        openAllPopup(popupPlaceImage);
        });
    elements.prepend(card);
};

// создание карточек перебором из массива
initialCards.forEach(makeCard);