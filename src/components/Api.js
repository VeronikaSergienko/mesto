export class Api {
    constructor({ baseUrl }) {
      this._url = baseUrl;
    }

    // получение данных о пользователе
    getUserInfoApi() {
      return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: {
        authorization: 'a5c762bc-210a-4e68-9fc7-978e4674d050'
      }
      })
      .then(res => res.json())
      .then((result) => {
        return result;
      }); 
    }

    // публичный метод для получения массива карточек с сервера
    getInitialCardsApi() {
      return fetch(`${this._url}cards`, {
        headers: {
          authorization: 'a5c762bc-210a-4e68-9fc7-978e4674d050'
        }
      })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    });
    }

    // отправка обновлённых данных о пользователе на сервер
  patchUserInfo({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
      authorization: 'a5c762bc-210a-4e68-9fc7-978e4674d050',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    name: name,
    about: about,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
      }
    // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  //  отправка ссылки на новый аватар
  patchUserAvatar( { avatar: link } ) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
      authorization: 'a5c762bc-210a-4e68-9fc7-978e4674d050',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    avatar: link,
    })
    })
    .then((res) => {
    if (res.ok) {
      return res.json();
      }
    // если ошибка, отклоняем промис
     return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // запрос на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'a5c762bc-210a-4e68-9fc7-978e4674d050',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
       return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

    // добавление и удаление лайков
    toggleLikes(cardId, isLikes) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            method: isLikes ? 'DELETE' : 'PUT',
            headers: {
              authorization: 'a5c762bc-210a-4e68-9fc7-978e4674d050',
              'Content-Type': 'application/json'
            },
        })
             .then((res) => {
              if (res.ok) {
                return res.json();
              }
              // если ошибка, отклоняем промис
               return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    // метод для отправки данных карты
    postCard(item) {
       return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: {
              authorization: 'a5c762bc-210a-4e68-9fc7-978e4674d050',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: item.title,
              link: item.link,
            })

          })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            // если ошибка, отклоняем промис
             return Promise.reject(`Ошибка: ${res.status}`);
          })
    }
  }