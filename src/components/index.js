import {
	validationConfig,
	initialCards,
	cardsContainer,
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
	cardPopup,
	cardPopupImage,
	cardPopupCaption,
} from "./constants.js";
import { enableValidation, resetValidation } from "../validate.js";
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

const openEditProfilePopup = () => {
	openPopup(popupEditProfile);
	fillProfileForm();
	resetValidation(formEditProfile, validationConfig);
	formEditProfile.addEventListener("submit", submitFormEditProfile);
};

const openAddCardPopup = () => {
	openPopup(popupAddCard);
	resetValidation(formAddCard, validationConfig);
	formAddCard.addEventListener("submit", submitFormAddCard);
	formAddCard.reset();
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
			cardTitleField.value,
			cardImageField.value,
			openCardPopup
		)
	);
	formAddCard.reset();
};

/* - Стартовые карточки - */
initialCards.forEach((card) => {
	renderElement(
		cardsContainer,
		createCard(".card-template", card.name, card.link, openCardPopup)
	);
});

/* - Вызов стартовых слушателей - */
buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddCardPopup);

/* - Валидация - */
enableValidation(validationConfig);
