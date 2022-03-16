import pen from '../images/pen.svg';
import Card from './Card';
import { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
    onEditAvatarClick,
    onEditProfileClick,
    onAddPlaceClick,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards
}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image-container">
                    <img src={pen} alt="pen" className="profile__pen" onClick={onEditAvatarClick} />
                    <img className="profile__image" src={currentUser.avatar} alt="profile" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={onEditProfileClick}/>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlaceClick}/>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(cardItem => (
                        <Card
                            key={cardItem._id}
                            card={cardItem}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike} 
                            onCardDelete={onCardDelete} 
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
