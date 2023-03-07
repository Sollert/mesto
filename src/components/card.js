import { addLikeCard, deleteCard, loadCard, removeLikeCard } from "./api.js";

const hideDeleteButton = (deleteButton, cardAuthorId, userId) => {
	if (cardAuthorId !== userId) {
		deleteButton.classList.add("card__delete-button_disabled");
	}
};

const isLiked = (likes, likeButton, userId) => {
	likes.forEach((like) => {
		if (like._id === userId) {
			likeButton.classList.add("card__like-button_active");
		} else {
			likeButton.classList.remove("card__like-button_active");
		}
	});
};

const likeCard = (likeButton, cardId, likeCounter) => {
	addLikeCard(cardId)
		.then((data) => {
			likeButton.classList.add("card__like-button_active");
			likeCounter.textContent = data.likes.length;
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
};

const dislikeCard = (likeButton, cardId, likeCounter) => {
	removeLikeCard(cardId)
		.then((data) => {
			likeButton.classList.remove("card__like-button_active");
			likeCounter.textContent = data.likes.length;
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`);
		});
};

const likeEvent = (likeButton, cardId, likeCounter, userId) => {
	likeButton.addEventListener("click", () => {
		if (!likeButton.classList.contains("card__like-button_active")) {
			likeCard(likeButton, cardId, likeCounter, userId);
		} else {
			dislikeCard(likeButton, cardId, likeCounter, userId);
		}
	});
};

const removeCard = (deleteButton, cardId) => {
	deleteButton.addEventListener("click", () => {
		deleteCard(cardId)
			.then(() => {
				deleteButton.closest(".card").remove();
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			});
	});
};

export const createCard = (
	templateSelector,
	cardSelector,
	title,
	imageLink,
	handlePictureClick,
	cardId,
	userId,
	cardAuthorId,
	likes
) => {
	const cardTemplate = document
		.querySelector(templateSelector)
		.content.querySelector(cardSelector);
	const cardElement = cardTemplate.cloneNode(true);
	const cardImage = cardElement.querySelector(".card__image");
	const cardTitle = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");
	const deleteButton = cardElement.querySelector(".card__delete-button");
	const likeCounter = cardElement.querySelector(".card__like-counter");

	cardImage.src = imageLink;
	cardImage.alt = title;
	cardTitle.textContent = title;
	likeCounter.textContent = likes.length;

	cardImage.addEventListener("click", handlePictureClick);
	isLiked(likes, likeButton, userId);
	hideDeleteButton(deleteButton, cardAuthorId, userId);
	likeEvent(likeButton, cardId, likeCounter, userId);
	removeCard(deleteButton, cardId);

	return cardElement;
};

export const renderElement = (container, element) => {
	container.prepend(element);
};
