import failImage from "../images/fail.svg"
import successImage from "../images/success.svg";

function InfoTooltip({
    isOpen,
    onClose,
    isSuccess
}) {
    return (
        <div className={`popup popup_type_info ${isOpen && "popup_opened"}`}>
            <div className="popup__info-container">
                <button className="popup__close-icon" type="button" onClick={onClose} />
                <img src={isSuccess? successImage : failImage} alt="alt text" className="popup__info-image" />
                <h2 className="popup__title popup__title_type_info">{ isSuccess ? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}</h2>
            </div>
        </div>
    );
}

export default InfoTooltip;
