const checkLikeStatus = (likes, userId) => {
	return likes.some((like) => {
		return like._id === userId;
	});
};

export const likeCard = (data, likeButton, likeCounter) => {
	likeButton.classList.add("card__like-button_active");
	likeCounter.textContent = data.likes.length;
};

export const dislikeCard = (data, likeButton, likeCounter) => {
	likeButton.classList.remove("card__like-button_active");
	likeCounter.textContent = data.likes.length;
};

const updateLikeButtonStatus = (likeStatus, likeButton) => {
	if (likeStatus) {
		likeButton.classList.add("card__like-button_active");
	} else {
		likeButton.classList.remove("card__like-button_active");
	}
};

const hideDeleteButton = (deleteButton, cardAuthorId, userId) => {
	if (cardAuthorId !== userId) {
		deleteButton.classList.add("card__delete-button_disabled");
	}
};

export const removeCard = (deleteButton) => {
	deleteButton.closest(".card").remove();
};

export const createCard = (
	templateSelector,
	cardSelector,
	title,
	imageLink,
	handlePictureClick,
	handleDeleteCard,
	handleLikeEvent,
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
	let likeStatus = checkLikeStatus(likes, userId);

	cardImage.src = imageLink;
	cardImage.alt = title;
	cardTitle.textContent = title;
	likeCounter.textContent = likes.length;

	hideDeleteButton(deleteButton, cardAuthorId, userId);
	updateLikeButtonStatus(likeStatus, likeButton);

	likeButton.addEventListener("click", () => {
		handleLikeEvent(likeStatus, likeButton, cardId, likeCounter);
		likeStatus = !likeStatus;
	});

	deleteButton.addEventListener("click", () => {
		handleDeleteCard(deleteButton, cardId);
	});

	cardImage.addEventListener("click", () => {
		handlePictureClick(imageLink, title);
	});

	return cardElement;
};

export const renderElement = (container, element) => {
	container.prepend(element);
};
