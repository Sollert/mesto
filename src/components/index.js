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
formAddCard.addEventListener("submit", submitFormAddCard);
formEditProfile.addEventListener("submit", submitFormEditProfile);

/* - Валидация - */
enableValidation(validationConfig);

fetch("https://nomoreparties.co/v1/plus-cohort-20/users/me", {
	headers: {
		authorization: "683f3065-4a13-441a-ad8e-6cb61f200f4c",
	},
})
	.then((res) => res.json())
	.then((result) => {
		console.log(result);
	});
