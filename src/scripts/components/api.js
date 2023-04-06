export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _sendRequest(url, method, body = null) {
    return fetch(`${this._baseUrl}/${url}`, {
      method: method,
      headers: this._headers,
      body: body,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return this._sendRequest(`users/me`, "GET");
  }

  getInitialCards() {
    return this._sendRequest(`cards`, "GET");
  }

  updateUserInfo(name, about) {
    const body = JSON.stringify({
      name: name,
      about: about,
    });
    return this._sendRequest(`users/me`, "PATCH", body);
  }

  updateAvatar(avatar) {
    const body = JSON.stringify({
      avatar: avatar,
    });
    return this._sendRequest(`users/me/avatar`, "PATCH", body);
  }

  loadCard(name, link) {
    const body = JSON.stringify({
      name: name,
      link: link,
    });
    return this._sendRequest(`cards`, "POST", body);
  }

  deleteCard(cardId) {
    return this._sendRequest(`cards/${cardId}`, "DELETE");
  }

  addLikeCard(cardId) {
    return this._sendRequest(`cards/likes/${cardId}`, `PUT`);
  }

  removeLikeCard(cardId) {
    return this._sendRequest(`cards/likes/${cardId}`, `DELETE`);
  }
}
