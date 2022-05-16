let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddPlace = document.querySelector('.popup_type_new-place');
let popupPlaceImage = document.querySelector('.popup_type_place_image');
let formElement = document.querySelector('.popup__form');
let formProfile = document.querySelector('.popup__form_profile');
let formPlace = document.querySelector('.popup__form_place');
let profileName = document.querySelector('.profile__name');
let profileTypeOfActivity = document.querySelector('.profile__type-of-activity');
let nameInput = document.querySelector('#popupName');
let jobInput = document.querySelector('#popupTypeOfActivity');
let placeName = document.querySelector('#place-name');
let linkToThePicture = document.querySelector('#link-to-the-picture');
const addButton = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
const placeImg = popupPlaceImage.querySelector('img');
const placeTitle = popupPlaceImage.querySelector('.popup__place-title');
const clouseButton = document.querySelector('.popup__clouse-button');

function openAllPopup (namePopap) {
  namePopap.classList.add('popup_opened');
  console.log('открыли попап общей функцией');
}

function clouseAllPopup (namePopap) {
  namePopap.classList.remove('popup_opened');
  console.log('закрыли попап общей функцией');
}

// попап профиля
editButton.addEventListener("click", function(evt) {
  openAllPopup(popupEditProfile);
  openPopupProfile();
});


// функция открытия формы редактирования профиля
function openPopupProfile() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileTypeOfActivity.textContent;
};



// Обработчик «отправки» формы
function submitFormHandlerProfile (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileTypeOfActivity.textContent = jobInput.value;
    clouseAllPopup(popupEditProfile);
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



// Прикрепляем обработчик к форме
formProfile.addEventListener('submit', submitFormHandlerProfile);

// 

// попап создания карточки-------------------------------------------------------------

// __________________________________________________________________________________


  addButton.addEventListener('click', (evt) => {
      openAllPopup(popupAddPlace);
    });


  // обработчик отправки формы нового места
  function submitTheFormNewPlace (evt) {
    evt.preventDefault();
    let item = {};
    item.name = placeName.value;
    item.link = linkToThePicture.value;
    const card = cardTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__text').textContent = item.name;
    const img = card.querySelector('.element__image');
    img.src = item.link;
    img.alt = item.name;
            // переключатель для лайка
            card.querySelector('.element__like-button').addEventListener("click", (evt) => {
              evt.target.classList.toggle('element__like-button_active');
          });
      
        // удаление карточки
      card.querySelector('.element__delete-button').addEventListener("click", (evt) => {
              const place = evt.target.closest('.element');
              place.remove();
          });
      
      // слушатель картинки для открытия в отдельном окне
      img.addEventListener("click", (evt) => {
          const clickimg = evt.target;
          placeImg.src = clickimg.src;
          placeImg.alt = clickimg.alt;
          placeTitle.textContent = clickimg.alt;
          openAllPopup(popupPlaceImage);
          });
      
      // добавление карточки в начало
      elements.prepend(card);
    evt.target.reset();
    clouseAllPopup(popupAddPlace);
  };

//   прикрепляем к форме обработчик

formPlace.addEventListener('submit', submitTheFormNewPlace);


//_____________________________________________________________________________________

const submitNewCard = (name, link) => {

}

// создание карточек------------------------------------------------------------


const cardTemplate = document.querySelector('#card').content;

// создание карточки
// ____________________________________________________________________________________
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
        console.log(clickimg);
        });
    elements.prepend(card);
};

initialCards.forEach(makeCard);