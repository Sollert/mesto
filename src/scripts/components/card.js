export default class Card {
  constructor(
    cardData,
    cardConfig,
    userId,
    handleDeleteButtonClick,
    handleLikeButtonClick,
    handleCardImageClick
  ) {
    this._cardTitleData = cardData.name;
    this._cardImageLink = cardData.link;
    this._cardId = cardData._id;
    this._cardLikes = cardData.likes;
    this._cardOwnerId = cardData.owner._id;

    this._cardTemplate = cardConfig.cardTemplate;
    this._cardSelector = cardConfig.cardSelector;
    this._cardImageSelector = cardConfig.cardImageSelector;
    this._cardTitleSelector = cardConfig.cardTitleSelector;
    this._deleteButtonSelector = cardConfig.deleteButtonSelector;
    this._deleteButtonDisabledClass = cardConfig.deleteButtonDisabledClass;
    this._likeButtonSelector = cardConfig.likeButtonSelector;
    this._likeButtonActiveClass = cardConfig.likeButtonActiveClass;
    this._cardLikesCounterSelector = cardConfig.cardLikesCounterSelector;
    this._cardLikesCounterActiveClass = cardConfig.cardLikesCounterActiveClass;

    this._userId = userId;

    this._likeStatus = this._checkLikeStatus();
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._handleCardImageClick = handleCardImageClick;
  }

  _checkLikeStatus() {
    return this._likes.some((like) => {
      return like._id === userId;
    });
  }

  toggleLike(res) {
    this._likes = res.likes;

    this._likeStatus
      ? this._likeButton.classList.remove(this._likeButtonActiveClass)
      : this._likeButton.classList.add(this._likeButtonActiveClass);

    this._likeCounter.textContent = this._likes.length;
  }

  _toggleLikeState() {
    this._likeStatus
      ? this._likeButton.classList.add(this._likeButtonActiveClass)
      : this._likeButton.classList.remove(this._likeButtonActiveClass);

    this._likeCounter.textContent = this._likes.length;
  }

  _hideDeleteButton() {
    if (this._cardOwnerId !== this._userId) {
      this._deleteButton.classList.add(this._deleteButtonDisabledClass);
    }
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click",  () => {
      this._handleLikeButtonClick
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardImageClick
    });
  }

  _createElement() {
    const cardElement = this._cardTemplate
      .querySelector(this._cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._createElement;
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._cardTitle = this._element.querySelector(this._cardTitleSelector);
    this._deleteButton = this._element.querySelector(
      this._deleteButtonSelector
    );

    this._likeButton = this._element.querySelector(this._likeButtonSelector);
    this._cardLikesCounter = this._element.querySelector(
      this._cardLikesCounterSelector
    );

    this._cardTitle.textContent = this._cardTitleData;
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardTitleData;

    this._hideDeleteButton();
    this._toggleLikeState();
    this._setEventListeners();

    return this._element;
  }
}