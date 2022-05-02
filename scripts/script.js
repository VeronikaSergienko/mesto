let EditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let ClouseButton = document.querySelector('.popup__clouse-button');
let SaveButton = document.querySelector('.popup__save-button');
let ProfileName = document.querySelector('.profile__name');
let ProfileTypeOfActivity = document.querySelector('.profile__type-of-activity');
let nameInput = document.querySelector('#PopupName');
let jobInput = document.querySelector('#PopupTypeOfActivity');

EditButton.addEventListener("click", function(event) {
    openPopup();
});

ClouseButton.addEventListener("click", function(event) {
    clousePopup();
});

SaveButton.addEventListener("click", function(event) {
    ProfileName.textContent = nameInput.value;
    ProfileTypeOfActivity.textContent = jobInput.value;
    clousePopup();
});

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = ProfileName.textContent;
    jobInput.value = ProfileTypeOfActivity.textContent;
}

function clousePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    ProfileName.textContent = nameInput.value;
    ProfileTypeOfActivity.textContent = jobInput.value;
};

popup.addEventListener('submit', formSubmitHandler);