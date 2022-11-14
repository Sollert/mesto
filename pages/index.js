/* --- ПЕРЕМЕННЫЕ --- */
// Карточки
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
]; // Массив стартовых карточек
const cardsContainer = document.querySelector('.cards'); // Контейнер для карточек

// Блок профиля
const profile = document.querySelector('.profile') // Профиль
const userName = profile.querySelector('.user__name'); // Имя юзера
const userStatus = profile.querySelector('.user__status'); // Статус юзера

// Кнопки для открытия попапов
const buttonAddCard = document.querySelector('.add-card-button'); // Для добавления карточки
const buttonEditProfile = document.querySelector('.user__edit-button'); // Для редактирования профиля

// Попапы
const popups = document.querySelectorAll('.popup');

// Попап редактирования профиля
const popupEditProfile = document.querySelector('.popup_type_profile'); // Сам попап
const formEditProfile = popupEditProfile.querySelector('.form'); // Форма редактирования профиля
const userNameField = formEditProfile.querySelector('.form__element_type_user-name'); // Поле имени
const userStatusField = formEditProfile.querySelector('.form__element_type_user-status'); // Поле статуса

// Попап добавления карточки
const popupAddCard = document.querySelector('.popup_type_add-card'); // Сам попап
const formAddCard = popupAddCard.querySelector('.form'); // Форма добавления карточки
const cardTitleField = formAddCard.querySelector('.form__element_type_card-title'); // Поле названия карточки
const cardImageField = formAddCard.querySelector('.form__element_type_card-image'); // Поле изображения карточки

// Попап карточки
const cardPopup = document.querySelector('.popup_type_card'); // Сам попап
const cardPopupImage = cardPopup.querySelector('.popup__image'); // Изображение
const cardPopupCaption = cardPopup.querySelector('.popup__caption'); // Подпись


/* --- ОБЩИЕ ФУНКЦИИ --- */
// Добавить слушатель
const setHandler = (button, action, method) => {
  button.addEventListener(action, method)
};

// Убрать слушатель
const removeHandler = (button, action, method) => {
  button.removeEventListener(action, method)
}


/* --- ПОПАПЫ --- */
// Открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  setHandler(popup, 'click', closePopupHandler)
};

// Закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  removeHandler(popup, 'click', closePopupHandler); // Убрать слушатель закрытия попапа
};

// Подставить информацию о юзере в поле формы
const insertInfoInField = () => {
  userNameField.value = userName.textContent;
  userStatusField.value = userStatus.textContent;
};

// Подставить информацию о юзере из формы
const insertUserInfoFromField = () => {
  userName.textContent = userNameField.value;
  userStatus.textContent = userStatusField.value;
};

// Стирание значения поля формы
const wipeFormField = (field) => {
  field.value = '';
};

// Подставить информацию о карточке в попап
const insertCardInfo = (evt) => {
  cardPopupImage.src = evt.target.src;
  cardPopupImage.alt = evt.target.alt;
  cardPopupCaption.textContent = evt.target.alt;
};

// Открыть попап редактирования профиля
const openEditProfilePopup = () => {
  openPopup(popupEditProfile);
  insertInfoInField();
  setHandler(formEditProfile, 'submit', submitFormEditProfile);
}

// Открыть попап добавления карточки
const openAddCardPopup = () => {
  openPopup(popupAddCard);
  setHandler(formAddCard, 'submit', submitFormAddCard);
};

// Открыть попап карточки
const openCardPopup = (evt) => {
  openPopup(cardPopup);
  insertCardInfo(evt);
};

// Отправить форму редактирования профиля
const submitFormEditProfile = (evt) => {
  evt.preventDefault();
  closePopup(popupEditProfile);
  insertUserInfoFromField();
}

// Отправить форму добавления карточки
const submitFormAddCard = (evt) => {
  evt.preventDefault();
  closePopup(popupAddCard);
  renderElement(cardsContainer, createCard('.card-template', cardTitleField.value, cardImageField.value));
  wipeFormField(cardTitleField);
  wipeFormField(cardImageField);
}

// Слушатель закрытия попапа
const closePopupHandler = (evt) => {
  if (evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.target.closest('.popup'));
  };
};


/* --- СОЗДАНИЕ КАРТОЧКИ --- */
// Лайкнуть карточку
const likeCard = (evt) => {
  evt.target.classList.toggle('card__like-button_active');
};

// Удалить карточку
const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
};

// Создать карточку
const createCard = (templateSelector, title, link) => {
  const cardTemplate = document.querySelector(templateSelector).content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;

  setHandler(cardImage, 'click', openCardPopup); // Добавить слушатель открытия попапа карточки
  setHandler(likeButton, 'click', likeCard); // Добавить слушатель лайка карточки
  setHandler(deleteButton, 'click', deleteCard); // Добавить слушатель удаления карточки

  return cardElement;
};

// Рендер элемента
const renderElement = (container, element) => {
  container.prepend(element);
};

// Загрузить стартовые карточки из коробки
initialCards.forEach(card => {
  renderElement(cardsContainer, createCard('.card-template', card.name, card.link));
});


/* --- ВЫЗОВ СТАРТОВЫХ СЛУШАТЕЛЕЙ --- */
setHandler(buttonEditProfile, 'click', openEditProfilePopup); // Кнопка открытия попапа редактирования профиля
setHandler(buttonAddCard, 'click', openAddCardPopup); // Кнопка открытия попапа добавления карточки