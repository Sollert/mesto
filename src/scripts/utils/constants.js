export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const cardConfig = {
  cardTemplate: document.querySelector(".card-template").content,
  cardSelector: ".card",
  cardImageSelector: ".card__image",
  cardTitleSelector: ".card__title",
  deleteButtonSelector: ".card__delete-button",
  deleteButtonDisabledClass: "card__delete-button_disabled",
  likeButtonSelector: ".card__like-button",
  cardLikesCounterSelector: ".card__like-counter",
  likeButtonActiveClass: "card__like-button_active",
};

export const popupConfig = {
  popupFormSelector: ".form",
  popupSubmitButtonSelector: ".form__submit-button",
  popupImageSelector: ".popup__image",
  popupCaptionSelector: ".popup__caption",
  popupOpenedClass: "popup_opened",
  popupCloseButtonClass: "popup__close-button",
};

export const userConfig = {
  userNameSelector: ".user__name",
  userAboutSelector: ".user__about",
  userAvatarSelector: ".user__avatar",
};

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "683f3065-4a13-441a-ad8e-6cb61f200f4c",
    "Content-Type": "application/json",
  },
};

export const alertConfig = {
  alertCloseButtonSelector: ".alert__close-button",
  alertMessageSelector: ".alert__message",
  alertOpenedClass: "alert_opened",
};

// Кнопки для открытия попапов
export const buttonAddCard = document.querySelector(".add-card-button");
export const buttonEditUserInfo = document.querySelector(".user__edit-button");
export const buttonEditUserAvatar = document.querySelector(
  ".user__avatar-overlay"
);

// Попап загрузки
export const initialLoadingPopup = document.querySelector('.popup_type_loader');

// Формы
export const formEditUserInfo = document.forms.editProfile;
export const formAddCard = document.forms.addCard;
export const formEditUserAvatar = document.forms.editUserAvatar;
