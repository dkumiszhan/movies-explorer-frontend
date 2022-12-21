import React, { useState } from "react";
import logo from "../../images/logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";
import menu from "../../images/icon__drop-down.svg";

function Header(props) {
   return (
    <header className="header">
      <Link className="header__logo" to="/">
        <img className="header__image" src={logo} alt="логотип" />
      </Link>
      <div className="header__container">
        {props.isLoggedIn ? (
          <>
            <div className="header__container-collapsible">
              <Link to="/movies" className="header__movies-link">
                Фильмы
              </Link>
              <Link to="/saved-movies" className="header__savedmovies-link">
                Сохранённые фильмы
              </Link>
              <Link to="/profile" className="header__account">
                Аккаунт
                <div className="header__account-box">
                  <img
                    className="header__account-icon"
                    src={accountIcon}
                    alt="иконка аккаунта"
                  />
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="sign-up" className="header__register-link">
              Регистрация
            </Link>
            <Link to="sign-in" className="header__login-link">
              Войти
            </Link>
          </>
        )}
      </div>
      {props.isLoggedIn && (
        <button className="header__menu-button" type="button" onClick={props.handleMenuClick}>
          <img className="header__menu" src={menu} alt="кнопка меню" />
        </button>
      )}
    </header>
  );
}

export default Header;
