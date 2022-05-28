// функция показывающая ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
};

// функция скрывающая ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

// Функция принимает массив полей, проверяет на валидность. Если поле не валидно, то вернёт true, обход массива прекратится, функция вернёт true
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}; 

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

// функция делает кнопку отправки формы неактивной, если не все поля валидны
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__save-button_disabled');
    } else {
      buttonElement.classList.remove('popup__save-button_disabled');
    }
}; 

// Находим все поля внутри формы, сделаем из них массив методом Array.from, каждому полю добавим обработчик события input
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
    });
}; 


// Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
  
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  
enableValidation();