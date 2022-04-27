let EditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let ClouseButton = document.querySelector('.popup__clouse-button');

EditButton.addEventListener("click", function(event) {
    togglePopup();
});

ClouseButton.addEventListener("click", function(event) {
    togglePopup();
});

function togglePopup() {
    popup.classList.toggle("popup_active");
};