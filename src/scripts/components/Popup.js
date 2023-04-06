export default class Popup {
  constructor(popupSelector, popupConfig) {
    this._popupItem = document.querySelector(popupSelector);
    this._popupOpenedClass = popupConfig.popupOpenedClass;
    this._popupCloseButtonClass = popupConfig.popupCloseButtonClass;
    this._submitButton = this._popupItem.querySelector(
      popupConfig.popupSubmitButtonSelector
    );
  }

  // Универсальное открытие и закрытие попапа при нажатии на крестик, ESC, оверлей
  openPopup() {
    this._popupItem.classList.add(this._popupOpenedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup() {
    this._popupItem.classList.remove(this._popupOpenedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };

  // Установка слушателей
  setEventListeners() {
    this._popupItem.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains(this._popupOpenedClass)) {
        this.closePopup(this._popupItem);
      }
      if (evt.target.classList.contains(this._popupCloseButtonClass)) {
        this.closePopup(this._popupItem);
      }
    });
  }
}