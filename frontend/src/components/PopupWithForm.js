function PopupWithForm({
    name,
    title,
    isOpen,
    onClose,
    submitTitle,
    onSubmit,
    children
}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__form-container">
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <button className="popup__close-icon" type="button" onClick={onClose}/>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__button" type="submit">{submitTitle}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
