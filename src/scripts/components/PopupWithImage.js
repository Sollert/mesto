import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupConfig) {
    super(popupSelector, popupConfig);
    this._image = document.querySelector(popupConfig.popupImageSelector);
    this._caption = document.querySelector(popupConfig.popupCaptionSelector);
  }

  // Открытие попапа
  openPopup(title, link) {
    super.openPopup();
    this._caption.textContent = title;
    this._image.src = link;
    this._image.alt = title;
  }
}
