import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {

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
        onLogin({ email: email, password: password });
    }

    return (
        <>
            <div className="auth">
                <h1 className="auth__title">Log in</h1>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <input className="auth__input" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
                    <input className="auth__input" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                    <button className="auth__button" type="submit">Log In</button>
                </form>
                <Link className="auth__link" to="/signup">Not a member yet? Sign up here!</Link>
            </div>
        </>
    );
}

export default Login;
