import {
	validationConfig,
	initialCards,
	cardsContainer,
	userAvatar,
	userName,
	userStatus,
	buttonAddCard,
	buttonEditProfile,
	popupEditProfile,
	formEditProfile,
	userNameField,
	userStatusField,
	popupAddCard,
	formAddCard,
	cardTitleField,
	cardImageField,
	popupEditUserAvatar,
	formEditUserAvatar,
	userAvatarImageFiled,
	buttonEditUserAvatar,
} from "./constants.js";
import { enableValidation, resetValidation } from "./validate.js";
import { createCard, renderElement } from "./card.js";
import { openPopup, closePopup, openCardPopup } from "./modal.js";
import "../pages/index.css";

const fillProfileForm = () => {
	userNameField.value = userName.textContent;
	userStatusField.value = userStatus.textContent;
};

const changeUserInfo = () => {
	userName.textContent = userNameField.value;
	userStatus.textContent = userStatusField.value;
};

const changeUserAvatar = () => {
	userAvatar.src = userAvatarImageFiled.value;
};

const openEditProfilePopup = () => {
	fillProfileForm();
	resetValidation(formEditProfile, validationConfig);
	openPopup(popupEditProfile);
};

const openAddCardPopup = () => {
	resetValidation(formAddCard, validationConfig);
	formAddCard.reset();
	openPopup(popupAddCard);
};

const openEditUserAvatarPopup = () => {
	resetValidation(formEditUserAvatar, validationConfig);
	formEditUserAvatar.reset();
	openPopup(popupEditUserAvatar);
};

const submitFormEditProfile = (evt) => {
	evt.preventDefault();
	closePopup(popupEditProfile);
	changeUserInfo();
};

const submitFormAddCard = (evt) => {
	evt.preventDefault();
	closePopup(popupAddCard);
	renderElement(
		cardsContainer,
		createCard(
			".card-template",
			".card",
			cardTitleField.value,
			cardImageField.value,
			openCardPopup
		)
	);
	formAddCard.reset();
};

const submitFormEditUserAvatar = (evt) => {
	evt.preventDefault();
	closePopup(popupEditUserAvatar);
	changeUserAvatar();
};

/* - Стартовые карточки - */
initialCards.forEach((card) => {
	renderElement(
		cardsContainer,
		createCard(".card-template", ".card", card.name, card.link, openCardPopup)
	);
});

/* - Вызов стартовых слушателей - */
buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddCardPopup);
buttonEditUserAvatar.addEventListener("click", openEditUserAvatarPopup);
formAddCard.addEventListener("submit", submitFormAddCard);
formEditProfile.addEventListener("submit", submitFormEditProfile);
formEditUserAvatar.addEventListener("submit", submitFormEditUserAvatar);

/* - Валидация - */
enableValidation(validationConfig);
