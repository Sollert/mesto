import {
	validationConfig,
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
import {
	getUserInfo,
	getInitialCards,
	updateUserInfo,
	updateAvatar,
	loadCard,
} from "./api.js";
import "../pages/index.css";

let userId;

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

const submitFormEditUserInfo = (evt) => {
	evt.preventDefault();
	updateUserInfo(userNameField.value, userStatusField.value)
		.then((res) => {
			changeUserInfo();
			closePopup(popupEditProfile);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
};

const submitFormAddCard = (evt) => {
	evt.preventDefault();
	Promise.all([
		getUserInfo(),
		loadCard(cardTitleField.value, cardImageField.value),
	])
		.then(([user, card]) => {
			renderElement(
				cardsContainer,
				createCard(
					".card-template",
					".card",
					cardTitleField.value,
					cardImageField.value,
					openCardPopup,
					card._id,
					user._id,
					card.owner._id,
					card.likes
				)
			);
			closePopup(popupAddCard);
			formAddCard.reset();
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
};

const submitFormEditUserAvatar = (evt) => {
	evt.preventDefault();
	updateAvatar(userAvatarImageFiled.value)
		.then((res) => {
			changeUserAvatar();
			closePopup(popupEditUserAvatar);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
};

/* - Стартовые карточки - */
const loadAllInfo = () => {
	Promise.all([getUserInfo(), getInitialCards()])
		.then(([user, cardsList]) => {
			userId = user._id;
			userName.textContent = user.name;
			userStatus.textContent = user.about;
			userAvatar.src = user.avatar;
			cardsList.reverse();
			cardsList.forEach((card) => {
				renderElement(
					cardsContainer,
					createCard(
						".card-template",
						".card",
						card.name,
						card.link,
						openCardPopup,
						card._id,
						user._id,
						card.owner._id,
						card.likes
					)
				);
			});
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
};

loadAllInfo();

/* - Вызов стартовых слушателей - */
buttonEditProfile.addEventListener("click", openEditProfilePopup);
buttonAddCard.addEventListener("click", openAddCardPopup);
buttonEditUserAvatar.addEventListener("click", openEditUserAvatarPopup);
formAddCard.addEventListener("submit", submitFormAddCard);
formEditProfile.addEventListener("submit", submitFormEditUserInfo);
formEditUserAvatar.addEventListener("submit", submitFormEditUserAvatar);

/* - Валидация - */
enableValidation(validationConfig);
