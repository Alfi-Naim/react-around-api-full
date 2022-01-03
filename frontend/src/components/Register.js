import React, { useState } from "react";
import { Link } from "react-router-dom";
import failImage from "../images/fail.svg"
import successImage from "../images/success.svg";
import InfoTooltip from "./InfoTooltip";



function Register({ onRegister, isOpen, onClose, isSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ email: email, password: password });
    }

    return (
        <>
            <div className="auth">
                <h1 className="auth__title">Sign up</h1>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <input className="auth__input" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                    <input className="auth__input" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    <button className="auth__button" type="submit">Sign up</button>
                </form>
                <Link className="auth__link" to="/signin">Already a member? Log in here!</Link>
            </div>
            <InfoTooltip
              isOpen={isOpen}
              onClose={onClose}
              imageSrc={isSuccess? successImage : failImage}
              title={isSuccess? "Success! You have now been registered." : "Oops, something went wrong! Please try again."}
            />
        </>
    );
}

export default Register;
