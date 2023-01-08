import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "../Register/Register.css";
import "./Login.css";
import logo from "../../images/logo.svg";
import validator from "validator";

function Login(props) {
    function validateEmail(email) {
        if (validator.isEmail(email)) {
          return "";
        } else {
          return "Невалидный имейл";
        }
      }
    
      function validatePassword(password) {
        if (password.length >= 2 && password.length <= 40) {
          return "";
        } else {
          return "Длина пароля должна быть не менее 2х символов.";
        }
      }
    
      
      const validators = {
        email: validateEmail,
        password: validatePassword,
      };
    
      // хук управления формой и валидации формы
      function useFormWithValidation() {
        const [values, setValues] = React.useState({});
        const [errors, setErrors] = React.useState({});
        const [isValid, setIsValid] = React.useState(false);
    
        const handleValueChange = (event) => {
          console.log("value is changing", event.target);
          const target = event.target;
          const name = target.name;
          const value = target.value;
          target.setCustomValidity(validators[name](value));
    
          setValues({ ...values, [name]: value });
          setErrors({ ...errors, [name]: target.validationMessage });
    
          setIsValid(target.closest("form").checkValidity());
        };
    
        const resetForm = useCallback(
          (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
          },
          [setValues, setErrors, setIsValid]
        );
    
        return { values, handleValueChange, errors, isValid, resetForm };
      }
    
      const { values, handleValueChange, errors, isValid, resetForm } =
        useFormWithValidation();

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onLogin(values).then(resetForm);
    }

    return(
        <>
        <header className="register">
            <Link className="register__logo" to="/">
                <img className="register__image" src={logo} alt="логотип" />
            </Link>
        </header>
        <div className="register">
            <h2 className="register__title">Рады видеть!</h2>
            <form className="register__form" name="registerForm" onSubmit={handleSubmit}>
                <fieldset className="register__fieldset">
                <label className="register__label">E-mail</label>
                <input 
                className="register__input"
                id="email-input"
                type="email"
                name="email"
                placeholder=""
                minLength="2"
                maxLength="40"
                onChange={handleValueChange}
                required
                />
                
                <span className="email-input-error register__error">{errors.email}</span>
                <label className="register__label">Пароль</label>
                <input 
                className="register__input"
                id="password-input"
                type="password"
                name="password"
                placeholder=""
                minLength="2"
                maxLength="40"
                onChange={handleValueChange}
                required
                />
                
                <span className="password-input-error register__error">{errors.password}</span>
                <input
                    type="submit"
                    className={`register__button-save register__button-save_login ${
                        isValid
                          ? "register__button-save_active"
                          : "register__button-save_inactive"
                      }`}
                    value="Войти"
                    disabled={!isValid}
                />
                </fieldset> 
            </form>
            <Link to="/sign-up" className="register__link">
            Ещё не зарегистрированы? <span className="register__text register__text_color_green">Регистрация</span>
            </Link>
        </div>
        </>
    );
}

export default Login;