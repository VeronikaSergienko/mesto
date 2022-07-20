export class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._jobSelector = jobSelector;
        this._avatarSelector = avatarSelector;
        this._profileName = document.querySelector(this._nameSelector);
        this._profileTypeOfActivity = document.querySelector(this._jobSelector);
        this._profileAvatar = document.querySelector(this._avatarSelector);
        this.setUserInfo = this.setUserInfo.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    };

    setUserInfo = ({ name, about, avatar, _id }) => {
        this._profileName.textContent = name;
        this._profileTypeOfActivity.textContent = about;
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._profileAvatar.style.backgroundImage = `url(${avatar})`;
        this._id = _id;
    };

    getUserInfo = () => {
        return { name: this._profileName.textContent, about: this._profileTypeOfActivity.textContent };
    };

    getUserAvatar() {
        return { avatar: this._avatar }
    }

    getUserId() {
        // return { _id: this._id };
        let idijfjfj = {_id: this._id};
        return this._id;
    }
};