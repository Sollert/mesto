export default class Alert {
  constructor(alertSelector, alertConfig) {
    this._alertItem = document.querySelector(alertSelector);
    this._alertCloseButton = this._alertItem.querySelector(alertConfig.alertCloseButtonSelector);
    this._alertMessage = this._alertItem.querySelector(alertConfig.alertMessageSelector);
    this._alertOpenedClass = alertConfig.alertOpenedClass;
  }

  openAlert(message) {
    this._alertMessage.textContent = message
    this._alertItem.classList.add(this._alertOpenedClass);
  }

  _closeAlert() {
    this._alertMessage.textContent = ''
    this._alertItem.classList.remove(this._alertOpenedClass);
  }

  setEventListeners() {
    this._alertCloseButton.addEventListener('click', () => {
      this._closeAlert();
    })
  }
}