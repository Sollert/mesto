const likeCard = (evt) => {
	evt.target.classList.toggle("card__like-button_active");
};

const deleteCard = (evt) => {
	evt.target.closest(".card").remove();
};

export const createCard = (
	templateSelector,
	cardSelector,
	title,
	link,
	handlePictureClick
) => {
	const cardTemplate = document
		.querySelector(templateSelector)
		.content.querySelector(cardSelector);
	const cardElement = cardTemplate.cloneNode(true);
	const cardImage = cardElement.querySelector(".card__image");
	const cardTitle = cardElement.querySelector(".card__title");
	const likeButton = cardElement.querySelector(".card__like-button");
	const deleteButton = cardElement.querySelector(".card__delete-button");

	cardImage.src = link;
	cardImage.alt = title;
	cardTitle.textContent = title;

	cardImage.addEventListener("click", handlePictureClick);
	likeButton.addEventListener("click", likeCard);
	deleteButton.addEventListener("click", deleteCard);

	return cardElement;
};

export const renderElement = (container, element) => {
	container.prepend(element);
};
