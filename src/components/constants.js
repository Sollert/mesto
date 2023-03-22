export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-20",
  headers: {
    authorization: "683f3065-4a13-441a-ad8e-6cb61f200f4c",
    "Content-Type": "application/json",
  },
};

export const formValidators = {};

export const cardsContainer = document.querySelector(".cards");

// Блок профиля
const profile = document.querySelector(".profile");
export const userAvatar = profile.querySelector(".user__avatar");
export const userName = profile.querySelector(".user__name");
export const userStatus = profile.querySelector(".user__status");

// Кнопки для открытия попапов
export const buttonAddCard = document.querySelector(".add-card-button");
export const buttonEditUserInfo = document.querySelector(".user__edit-button");
export const buttonEditUserAvatar = document.querySelector(
  ".user__avatar-overlay"
);

// Формы
export const forms = document.querySelectorAll(".form");

// Попап редактирования профиля
export const popupEditUserInfo = document.querySelector(".popup_type_profile");
export const formEditUserInfo = document.forms.editProfile;
export const userNameField = formEditUserInfo.elements.userName;
export const userStatusField = formEditUserInfo.elements.userStatus;
export const editUserInfoSubmitButton = formEditUserInfo.querySelector(
  ".form__submit-button"
);

// Попап добавления карточки
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const formAddCard = document.forms.addCard;
export const cardTitleField = formAddCard.elements.cardTitle;
export const cardImageField = formAddCard.elements.cardImage;
export const addCardSubmitButton = formAddCard.querySelector(
  ".form__submit-button"
);

// Попап карточки
export const cardPopup = document.querySelector(".popup_type_card");
export const cardPopupImage = cardPopup.querySelector(".popup__image");
export const cardPopupCaption = cardPopup.querySelector(".popup__caption");

// Попап аватара
export const popupEditUserAvatar = document.querySelector(
  ".popup_type_edit-user-avatar"
);
export const formEditUserAvatar = document.forms.editUserAvatar;
export const userAvatarImageFiled = formEditUserAvatar.elements.userAvatarLink;
export const editUserAvatarSubmitButton = formEditUserAvatar.querySelector(
  ".form__submit-button"
);
