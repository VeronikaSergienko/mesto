/* Требования к валидации форм. Разбейте код валидации на функции. 
Вы уже делали это в теме «Валидация форм». Сделайте функцию enableValidation ответственной за включение валидации всех форм. 
Пусть она принимает как объект настроек все нужные функциям классы и селекторы элементов:*/

//  включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// }); 

const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
// Выбираем элемент ошибки на основе уникального класса 
const formError = formElement.querySelector(`.${formInput.id}-error`);

formElement.addEventListener('submit', function (evt) {
    // Отменим стандартное поведение
    evt.preventDefault();
});
  
  // Слушатель события input
  formInput.addEventListener('input', function (evt) {
    // Выведем в консоль значение свойства validity.valid поля ввода, 
    // на котором слушаем событие input
    console.log(evt.target.validity.valid);
});

const showInputError = (element, errorMessage) => {
    element.classList.add('popup__input-error');
    // Показываем сообщение об ошибке
      // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
    formError.classList.add('popup__input-error_active');
};
  
const hideInputError = (element) => {
    element.classList.remove('popup__input-error');
    // Скрываем сообщение об ошибке
    formError.classList.remove('popup__input-error_active');
    formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = () => {
    if (!formInput.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formInput, formInput.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formInput);
    }
  };

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);