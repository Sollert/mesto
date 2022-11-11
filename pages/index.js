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

const userNameField = popupEditProfile.querySelector('.form__element_theme_user-name')
const userStatusField = popupEditProfile.querySelector('.form__element_theme_user-status')

const userName = document.querySelector('.user__name')
const userStatus = document.querySelector('.user__status')

const cardTitleField = popupAddCard.querySelector('.form__element_theme_card-title')
const cardImageField = popupAddCard.querySelector('.form__element_theme_card-image')

// открыть попап
const openPopup = (popup) => {
  const popupCloseButton = popup.querySelector('.popup__close-button')
  const popupSaveButton = popup.querySelector('.form__save-button')
  popup.classList.add('popup_opened')
  addClosePopupHandler(document, 'keydown', popup)
  addClosePopupHandler(popup, 'click', popup)
  addClosePopupHandler(popupCloseButton, 'click', popup)
  saveButtonHandler(popupSaveButton, 'click', popup)
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

// подставить информацию в поле формы
const insertInfoInField = (field, value) => {
  field.value = value
}

// подставить информацию о юзере из формы
const insertUserInfoFromField = () => {
  userName.textContent = userNameField.value
  userStatus.textContent = userStatusField.value
}

// обработчик кнопки сохранения попапа
const saveButtonHandler = (button, action, popup) => {
  button.addEventListener(action, function saveInfo(evt) {
    if (popup === popupEditProfile) {
      insertUserInfoFromField()
      this.removeEventListener(action, saveInfo)
    }

    if (popup === popupAddCard) {
      evt.preventDefault()
      renderElement(cardsContainer, createCard('.card-template', cardTitleField.value, cardImageField.value))
    }

    evt.preventDefault()
    closePopup(popup)
  })
}

// обработчик открытия попапа
const addOpenPopupHandler = (button, action, popup) => {
  if (popup === cardPopup) {
    createCardPopup(button)
  }

  if (popup === popupEditProfile) {
    insertInfoInField(userNameField, userName.textContent)
    insertInfoInField(userStatusField, userStatus.textContent)
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

// создать карточку
const createCard = (templateSelector, title, link) => {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title')
  const like = cardElement.querySelector('.card__like-button')

  cardImage.src = link
  cardImage.alt = title
  cardTitle.textContent = title

  addOpenPopupHandler(cardImage, 'click', cardPopup)
  addLikeCardHandle(like, 'click')

  return cardElement
}

// рендер элемента
const renderElement = (container, element) => {
  container.prepend(element)
}

// добавить слушатель лайка карточки
const addLikeCardHandle = (button, action) => {
  button.addEventListener(action, function (evt) {
    evt.target.classList.toggle('card__like-button_active')
  })
}


// загрузить стартовые карточки из коробки
initialCards.forEach(card => {
  renderElement(cardsContainer, createCard('.card-template', card.name, card.link))
})

// стартовые слушатели
addOpenPopupHandler(buttonEditProfile, 'click', popupEditProfile) // На кнопку редактирования профиля
addOpenPopupHandler(buttonAddCard, 'click', popupAddCard) // На кнопку добавления карточки