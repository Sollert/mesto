const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsContainer = document.querySelector('.cards');

const popupEditProfile = document.querySelector('.popup_theme_edit-profile');
const popupAddCard = document.querySelector('.popup_theme_add-card');
const cardPopup = document.querySelector('.popup_theme_show-card');
const cardPopupImage = cardPopup.querySelector('.popup__image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');

const buttonAddCard = document.querySelector('.add-card-button')
const buttonEditProfile = document.querySelector('.user__edit-button')



// открыть попап
const openPopup = (popup) => {
  const popupCloseButton = popup.querySelector('.popup__close-button')
  popup.classList.add('popup_opened')
  addClosePopupHandler(document, 'keydown', popup)
  addClosePopupHandler(popup, 'click', popup)
  addClosePopupHandler(popupCloseButton, 'click', popup)
}

// закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
}

// создать попап карточки
const createCardPopup = (button) => {
  cardPopupImage.src = button.src
  cardPopupCaption.textContent = button.nextElementSibling.textContent
}

// обработчик открытия попапа
const addOpenPopupHandler = (button, action, popup) => {
  if (popup === cardPopup) {
    createCardPopup(button)
  }

  button.addEventListener(action, () => {
    openPopup(popup)
  })
}

// обработчик закрытия попапа
const handleClosePopup = (evt, popup) => {
    if (evt.key === 'Escape' ||
      !evt.key && (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')))
    {
      closePopup(popup)
    }
}

// добавить обработчик закрытия попапа
const addClosePopupHandler = (button, action, popup) => {
  button.addEventListener(action, function closePopupHandler(evt) {
    handleClosePopup(evt, popup)
    this.removeEventListener(action, closePopupHandler)
  })
}

addOpenPopupHandler(buttonEditProfile, 'click', popupEditProfile)
addOpenPopupHandler(buttonAddCard, 'click', popupAddCard)


// Создать карточку
function createCard(templateSelector, title, link) {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title')

  cardImage.src = link
  cardImage.alt = title
  cardTitle.textContent = title

  addOpenPopupHandler(cardImage, 'click', cardPopup)

  return cardElement
}

// Рендер элемента
function renderElement(container, element) {
  container.prepend(element)
}

// Загрузить стартовые карточки из коробки
initialCards.forEach(card => {
  renderElement(cardsContainer, createCard('.card-template', card.name, card.link))
})