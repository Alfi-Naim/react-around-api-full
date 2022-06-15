import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({
    isOpen,
    onClose,
    onDeletePlace,
    card,
    isPending
}) {


    function handleSubmit(e) {
        e.preventDefault();
        onDeletePlace(card);
    }

    return (
        <PopupWithForm
            name="delete"
            title="Are you sure?"
            isOpen={isOpen}
            onClose={onClose}
            submitTitle={isPending? "Deleting..." : "Delete" }
            onSubmit={handleSubmit} />
    );
}

export default DeletePlacePopup;
