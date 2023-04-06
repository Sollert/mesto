export default class UserInfo {
  constructor(userConfig) {
    this._userName = document.querySelector(userConfig.userNameSelector);
    this._userAbout = document.querySelector(userConfig.userAboutSelector);
    this._userAvatar = document.querySelector(userConfig.userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
      avatar: this._userAvatar.src,
    };
  }

  // Добавление информации о пользователе
  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
  }

  // Добавление изображения пользователя
  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}