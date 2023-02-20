/* --- ПЕРЕМЕННЫЕ --- */
const validationConfig = {
	formSelector: ".form",
	inputSelector: ".form__input",
	submitButtonSelector: ".form__submit-button",
	inactiveButtonClass: "form__submit-button_disabled",
	inputErrorClass: "form__input_type_error",
	errorClass: "form__input-error_active",
};

const initialCards = [
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
const cardsContainer = document.querySelector(".cards");

// Блок профиля
const profile = document.querySelector(".profile");
const userName = profile.querySelector(".user__name");
const userStatus = profile.querySelector(".user__status");

// Кнопки для открытия попапов
const buttonAddCard = document.querySelector(".add-card-button");
const buttonEditProfile = document.querySelector(".user__edit-button");

// Попапы
const popups = document.querySelectorAll(".popup");

// Попап редактирования профиля
const popupEditProfile = document.querySelector(".popup_type_profile");
const formEditProfile = document.forms.editProfile;
const userNameField = editProfile.elements.userName;
const userStatusField = editProfile.elements.userStatus;

// Попап добавления карточки
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = document.forms.addCard;
const cardTitleField = addCard.elements.cardTitle;
const cardImageField = addCard.elements.cardImage;

// Попап карточки
const cardPopup = document.querySelector(".popup_type_card");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

/* --- ПОПАПЫ --- */
const openPopup = (popup) => {
	popup.classList.add("popup_opened");
	popup.addEventListener("mousedown", closePopupHandler);
	document.addEventListener("keydown", closePopupHandler);
};

const closePopup = (popup) => {
	popup.classList.remove("popup_opened");
	popup.removeEventListener("mousedown", closePopupHandler);
	document.removeEventListener("keydown", closePopupHandler);
};

const fillProfileForm = () => {
	userNameField.value = userName.textContent;
	userStatusField.value = userStatus.textContent;
};

const changeUserInfo = () => {
	userName.textContent = userNameField.value;
	userStatus.textContent = userStatusField.value;
};

const fillCardPopupInfo = (evt) => {
	cardPopupImage.src = evt.target.src;
	cardPopupImage.alt = evt.target.alt;
	cardPopupCaption.textContent = evt.target.alt;
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

const openCardPopup = (evt) => {
	openPopup(cardPopup);
	fillCardPopupInfo(evt);
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
		createCard(".card-template", cardTitleField.value, cardImageField.value)
	);
	formAddCard.reset();
};

const closePopupHandler = (evt) => {
	if (evt.target.classList.contains("popup__close-button")) {
		closePopup(evt.target.closest(".popup"));
	} else if (evt.target.classList.contains("popup")) {
		closePopup(evt.target.closest(".popup"));
	} else if (evt.key === "Escape") {
		closePopup(document.querySelector(".popup_opened"));
	}
};

/* --- СОЗДАНИЕ КАРТОЧКИ --- */
const likeCard = (evt) => {
	evt.target.classList.toggle("card__like-button_active");
};

const deleteCard = (evt) => {
	evt.target.closest(".card").remove();
};

const createCard = (templateSelector, title, link) => {
	const cardTemplate = document.querySelector(templateSelector).content;
	const cardElement = cardTemplate.cloneNode(true);
	const cardImage = cardElement.querySelector(".card__image");
	const cardTitle = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");
	const deleteButton = cardElement.querySelector(".card__delete-button");

	cardImage.src = link;
	cardImage.alt = title;
	cardTitle.textContent = title;

	cardImage.addEventListener("click", openCardPopup);
	likeButton.addEventListener("click", likeCard);
	deleteButton.addEventListener("click", deleteCard);

	return cardElement;
};

const renderElement = (container, element) => {
	container.prepend(element);
};

initialCards.forEach((card) => {
	renderElement(
		cardsContainer,
		createCard(".card-template", card.name, card.link)
	);
});

/* --- ВЫЗОВ СТАРТОВЫХ СЛУШАТЕЛЕЙ --- */
buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddCardPopup);

/* --- ВАЛИДАЦИЯ --- */
const showInputError = (
	formElement,
	inputElement,
	inputErrorClass,
	errorClass,
	errorMessage
) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.classList.add(errorClass);
	errorElement.textContent = errorMessage;
};

const hideInputError = (
	formElement,
	inputElement,
	inputErrorClass,
	errorClass
) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

const toggleButtonState = (
	formElement,
	inputList,
	inactiveButtonClass,
	submitButtonSelector
) => {
	const buttonElement = formElement.querySelector(submitButtonSelector);

	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(inactiveButtonClass);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(inactiveButtonClass);
	}
};

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(
			formElement,
			inputElement,
			inputErrorClass,
			errorClass,
			inputElement.validationMessage
		);
	} else {
		hideInputError(formElement, inputElement, inputErrorClass, errorClass);
	}
};

const setEventListeners = (
	formElement,
	{
		inputSelector,
		submitButtonSelector,
		inactiveButtonClass,
		inputErrorClass,
		errorClass,
	}
) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	toggleButtonState(
		formElement,
		inputList,
		inactiveButtonClass,
		submitButtonSelector
	);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			isValid(formElement, inputElement, inputErrorClass, errorClass);
			toggleButtonState(
				formElement,
				inputList,
				inactiveButtonClass,
				submitButtonSelector
			);
		});
	});
};

const enableValidation = ({ formSelector, ...rest }) => {
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, rest);
	});
};

const resetValidation = (formElement, { inputErrorClass, errorClass }) => {
	const inputList = Array.from(formElement.querySelectorAll(".form__input"));
	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement, inputErrorClass, errorClass);
	});
};

enableValidation(validationConfig);
