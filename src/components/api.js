// ИМПОРТ ИЗ UTIL.JS
import { cohortId, token } from "./constants.js";

// КОНФИГ ДЛЯ ЗАПРОСОВ
const config = {
	baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
	headers: {
		authorization: token,
		"Content-Type": "application/json",
	},
};

// ПРОВЕРИТЬ ОТВЕТ
const getResponseData = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// ОТПРАВИТЬ ЗАПРОС
const sendRequest = (url, method, body = null) => {
	return fetch(`${config.baseUrl}/${url}`, {
		method: method,
		headers: config.headers,
		body: body,
	}).then(getResponseData);
};

// ПОЛУЧИТЬ ИНФОРМАЦИЮ О ЮЗЕРЕ
export const getUserInfo = () => {
	return sendRequest(`users/me`, "GET");
};

// ПОЛУЧИТЬ КАРТОЧКИ
export const getInitialCards = () => {
	return sendRequest(`cards`, "GET");
};

// ОБНОВИТЬ ИНФОРМАЦИЮ О ЮЗЕРЕ
export const updateUserInfo = (name, about) => {
	const body = JSON.stringify({
		name: name,
		about: about,
	});
	return sendRequest(`users/me`, "PATCH", body);
};

// ОБНОВИТЬ АВАТАР ЮЗЕРА
export const updateAvatar = (avatar) => {
	const body = JSON.stringify({
		avatar: avatar,
	});
	return sendRequest(`users/me/avatar`, "PATCH", body);
};

// ЗАГРУЗИТЬ КАРТОЧКУ
export const loadCard = (name, link) => {
	const body = JSON.stringify({
		name: name,
		link: link,
	});
	return sendRequest(`cards`, "POST", body);
};

// УДАЛИТЬ КАРТОЧКУ
export const deleteCard = (cardId) => {
	return sendRequest(`cards/${cardId}`, "DELETE");
};

// ДОБАВИТЬ ЛАЙК КАРТОЧКЕ
export const addLikeCard = (cardId) => {
	return sendRequest(`cards/likes/${cardId}`, `PUT`);
};

// УБРАТЬ ЛАЙК У КАРТОЧКИ
export const removeLikeCard = (cardId) => {
	return sendRequest(`cards/likes/${cardId}`, `DELETE`);
};
