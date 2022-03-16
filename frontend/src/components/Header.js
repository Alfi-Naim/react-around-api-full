import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo-vector.svg';

function Header({ link, text, email, onLogout }) {
    return (
        <header className="header">
            <Link to="/"><img className="logo" src={logo} alt="Around the u.s."/></Link>
            <div className="header__info-container">
                <p className="header__email">{email}</p>
                <Link className="header__link" to={link} onClick={onLogout}>{text}</Link>
            </div>
        </header>
    );
}

export default Header;
