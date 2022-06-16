// функция показывающая ошибку
// const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.add(inputErrorClass);
//   errorElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
// };

// функция скрывающая ошибку
// const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// Функция принимает массив полей, проверяет на валидность. Если поле не валидно, то вернёт true, обход массива прекратится, функция вернёт true
// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }; 

// Функция, которая проверяет валидность поля
// const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
//   } else {
//     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// };

// функция, которая делает кнопку неактивной
const inactiveButton = (button) => {
  button.classList.add('popup__save-button_disabled');
  button.disabled = true;
};

// функция делает кнопку отправки формы неактивной, если не все поля валидны
// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     inactiveButton(buttonElement);
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }; 

// Находим все поля внутри формы, сделаем из них массив методом Array.from, каждому полю добавим обработчик события input
// const setEventListeners = (formElement, {
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass,
// }) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//       inputElement.addEventListener('input', () => {
//       // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
//       isValid(formElement, inputElement, inputErrorClass, errorClass);
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//       });
//   });
// }; 


// Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
// const enableValidation = ({
//   formSelector,
//   ...rest
// }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
//   // Переберём полученную коллекцию
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (evt) => {
//       // У каждой формы отменим стандартное поведение
//       evt.preventDefault();
//     });

//     // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
//     setEventListeners(formElement, rest);
//   });
// };

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__save-button',
//   inactiveButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active'
// });


// formSelector: '.popup__form',

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
  }

  // функция показывающая ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  // функция скрывающая ошибку
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  // Функция принимает массив полей, проверяет на валидность. Если поле не валидно, то вернёт true, обход массива прекратится, функция вернёт true
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  // функция, которая делает кнопку неактивной
  _inactiveButton(button){
  button.classList.add('popup__save-button_disabled');
  button.disabled = true;
  };

  // функция делает кнопку отправки формы неактивной, если не все поля валидны
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._inactiveButton(buttonElement);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }; 

// Находим все поля внутри формы, сделаем из них массив методом Array.from, каждому полю добавим обработчик события input
enableValidation() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
        });        
      });
      this._toggleButtonState(inputList, buttonElement);
  }; 

  cleanUpForm() {
    const inputList = Array.form(this._form.querySelectorAll(`.${this._inputSelector}`));
    const saveButton = this._form.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState(inputList, saveButton);
  };
};

// const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
// console.log(formList);

// formList.forEach((item) => {
//   const FormValidator1 = new FormValidator(item);
//   const card = FormValidator1.enableValidation();
// });

const formList = {};

Array.from(document.forms).forEach((formListElement) => {
  formList[formListElement.name] = new FormValidator(validationConfig, formListElement);
  formList[formListElement.name].enableValidation();
});