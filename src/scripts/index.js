import "../styles/index.css";
import {
  validationConfig,
  cardConfig,
  popupConfig,
  userConfig,
  apiConfig,
  alertConfig,
  buttonAddCard,
  formEditUserInfo,
  formAddCard,
  formEditUserAvatar,
  buttonEditUserAvatar,
  buttonEditUserInfo
} from "./utils/constants.js";
import Api from "./components/Api.js";
import FormValidator from "./components/FormValidator.js";
import Section from './components/Section.js';
import Card from './components/Card.js';
import UserInfo from './components/UserInfo.js'
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithConfirmation from './components/PopupWithConfirmation.js';
import Alert from './components/Alert.js';

const api = new Api(apiConfig);
const userInfo = new UserInfo(userConfig);

const createCard = (userId, cardData) => {
  const newCard = new Card(
    cardData,
    cardConfig,
    userId,
    handleCardDelete,
    handleCardLike,
    openCardPopup
  );
  const cardElement = newCard.generate();
  return cardElement;
};

// Экземпляр класса Section
const cardSection = new Section('.cards', {
  renderer: (userId, cardData) => createCard(userId, cardData),
});

// Экземпляр класса Alert
const errorAlert = new Alert('.alert_type_error', alertConfig);
errorAlert.setEventListeners();

// Экземпляр класса PopupWithImage
const cardPopup = new PopupWithImage('.popup_type_card', popupConfig);
cardPopup.setEventListeners();

// Экземпляр класса PopupWithForm
const avatarPopup = new PopupWithForm('.popup_type_edit-user-avatar', popupConfig, {
  submitCallbackForm: async (formValues) => {
    try {
      const res = await api.updateAvatar(formValues.avatar);
      userInfo.setUserAvatar(res.avatar);
    } catch (err) {
      errorAlert.openAlert(err);
      console.log(err);
    }
  },
});
avatarPopup.setEventListeners();

// Экземпляр класса PopupWithForm
const profilePopup = new PopupWithForm('.popup_type_profile', popupConfig, {
  submitCallbackForm: async (formValues) => {
    try {
      const res = await api.updateUserInfo(
        formValues.name,
        formValues.about
      );
      userInfo.setUserInfo(res.name, res.about);
    } catch (err) {
      errorAlert.openAlert(err);
      console.log(err);
    }
  },
});
profilePopup.setEventListeners();

// Экземпляр класса PopupWithForm
const addCardPopup = new PopupWithForm('.popup_type_add-card', popupConfig, {
  submitCallbackForm: async (formValues) => {
    try {
      const cardData = await api.loadCard(
        formValues.cardTitle,
        formValues.cardImage
      );
      const newCard = cardSection.renderItem(cardData.owner._id, cardData);
      cardSection.setItem(newCard);
    } catch (err) {
      errorAlert.openAlert(err);
      console.log(err);
    }
  },
});
addCardPopup.setEventListeners();

// Экземпляр класса PopupWithConfirmation
const deleteCardPopup = new PopupWithConfirmation(
  '.popup_type_delete-card',
  popupConfig,
  {
    submitCallbackForm: async (card) => {
      try {
        const res = await api.deleteCard(card._cardId);
        card.removeCard(res);
      } catch (err) {
        errorAlert.openAlert(err);
        console.log(err);
      }
    },
  }
);
deleteCardPopup.setEventListeners();

const editUserInfoFormValidator = new FormValidator(validationConfig, formEditUserInfo);
const editAvatarFormValidator = new FormValidator(validationConfig, formEditUserAvatar);
const addCardFormValidator = new FormValidator(validationConfig, formAddCard);


// Добавление и удаление лайка
const handleCardLike = (card) => {
  if (card._likeStatus) {
    api
      .removeLikeCard(card._cardId)
      .then((res) => {
        card.toggleLike(res);
      })
      .catch((err) => {
        errorAlert.openAlert(err);
        console.log(err);
      });
  } else {
    api
      .addLikeCard(card._cardId)
      .then((res) => {
        card.toggleLike(res);
      })
      .catch((err) => {
        errorAlert.openAlert(err);
        console.log(err);
      });
  }
};

const handleCardDelete = (card) => {
  deleteCardPopup.openPopup();
  deleteCardPopup.setCard(card);
};

// Отрисовка элементов на странице
async function renderElements() {
  try {
    const [profile, cards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);
    userInfo.setUserInfo(profile.name, profile.about);
    userInfo.setUserAvatar(profile.avatar);
    cards.reverse().forEach((card) => {
      const newCard = cardSection.renderItem(profile._id, card);
      cardSection.setItem(newCard);
    });
  } catch (err) {
    errorAlert.openAlert(err);
    console.log(err);
  }
}

renderElements();

// Открытие попапа с изменением информации в профиле
buttonEditUserInfo.addEventListener('click', () => {
  editUserInfoFormValidator.resetValidation();
  const data = userInfo.getUserInfo();
  profilePopup.setInputValues(data);
  profilePopup.openPopup();
});

// Открытие попапа с добавлением картинок
buttonAddCard.addEventListener('click', () => {
  addCardFormValidator.resetValidation();
  addCardPopup.openPopup();
});

// Открытие попапа с изменением изображения профиля
buttonEditUserAvatar.addEventListener('click', () => {
  editAvatarFormValidator.resetValidation();
  avatarPopup.openPopup();
});

// Открытие попапа с открытым изображением
const openCardPopup = (card) => {
  cardPopup.openPopup(card._cardTitleData, card._cardImageLink);
};

// Включение валидации для форм
editUserInfoFormValidator.enableValidation(apiConfig);
editAvatarFormValidator.enableValidation(apiConfig);
addCardFormValidator.enableValidation(apiConfig);