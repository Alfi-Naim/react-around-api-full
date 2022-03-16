import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import api from "../utils/api.js";
import ImagePopup from "./ImagePopup.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import * as auth from "../utils/auth";
import Login from "./Login .js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute"
import { useHistory } from "react-router";
import InfoTooltip from "./InfoTooltip.js";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
    const [infoPopupSuccess, setInfoPopupSuccess] = useState(false);
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const closePopupByEscape = (evt) => {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        };

        document.addEventListener("keydown", closePopupByEscape);
        return () => document.removeEventListener("keydown", closePopupByEscape);
    }, []);

    useEffect(() => {
        const closePopupByOutsideClick = (evt) => {
            if (evt.target.classList.contains("popup")) {
                closeAllPopups();
            }
        };

        document.addEventListener("click", closePopupByOutsideClick);
        return () => document.removeEventListener("keydown", closePopupByOutsideClick);
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(name, link) {
        setSelectedCard({
            name: name,
            link: link
        });
        setIsImagePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards(cards.filter((newCard) => newCard._id !== card._id))
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleUpdateUser({ name, about }) {
        api.setUserInfo({ name, about }).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar({ link: avatar }).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleAddPlace({ name, link }) {
        api.addCard({ name, link }).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt).then((res) => {
                if (res) {
                    // console.log(res);
                    setLoggedIn(true);
                    setUserEmail(res.email);
                    history.push("/");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    function handleRegister({ email, password }) {
        // console.log("Register : " + email + " , " + password);
        auth.register({ email, password })
            .then((res) => {
                if (res) {
                    history.push('/signin');
                    setInfoPopupSuccess(true);
                } else {
                    setInfoPopupSuccess(false);
                }
            }).catch((err) => {
                console.log(err);
                setInfoPopupSuccess(false);
            }).finally(() => {
                setIsInfoPopupOpen(true);
            });
    }

    function handleLogin({ email, password }) {
        // console.log("Login : " + email + " , " + password);
        auth.authorize({ email, password })
            .then((res) => {
                // console.log(res);
                localStorage.setItem("jwt", res.token)
                handleTokenCheck();
            })
            .catch((err) => {
                console.log(err);
                setInfoPopupSuccess(false);
                setIsInfoPopupOpen(true);
            });
    }

    function handleLogout() {
        localStorage.removeItem('jwt')
        setUserEmail("");
        setLoggedIn(false);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoPopupOpen(false);
    }

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            // console.log("LoggedIn: " + loggedIn);
            Promise.all([api.loadUserInfo(), api.loadCards()])
                .then(([userInfo, cardsData]) => {
                    setCurrentUser(userInfo);
                    setCards(cardsData);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }, [loggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="App">
                <div className="page">
                    <div className="page-content">
                        <Switch>
                            <Route path="/signup">
                                <Header link='/signin' text='Log In' loggedIn={loggedIn} />
                                <Register onRegister={handleRegister}></Register>
                            </Route>
                            <Route path="/signin">
                                <Header link='/signup' text='Sign Up' loggedIn={loggedIn} />
                                <Login onLogin={handleLogin}></Login>
                            </Route>

                            <ProtectedRoute path="/" loggedIn={loggedIn}>
                                <Header link='/signin' text='Log out' loggedIn={loggedIn} email={userEmail} onLogout={handleLogout} />

                                <Main
                                    onEditAvatarClick={handleEditAvatarClick}
                                    onEditProfileClick={handleEditProfileClick}
                                    onAddPlaceClick={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                    cards={cards} />

                                <Footer />

                                <EditAvatarPopup
                                    isOpen={isEditAvatarPopupOpen}
                                    onClose={closeAllPopups}
                                    onUpdateAvatar={handleUpdateAvatar} />

                                <EditProfilePopup
                                    isOpen={isEditProfilePopupOpen}
                                    onClose={closeAllPopups}
                                    onUpdateUser={handleUpdateUser} />

                                <AddPlacePopup
                                    isOpen={isAddPlacePopupOpen}
                                    onClose={closeAllPopups}
                                    onAddPlace={handleAddPlace}
                                ></AddPlacePopup>

                                <ImagePopup
                                    isOpen={isImagePopupOpen}
                                    onClose={closeAllPopups}
                                    selectedCard={selectedCard}
                                />
                            </ProtectedRoute>
                        </Switch>
                        
                        <InfoTooltip
                            isOpen={isInfoPopupOpen} 
                            onClose={closeAllPopups} 
                            isSuccess={infoPopupSuccess}
                  
                        />
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
