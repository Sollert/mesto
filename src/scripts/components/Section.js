export default class Section {
  constructor(containerSelector, {renderer}) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItem(userData, cardData) {
    return this._renderer(userData, cardData)
  }
}