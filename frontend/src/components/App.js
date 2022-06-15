import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router";

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import AddPlacePopup from "./AddPlacePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login .js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute"
import CurrentUserContext from "../contexts/CurrentUserContext.js";

import * as auth from "../utils/auth";
import api from "../utils/api.js";

import failImage from "../images/fail.svg"
import successImage from "../images/success.svg"
import loadingImage from "../images/loading.svg";
import DeletePlacePopup from "./DeletePlacePopup.js";

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    const [isSubmitPending, setIsSubmitPending] = useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [infoPopup, setInfoPopup] = useState({ title: "", image: "" });

    const [cardToDelete, setCardToDelete] = useState(null);
    const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
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

    function handleDeleteCardClick(card) {
        setCardToDelete(card);
        setIsDeletePopupOpen(true);
    }

    function handleCardClick(name, link) {
        setSelectedCard({
            name: name, link: link
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

    function handleCardDelete() {
        setIsSubmitPending(true);
        if (cardToDelete != null) {
            api.deleteCard(cardToDelete._id).then(() => {
                setCards(cards.filter((newCard) => newCard._id !== cardToDelete._id));
                closeAllPopups();
                setIsSubmitPending(false);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    function handleUpdateUser({ name, about }) {
        setIsSubmitPending(true);
        api.setUserInfo({ name, about }).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
            setIsSubmitPending(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleUpdateAvatar(avatar) {
        setIsSubmitPending(true);
        api.setUserAvatar({ link: avatar }).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
            setIsSubmitPending(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleAddPlace({ name, link }) {
        setIsSubmitPending(true);
        api.addCard({ name, link }).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
            setIsSubmitPending(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    function handleTokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt).then((res) => {
                if (res) {
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
        setInfoPopup({ title: 'Signing up...', image: loadingImage });
        setIsInfoPopupOpen(true);
        auth.register({ email, password })
            .then((res) => {
                if (res) {
                    history.push('/signin');
                    setInfoPopup({ title: 'Successfully Registered!', image: successImage });
                } else {
                    setInfoPopup({ title: 'Oops, something went wrong! please try again', image: failImage });
                }
            }).catch(() => {
                setInfoPopup({ title: 'Oops, something went wrong! please try again', image: failImage });
            });
    }

    function handleLogin({ email, password }) {
        setInfoPopup({ title: 'Signing in...', image: loadingImage });
        setIsInfoPopupOpen(true);
        auth.authorize({ email, password })
            .then((res) => {
                closeAllPopups();
                localStorage.setItem("jwt", res.token)
                handleTokenCheck();
            })
            .catch(() => {
                setInfoPopup({ title: 'Oops, something went wrong! please try again', image: failImage });
                setIsInfoPopupOpen(true);
            });
    }

    function handleLogout() {
        localStorage.removeItem('jwt');
        setUserEmail("");
        setLoggedIn(false);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoPopupOpen(false);
        setIsDeletePopupOpen(false);
        setInfoPopup({ title: '', image: '' });
    }

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
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
                                    onCardDelete={handleDeleteCardClick}
                                    cards={cards} />

                                <Footer />

                                <EditAvatarPopup
                                    isOpen={isEditAvatarPopupOpen}
                                    onClose={closeAllPopups}
                                    onUpdateAvatar={handleUpdateAvatar}
                                    isPending={isSubmitPending} />

                                <EditProfilePopup
                                    isOpen={isEditProfilePopupOpen}
                                    onClose={closeAllPopups}
                                    onUpdateUser={handleUpdateUser}
                                    isPending={isSubmitPending} />

                                <AddPlacePopup
                                    isOpen={isAddPlacePopupOpen}
                                    onClose={closeAllPopups}
                                    onAddPlace={handleAddPlace}
                                    isPending={isSubmitPending} />

                                <ImagePopup
                                    isOpen={isImagePopupOpen}
                                    onClose={closeAllPopups}
                                    selectedCard={selectedCard} />

                                <DeletePlacePopup
                                    isOpen={isDeletePopupOpen}
                                    onClose={closeAllPopups}
                                    onDeletePlace={handleCardDelete}
                                    isPending={isSubmitPending}
                                    card={cardToDelete} />

                            </ProtectedRoute>
                        </Switch>

                        <InfoTooltip
                            isOpen={isInfoPopupOpen}
                            onClose={closeAllPopups}
                            title={infoPopup.title}
                            image={infoPopup.image}
                        />
                    </div>
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
