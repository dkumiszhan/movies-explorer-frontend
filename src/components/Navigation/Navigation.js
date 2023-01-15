import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import accountIcon from "../../images/account-icon.svg";
import closeButton from "../../images/close-button.svg";

function Navigation(props) {
  return (
    <section
      className={`navigation ${props.isOpen ? "navigation_is-opened" : ""}`}
    >
      <div className="navigation__container">
        <button className="navigation__button" onClick={props.handleCloseClick} type="button">
          <img
            className="navigation__button-img"
            src={closeButton}
            alt="кнопка закрыть"
          />
        </button>
        <Link to="/" className="navigation__link">
          Главная
        </Link>
        <Link to="/movies" className="navigation__link">
          Фильмы
        </Link>
        <Link to="/saved-movies" className="navigation__link">
          Сохранённые фильмы
        </Link>
        <Link
          to="/profile"
          className="navigation__link navigation__link_account"
        >
          Аккаунт
          <div className="navigation__account-box">
            <img
              className="navigation__account-icon"
              src={accountIcon}
              alt="иконка аккаунта"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Navigation;
