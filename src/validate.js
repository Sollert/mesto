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

export const enableValidation = ({ formSelector, ...rest }) => {
	const formList = Array.from(document.querySelectorAll(formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, rest);
	});
};

export const resetValidation = (
	formElement,
	{ inputErrorClass, errorClass }
) => {
	const inputList = Array.from(formElement.querySelectorAll(".form__input"));
	inputList.forEach((inputElement) => {
		hideInputError(formElement, inputElement, inputErrorClass, errorClass);
	});
};
