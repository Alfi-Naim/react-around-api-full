import api from "../utils/api.js";

//export const BASE_URL = "http://localhost:3001";
export const BASE_URL = "https://api.alfons.students.nomoreparties.sbs";

export const checkToken = (token) => {
  // console.log("token: " + token);
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }).then(api._handleResponse);
}

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  }).then(api._handleResponse);
}

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password })
  }).then(api._handleResponse);
}