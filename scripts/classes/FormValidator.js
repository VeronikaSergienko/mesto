class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._saveButton = this._form.querySelector(this._submitButtonSelector);
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

  _setEventListeners(inputElement, buttonElement, inputList) {
      inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
      this._isValid(inputElement);
      this._toggleButtonState(inputList, buttonElement);
      });  
  };

// Находим все поля внутри формы, сделаем из них массив методом Array.from, каждому полю добавим обработчик события input
enableValidation() {
    this._toggleButtonState(this._inputList, this._saveButton);
    this._inputList.forEach((inputElement) => {
      this._setEventListeners(inputElement, this._saveButton, this._inputList);       
      });
      this._toggleButtonState(this._inputList, this._saveButton);
  }; 
  
resetValidation() {
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });
  this._toggleButtonState(this._inputList, this._saveButton);
};
};

export { FormValidator };