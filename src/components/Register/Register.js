import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register(props) {
    const [ registerData, setRegisterData ] =useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({
            ...registerData,
            [name]: value,
        });
    };

    return(
        <>
        <header className="register">
            <Link className="register__logo" to="/"><img className="register__logo" src={logo} alt="логотип" /></Link>
        </header>
        <div className="register">
            <h2 className="register__title">Добро пожаловать!</h2>
            <form className="register__form" name="registerForm">
                <fieldset className="register__fieldset">
                <label className="register__label">Имя</label>
                <input 
                className="register__input"
                id="name-input"
                type="text"
                name="name"
                placeholder=""
                minLength="2"
                maxLength="40"
                value={registerData.name || ""}
                onChange={handleChange}
                required
                />
                
                <span className="name-input-error register__error"></span>
                <label className="register__label">E-mail</label>
                <input 
                className="register__input"
                id="email-input"
                type="email"
                name="email"
                placeholder=""
                minLength="2"
                maxLength="40"
                value={registerData.email || ""}
                onChange={handleChange}
                required
                />
                
                <span className="email-input-error register__error"></span>
                <label className="register__label">Пароль</label>
                <input 
                className="register__input"
                id="password-input"
                type="password"
                name="password"
                placeholder=""
                minLength="2"
                maxLength="40"
                value={registerData.password || ""}
                onChange={handleChange}
                required
                />
                
                <span className="password-input-error register__error"></span>
                <input
                    type="submit"
                    className="register__button-save"
                    value="Зарегистрироваться"
                />
                </fieldset> 
            </form>
            <Link to="/sign-in" className="register__link">
            Уже зарегистрированы? <span className="register__link register__link_green">Войти</span>
            </Link>
        </div>
        </>
    );
}

export default Register;