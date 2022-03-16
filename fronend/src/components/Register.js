import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {

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
        </>
    );
}

export default Register;
