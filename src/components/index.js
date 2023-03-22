import {
  validationConfig,
  apiConfig,
  cardsContainer,
  userAvatar,
  userName,
  userStatus,
  buttonAddCard,
  popupEditUserInfo,
  formEditUserInfo,
  userNameField,
  userStatusField,
  popupAddCard,
  formAddCard,
  cardTitleField,
  cardImageField,
  popupEditUserAvatar,
  formEditUserAvatar,
  userAvatarImageFiled,
  buttonEditUserAvatar,
  buttonEditUserInfo,
  editUserInfoSubmitButton,
  addCardSubmitButton,
  editUserAvatarSubmitButton,
} from "./constants.js";
import Api from "./api.js";
import { enableValidation, resetValidation } from "./validate.js";
import {
  createCard,
  renderElement,
  removeCard,
  likeCard,
  dislikeCard,
} from "./card.js";
import { openPopup, closePopup, openCardPopup } from "./modal.js";
import "../pages/index.css";

let userId;

const api = new Api(apiConfig);

const fillUserInfoForm = () => {
  userNameField.value = userName.textContent;
  userStatusField.value = userStatus.textContent;
};

const changeUserInfo = () => {
  userName.textContent = userNameField.value;
  userStatus.textContent = userStatusField.value;
};

const changeUserAvatar = () => {
  userAvatar.src = userAvatarImageFiled.value;
};

const openEditUserInfoPopup = () => {
  fillUserInfoForm();
  resetValidation(formEditUserInfo, validationConfig);
  openPopup(popupEditUserInfo);
};

const openAddCardPopup = () => {
  resetValidation(formAddCard, validationConfig);
  formAddCard.reset();
  openPopup(popupAddCard);
};

const openEditUserAvatarPopup = () => {
  resetValidation(formEditUserAvatar, validationConfig);
  formEditUserAvatar.reset();
  openPopup(popupEditUserAvatar);
};

const submitFormEditUserInfo = (evt) => {
  evt.preventDefault();
  editUserInfoSubmitButton.textContent = "Сохранение...";
  api
    .updateUserInfo(userNameField.value, userStatusField.value)
    .then(() => {
      changeUserInfo();
      closePopup(popupEditUserInfo);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editUserInfoSubmitButton.textContent = "Сохранить";
    });
};

const submitFormAddCard = (evt) => {
  evt.preventDefault();
  addCardSubmitButton.textContent = "Сохранение...";
  api
    .loadCard(cardTitleField.value, cardImageField.value)
    .then((card) => {
      renderElement(
        cardsContainer,
        createCard(
          ".card-template",
          ".card",
          cardTitleField.value,
          cardImageField.value,
          openCardPopup,
          deleteCardHandler,
          likeEventHandler,
          card._id,
          userId,
          card.owner._id,
          card.likes
        )
      );
      closePopup(popupAddCard);
      formAddCard.reset();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      addCardSubmitButton.textContent = "Создать";
    });
};

const submitFormEditUserAvatar = (evt) => {
  evt.preventDefault();
  editUserAvatarSubmitButton.textContent = "Сохранение";
  api
    .updateAvatar(userAvatarImageFiled.value)
    .then(() => {
      changeUserAvatar();
      closePopup(popupEditUserAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      editUserAvatarSubmitButton.textContent = "Сохранить";
    });
};

const deleteCardHandler = (deleteButton, cardId) => {
  api
    .deleteCard(cardId)
    .then(() => {
      removeCard(deleteButton);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

const likeEventHandler = (likeStatus, likeButton, cardId, likeCounter) => {
  if (likeStatus) {
    api.removeLikeCard(cardId).then((data) => {
      dislikeCard(data, likeButton, likeCounter);
    });
  } else {
    api.addLikeCard(cardId).then((data) => {
      likeCard(data, likeButton, likeCounter);
    });
  }
};

/* - Стартовые карточки - */
const loadAllInfo = () => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cardsList]) => {
      userId = user._id;
      userName.textContent = user.name;
      userStatus.textContent = user.about;
      userAvatar.src = user.avatar;
      cardsList.reverse();
      cardsList.forEach((card) => {
        renderElement(
          cardsContainer,
          createCard(
            ".card-template",
            ".card",
            card.name,
            card.link,
            openCardPopup,
            deleteCardHandler,
            likeEventHandler,
            card._id,
            user._id,
            card.owner._id,
            card.likes
          )
        );
      });
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
};

loadAllInfo();

/* - Вызов стартовых слушателей - */
buttonEditUserInfo.addEventListener("click", openEditUserInfoPopup);
buttonAddCard.addEventListener("click", openAddCardPopup);
buttonEditUserAvatar.addEventListener("click", openEditUserAvatarPopup);
formAddCard.addEventListener("submit", submitFormAddCard);
formEditUserInfo.addEventListener("submit", submitFormEditUserInfo);
formEditUserAvatar.addEventListener("submit", submitFormEditUserAvatar);

/* - Валидация - */
enableValidation(validationConfig);
