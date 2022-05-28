const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (element, errorMessage) => {
    element.classList.add('popup__input_type_error');
    formError.classList.add('popup__input-error_active');
    formError.textContent = errorMessage;
};

const hideInputError = (element) => {
    element.classList.remove('form__input_type_error');
    formError.classList.remove('popup__input-error_active');
    formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = () => {
    if (!formInput.validity.valid) {
      showInputError(formInput, formInput.validationMessage);
    } else {
      hideInputError(formInput);
    }
};

formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);