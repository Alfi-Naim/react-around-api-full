import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace,
    isPending
}) {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    return (

        <PopupWithForm
            name="add"
            title="New place"
            isOpen={isOpen}
            onClose={onClose}
            submitTitle={isPending? "Creating..." : "Create" }
            onSubmit={handleSubmit}>

            <label className="popup__form-field">
                <input onChange={handleNameChange} className="popup__input" type="text" id="title-input" name="name" placeholder="Title" value={name}
                    minLength="1" maxLength="30" required />
                <span className="popup__error title-input-error"></span>
            </label><label className="popup__form-field">
                <input onChange={handleLinkChange} className="popup__input" type="url" id="url-input" name="link" placeholder="Image link" value={link}
                    required />
                <span className="popup__error url-input-error"></span>
            </label>

        </PopupWithForm>

    );
}

export default AddPlacePopup;
