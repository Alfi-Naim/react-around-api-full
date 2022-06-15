function InfoTooltip({
    isOpen,
    onClose,
    title,
    image,
}) {
    return (
        <div className={`popup popup_type_info ${isOpen && "popup_opened"}`}>
            <div className="popup__info-container">
                <button className="popup__close-icon" type="button" onClick={onClose} />
                <img src={image} className="popup__info-image" />
                <h2 className="popup__title popup__title_type_info">{title}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;
