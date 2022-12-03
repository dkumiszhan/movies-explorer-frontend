import React from "react";
import logo from "../../images/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";

function Header(props) {
    return(
        <header className="header">
            <img className="header__logo" src={logo} alt="логотип" />
            <div className="header__container">
                {props.isLoggedIn ? (
                    <>
                        <Link to="/movies" className="header__movies-link">Фильмы</Link>
                        <Link to="/saved-movies" className="header__savedmovies-link">Сохранённые фильмы</Link>
                        <Link to="/profile" className="header__account">Аккаунт
                        <div className="header__account-box">
                            <img className="header__account-icon" src={accountIcon} alt="иконка аккаунта" />
                        </div>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="sign-up" className="header__register-link">Регистрация</Link>
                        <Link to="sign-in" className="header__login-link">Войти</Link> 
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;   
