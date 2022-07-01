export class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._profileName = document.querySelector(this._nameSelector);
        this._profileTypeOfActivity = document.querySelector(this._jobSelector);
    };

    setUserInfo = (data) => {
        this._profileName.textContent = data.name;
        this._profileTypeOfActivity.textContent = data.job;
    };

    getUserInfo = () => {
        return {name: this._profileName.textContent, job: this._profileTypeOfActivity.textContent};
    };
};