export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        console.log({nameSelector, jobSelector});
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._profileName = document.querySelector(this._nameSelector);
        this._profileTypeOfActivity = document.querySelector(this._jobSelector);
        console.log(this._nameSelector);
    };

    setUserInfo = (data) => {
        this._profileName.textContent = data.name;
        this._profileTypeOfActivity.textContent = data.job;
    };

    getUserInfo = () => {
        // data.name = this._profileName.textContent;
        // data.job = this._profileTypeOfActivity.textContent;
        return {name: this._profileName.textContent, job: this._profileTypeOfActivity.textContent};
    };
}

// Создайте класс UserInfo
// Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. 
// Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.