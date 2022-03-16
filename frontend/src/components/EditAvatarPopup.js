import React from "react";
import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
}) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Change profile picture"
            isOpen={isOpen}
            onClose={onClose}
            submitTitle="Save"
            onSubmit={handleSubmit}>

            <label className="popup__form-field">
                <input ref={avatarRef} className="popup__input" type="url" id="avatar-url-input" name="link" placeholder="Image link" defaultValue=""
                    required />
                <span className="popup__error avatar-url-input-error"></span>
            </label>

        </PopupWithForm>

    );
}

export default EditAvatarPopup;
