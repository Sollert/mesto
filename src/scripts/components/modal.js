import { cardPopupImage, cardPopupCaption, cardPopup } from "../utils/constants.js";

export const openPopup = (popup) => {
	popup.classList.add("popup_opened");
	popup.addEventListener("mousedown", closePopupHandler);
	document.addEventListener("keydown", closePopupHandler);
};

export const closePopup = (popup) => {
	popup.classList.remove("popup_opened");
	popup.removeEventListener("mousedown", closePopupHandler);
	document.removeEventListener("keydown", closePopupHandler);
};

const fillCardPopupInfo = (image, caption) => {
	cardPopupImage.src = image;
	cardPopupImage.alt = caption;
	cardPopupCaption.textContent = caption;
};

export const openCardPopup = (image, caption) => {
	fillCardPopupInfo(image, caption);
	openPopup(cardPopup);
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
