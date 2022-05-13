let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddPlace = document.querySelector('.popup_type_new-place');
let popupPlaceImage = document.querySelector('.popup_type_place_image');
let formElement = document.querySelector('.popup__form');
let formProfile = document.querySelector('.popup__form_profile');
let formPlace = document.querySelector('.popup__form_place');
let clouseButton = document.querySelector('.popup__clouse-button');
let profileName = document.querySelector('.profile__name');
let profileTypeOfActivity = document.querySelector('.profile__type-of-activity');
let nameInput = document.querySelector('#popupName');
let jobInput = document.querySelector('#popupTypeOfActivity');
let placeName = document.querySelector('#place-name');
let linkToThePicture = document.querySelector('#link-to-the-picture');
const addButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const placeImg = popupPlaceImage.querySelector('img');

// попап профиля
editButton.addEventListener("click", openPopupProfile);
// функция открытия формы редактирования профиля
function openPopupProfile() {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileTypeOfActivity.textContent;
};



// Обработчик «отправки» формы
function submitFormHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileTypeOfActivity.textContent = jobInput.value;
    clousePopup(popupEditProfile);
};



clouseButton.addEventListener("click", clousePopup);

// Прикрепляем обработчик к форме
formProfile.addEventListener('submit', submitFormHandlerProfile);

// 

// попап создания карточки-------------------------------------------------------------

// __________________________________________________________________________________


  addButton.addEventListener('click', openPopupNewPlace);


  // обработчик отправки формы нового места
  function submitTheFormNewPlace (evt) {
    evt.preventDefault();
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__text').textContent = placeName.value;
    const img = card.querySelector('.element__image');
    img.src = linkToThePicture.value;
    img.alt = placeName.value;;
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
        popupPlaceImage.classList.add('popup_opened');    
      console.log('кликнули на картинку');
    });

  // добавление карточки в начало
    elements.prepend(card);
    evt.target.reset();
    popupAddPlace.classList.remove('popup_opened');
  };

//   прикрепляем к форме обработчик

formPlace.addEventListener('submit', submitTheFormNewPlace);

//_____________________________________________________________________________________

// создание карточек------------------------------------------------------------


const cardTemplate = document.querySelector('#card').content;

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
        popupPlaceImage.classList.add('popup_opened');
        placeImg.src = img.src;
      console.log('кликнули на картинку');
    });

  // добавление карточки в начало
    elements.prepend(card);
  });


// ----------------------------------------------------------------------------------
// ________________________________________________________________________________________

function openPopup (elem) {
    elem.classList.add('popup_opened');
    console.log('открыли попап');
};

function clousePopup () {
    popup.classList.remove('popup_opened');
    console.log('закрыли попап');
};







// функция закрытия формы нажатием на "крестик"
// function clousePopup() {
//     popup.classList.remove('popup_opened');
// };

  // открытие формы
function openPopupNewPlace() {
    popupAddPlace.classList.add('popup_opened');
  };

// ______________закрытие формы на крестик нажав
  function clousePopupNewPlace() {
    popupAddPlace.classList.remove('popup_opened');
  };

  const clouseFormNewPlace = popupAddPlace.querySelector('.popup__clouse-button').addEventListener('click', clousePopupNewPlace);

// ______________закрытие попапас картинкой нажатием на крестик
const clousePopupImage = popupPlaceImage.querySelector('.popup__clouse-button').addEventListener('click', clousePopupImg);
function clousePopupImg() {
    popupPlaceImage.classList.remove('popup_opened');
  };

//   ------------------------------------------------------------------------
// _________________a