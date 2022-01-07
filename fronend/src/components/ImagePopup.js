function ImagePopup({
    isOpen,
    onClose,
    selectedCard
}) {
    return (
        <div className={`popup popup_type_show ${isOpen && "popup_opened"}`}>
            <div className="popup__image-container">
                <button className="popup__close-icon" type="button" onClick={onClose} />
                <img src={selectedCard.link} alt="alt text" className="popup__image" />
                <p className="popup__description">{selectedCard.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;
