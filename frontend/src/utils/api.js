//класс для работы с сервером

class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  //универсальный метод для каждой отправки на сервер, проверяющий запрос
  _checkResponse(res) { return res.ok ? res.json() : Promise.reject }

  //отправка запроса на сервер для получения информации пользователя
  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  //отправка запроса на сервер для получения картинок
  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo(inputsValue, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: inputsValue.username,
        about: inputsValue.job,
      })
    })
      .then(this._checkResponse)
  }

  setNewAvatar(inputsValue, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: inputsValue.avatar,

      })
    })
      .then(this._checkResponse)
  }

  addCard(inputsValue, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: inputsValue.title,
        link: inputsValue.link
      })
    })
      .then(this._checkResponse)
  }

  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(this._checkResponse)
  }
}

// экземпляр класса Api
const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
