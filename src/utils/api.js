export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Get User Info
  getUserInformation() {
    const userInfo = fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    return userInfo;
  }

  // Get All Cards
  getCards() {
    const cards = fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cards) => {
        return Promise.resolve(cards);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    return cards;
  }

  // Update Profile
  updateProfile(saveButton ,name, about) {
    fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {
        saveButton.textContent = "Done";
      })
  }

  updateProfilePicture(saveButton, avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((profile) => {
      return Promise.resolve(profile.avatar);
    })
    .catch((err) => {
      return Promise.reject(err);
    })
    .finally(() => {
      saveButton.textContent = "Simpan";
    })
  }

  addCard(saveButton, name, link) {
    const newCard = fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((newCard) => {
        return Promise.resolve(newCard);
      })
      .catch((err) => {
        return Promise.reject(err);
      })
      .finally(() => {
        saveButton.textContent = "Simpan";
      })
    return newCard;
  }

  deleteCard(cardId) {
    fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.unlikeCard(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cardData) => {
        return Promise.resolve(cardData);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  unlikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((cardData) => {
        return Promise.resolve(cardData);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_id_03",
  headers: {
    authorization: "8746c452-39d4-4cd4-8e82-ac5a93e07813",
    "Content-Type": "application/json",
  },
});