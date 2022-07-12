class Api {
    
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    getHeaders() {
        const token = localStorage.getItem('jwt');
        return  {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    
    _handleResponse = res => {
        return (res.ok) ? res.json() : Promise.reject(`Error code: ${res.status},Error text: ${res.statusText}`);
    }

    loadUserInfo = () => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this.getHeaders(),
        }).then(this._handleResponse);
    }

    setUserInfo = (values) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.getHeaders(),
            body: JSON.stringify({
                name: values.name,
                about: values.about
            })
        }).then(this._handleResponse);
    }

    setUserAvatar = ({link}) => {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.getHeaders(),
            body:  JSON.stringify({
                avatar: link
            })
        }).then(this._handleResponse);
    }

    loadCards = () => {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this.getHeaders(),
        }).then(this._handleResponse);
    }

    addCard = (values) => {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify({
                name: values.name,
                link: values.link
            })
        }).then(this._handleResponse);
    } 

    deleteCard = (cardId) => {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.getHeaders()
        }).then(this._handleResponse);
    }

    addLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.getHeaders()
        }).then(this._handleResponse);
    }

    removeLike = (cardId) => {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.getHeaders()
        }).then(this._handleResponse);
    }

    changeLikeCardStatus = (cardId, liked) => {
        return liked? this.addLike(cardId) : this.removeLike(cardId);
    }
}

const api = new Api({
    // baseUrl: 'http://localhost:3001',
    // baseUrl: 'https://api.alfons.students.nomoreparties.sbs',
    baseUrl: 'https://api.alfi-usa.students.nomoreparties.sbs',
});

export default api;
