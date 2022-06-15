import React, { useState, useEffect } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    isPending
}) {

    const currentUser = React.useContext(CurrentUserContext);

    const [avatar, setAvatar] = useState("");

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatar);
    }

    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Change profile picture"
            isOpen={isOpen}
            onClose={onClose}
            submitTitle={isPending? "Saving..." : "Save" }
            onSubmit={handleSubmit} >

            <label className="popup__form-field">
                <input className="popup__input" type="url" id="avatar-url-input" name="link" placeholder="Image link" value={avatar || ""} onChange={handleAvatarChange}
                    required />
                <span className="popup__error avatar-url-input-error"></span>
            </label>

        </PopupWithForm>

    );
}

export default EditAvatarPopup;
