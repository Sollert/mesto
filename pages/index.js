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
  popup.classList.add('popup_opened')
  setClosePopupHandler(document, 'keydown', popup)
  setClosePopupHandler(popup, 'click', popup)
  setClosePopupHandler(popupCloseButton, 'click', popup)

  if (popup === popupAddCard || popup === popupEditProfile) {
    const popupSaveButton = popup.querySelector('.form__save-button')
    saveButtonHandler(popupSaveButton, 'click', popup)
  }
}

// закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened')
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

    evt.preventDefault()
    closePopup(popup)

    if (popup === popupEditProfile) {
      insertUserInfoFromField()
    }

    if (popup === popupAddCard) {
      renderElement(cardsContainer, createCard('.card-template', cardTitleField.value, cardImageField.value))
      cardTitleField.value = ''
      cardImageField.value = ''
    }
    this.removeEventListener(action, saveInfo)
  })
}

// обработчик открытия попапа
const setOpenPopupHandler = (button, action, popup) => {
  button.addEventListener(action, () => {
    openPopup(popup)

    if (popup === cardPopup) {
      cardPopupImage.src = button.src
      cardPopupCaption.textContent = button.nextElementSibling.textContent
    }

    if (popup === popupEditProfile) {
      insertInfoInField(userNameField, userName.textContent)
      insertInfoInField(userStatusField, userStatus.textContent)
    }
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
const setClosePopupHandler = (button, action, popup) => {
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
  const likeButton = cardElement.querySelector('.card__like-button')
  const deleteButton = cardElement.querySelector('.card__delete-button')

  cardImage.src = link
  cardImage.alt = title
  cardTitle.textContent = title

  setOpenPopupHandler(cardImage, 'click', cardPopup)
  setLikeCardHandle(likeButton, 'click')
  setDeleteCardHandle(deleteButton, 'click')

  return cardElement
}

// рендер элемента
const renderElement = (container, element) => {
  container.prepend(element)
}

// добавить слушатель лайка карточки
const setLikeCardHandle = (button, action) => {
  button.addEventListener(action, function (evt) {
    evt.target.classList.toggle('card__like-button_active')
  })
}

// добавить слушатель удаления карточки
const setDeleteCardHandle = (button, action) => {
  button.addEventListener(action, function (evt) {
    evt.target.closest('.card').remove()
  })
}


// загрузить стартовые карточки из коробки
initialCards.forEach(card => {
  renderElement(cardsContainer, createCard('.card-template', card.name, card.link))
})

// стартовые слушатели
setOpenPopupHandler(buttonEditProfile, 'click', popupEditProfile) // На кнопку редактирования профиля
setOpenPopupHandler(buttonAddCard, 'click', popupAddCard) // На кнопку добавления карточки