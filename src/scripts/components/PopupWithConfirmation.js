import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupConfig, { submitCallbackForm }) {
    super(popupSelector, popupConfig);
    this._formElement = this._popupItem.querySelector(
      popupConfig.popupFormSelector
    );
    this._submitCallbackForm = submitCallbackForm;
  }

  // Определяет карточку
  setCard(card) {
    this._card = card;
  }

  // Установка слушателей
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = this._submitButton.dataset.saving;
      this._submitCallbackForm(this._card)
        .then(() => this.closePopup())
        .finally(() => {
          this._submitButton.textContent = this._submitButton.dataset.save;
        });
    });
  }
}