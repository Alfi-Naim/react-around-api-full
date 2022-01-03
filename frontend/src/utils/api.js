class Api {
    
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    
    _handleResponse = res => {
        return (res.ok) ? res.json() : Promise.reject(`Error code: ${res.status},Error text: ${res.statusText}`);
    }

    loadUserInfo = () => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._handleResponse);
    }

    setUserInfo = (values) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: values.name,
                about: values.about
            })
        }).then(this._handleResponse);
    }

    setUserAvatar = ({link}) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body:  JSON.stringify({
                avatar: link
            })
        }).then(this._handleResponse);
    }

    loadCards = () => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._handleResponse);
    }

    addCard = (values) => {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: values.name,
                link: values.link
            })
        }).then(this._handleResponse);
    } 

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._handleResponse);
    }

    addLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers
        }).then(this._handleResponse);
    }

    removeLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        }).then(this._handleResponse);
    }

    changeLikeCardStatus = (cardId, liked) => {
        return liked? this.addLike(cardId) : this.removeLike(cardId);
    }
 
}

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "f96b71f1-1b6f-4f5f-ab42-e21faff2d782",
        "Content-Type": "application/json"
    }
});

export default api;
