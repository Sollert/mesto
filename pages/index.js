/* --- ПЕРЕМЕННЫЕ --- */
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
const formEditProfile = popupEditProfile.querySelector(".form");
const userNameField = formEditProfile.querySelector(
	".form__element_type_user-name"
);
const userStatusField = formEditProfile.querySelector(
	".form__element_type_user-status"
);

// Попап добавления карточки
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = popupAddCard.querySelector(".form");
const cardTitleField = formAddCard.querySelector(
	".form__element_type_card-title"
);
const cardImageField = formAddCard.querySelector(
	".form__element_type_card-image"
);

// Попап карточки
const cardPopup = document.querySelector(".popup_type_card");
const cardPopupImage = cardPopup.querySelector(".popup__image");
const cardPopupCaption = cardPopup.querySelector(".popup__caption");

/* --- ПОПАПЫ --- */
const openPopup = (popup) => {
	popup.classList.add("popup_opened");
	popup.addEventListener("click", closePopupHandler);
	document.addEventListener("keydown", closePopupHandler);
};

const closePopup = (popup) => {
	popup.classList.remove("popup_opened");
	popup.removeEventListener("click", closePopupHandler);
	document.removeEventListener("keydown", closePopupHandler);
};

const insertInfoInField = () => {
	userNameField.value = userName.textContent;
	userStatusField.value = userStatus.textContent;
};

const insertUserInfoFromField = () => {
	userName.textContent = userNameField.value;
	userStatus.textContent = userStatusField.value;
};

const wipeFormField = (field) => {
	field.value = "";
};

const insertCardInfo = (evt) => {
	cardPopupImage.src = evt.target.src;
	cardPopupImage.alt = evt.target.alt;
	cardPopupCaption.textContent = evt.target.alt;
};

const openEditProfilePopup = () => {
	openPopup(popupEditProfile);
	insertInfoInField();
	formEditProfile.addEventListener("submit", submitFormEditProfile);
};

const openAddCardPopup = () => {
	openPopup(popupAddCard);
	formAddCard.addEventListener("submit", submitFormAddCard);
};

const openCardPopup = (evt) => {
	openPopup(cardPopup);
	insertCardInfo(evt);
};

const submitFormEditProfile = (evt) => {
	evt.preventDefault();
	closePopup(popupEditProfile);
	insertUserInfoFromField();
};

const submitFormAddCard = (evt) => {
	evt.preventDefault();
	closePopup(popupAddCard);
	renderElement(
		cardsContainer,
		createCard(".card-template", cardTitleField.value, cardImageField.value)
	);
	wipeFormField(cardTitleField);
	wipeFormField(cardImageField);
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
