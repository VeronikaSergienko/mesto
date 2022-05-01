let EditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let ClouseButton = document.querySelector('.popup__clouse-button');
let SaveButton = document.querySelector('.popup__save-button');
let ProfileName = document.querySelector('.profile__name');
let ProfileTypeOfActivity = document.querySelector('.profile__type-of-activity');
let PopupName = document.querySelector('#PopupName');
let PopupTypeOfActivity = document.querySelector('#PopupTypeOfActivity');

EditButton.addEventListener("click", function(event) {
    openPopup();
});

ClouseButton.addEventListener("click", function(event) {
    clousePopup();
});

SaveButton.addEventListener("click", function(event) {
    ProfileName.value = PopupName.textContent;
    ProfileTypeOfActivity.value = PopupTypeOfActivity.textContent;
    clousePopup();
});

function openPopup() {
    popup.classList.add('popup_active');
    PopupName.value = ProfileName.textContent;
    PopupTypeOfActivity.value = ProfileTypeOfActivity.textContent;
}

function clousePopup() {
    popup.classList.remove('popup_active');
}

function SaveProfile (evt) {
    evt.preventDefault();
    ProfileName.value = PopupName.textContent;
    ProfileTypeOfActivity.value = PopupTypeOfActivity.textContent;
    // console.log(ProfileName);
    // console.log(ProfileTypeOfActivity);
};

popup.addEventListener('submit', SaveProfile);

// // Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// let nameInput = // Воспользуйтесь инструментом .querySelector()
// let jobInput = // Воспользуйтесь инструментом .querySelector()

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formSubmitHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                                                 // Так мы можем определить свою логику отправки.
//                                                 // О том, как это делать, расскажем позже.

//     // Получите значение полей jobInput и nameInput из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);