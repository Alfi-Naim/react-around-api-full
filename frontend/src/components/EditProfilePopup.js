import React, { useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    isPending
}) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm
            name="edit"
            title="Edit profile"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitTitle={isPending? "Saving..." : "Save" }>

            <label className="popup__form-field">
                <input className="popup__input" type="text" id="name-input" name="name" placeholder="Name"
                    minLength="2" maxLength="30" value={name || ""} onChange={handleNameChange} required />
                <span className="popup__error name-input-error"></span>
            </label><label className="popup__form-field">
                <input className="popup__input" type="text" id="job-input" name="job" placeholder="About me"
                    minLength="2" maxLength="30" value={description || ""} onChange={handleDescriptionChange} required />
                <span className="popup__error job-input-error"></span>
            </label>

        </PopupWithForm>
    );
}

export default EditProfilePopup;
