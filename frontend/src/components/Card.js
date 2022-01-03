import heartImage from '../images/heart.svg';
import trashImage from '../images/trash.svg';
import { useContext } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({
    cardId,
    card,
    onCardClick,
    onCardLike,
    onCardDelete
}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : ''}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__favorite ${isLiked ? 'element__favorite_active' : ''}`
    ); 

    function handleCardClick() {
        onCardClick(card.name, card.link)
    }

    return (
        <li className="element">
            <img src={trashImage} alt="trash can" className={cardDeleteButtonClassName} onClick={() => onCardDelete(card)} />
            <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            <div className="element__info">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__favorite-container">
                    <button className="element__favorite-button" type="button">
                        <img className={cardLikeButtonClassName} src={heartImage} onClick={() => onCardLike(card)} alt="heart" />
                    </button>
                    <p className="element__favorite-count">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
