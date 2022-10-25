const popup = document.querySelector('.popup');
const buttonOpenPopup = document.querySelector('.user__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

buttonOpenPopup.addEventListener('click', function () {
  popup.classList.add('popup_opened');
})

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
})