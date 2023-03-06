export const validationConfig = {
	formSelector: ".form",
	inputSelector: ".form__input",
	submitButtonSelector: ".form__submit-button",
	inactiveButtonClass: "form__submit-button_disabled",
	inputErrorClass: "form__input_type_error",
	errorClass: "form__input-error_active",
};

export const initialCards = [
	{
		name: "Архыз",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
	},
	{
		name: "Челябинская область",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
	},
	{
		name: "Иваново",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
	},
	{
		name: "Холмогорский район",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
	},
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
	},
];
export const cardsContainer = document.querySelector(".cards");

// Блок профиля
const profile = document.querySelector(".profile");
export const userAvatar = profile.querySelector(".user__avatar");
export const userName = profile.querySelector(".user__name");
export const userStatus = profile.querySelector(".user__status");

// Кнопки для открытия попапов
export const buttonAddCard = document.querySelector(".add-card-button");
export const buttonEditProfile = document.querySelector(".user__edit-button");
export const buttonEditUserAvatar = document.querySelector(
	".user__avatar-overlay"
);

// Попап редактирования профиля
export const popupEditProfile = document.querySelector(".popup_type_profile");
export const formEditProfile = document.forms.editProfile;
export const userNameField = editProfile.elements.userName;
export const userStatusField = editProfile.elements.userStatus;

// Попап добавления карточки
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const formAddCard = document.forms.addCard;
export const cardTitleField = addCard.elements.cardTitle;
export const cardImageField = addCard.elements.cardImage;

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

// API
export const cohortId = "plus-cohort-20";
export const token = "683f3065-4a13-441a-ad8e-6cb61f200f4c";
