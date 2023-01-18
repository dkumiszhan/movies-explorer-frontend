import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";
import validator from "validator";

function Register(props) {
  const [authError, setAuthError] = React.useState("");
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

  const NAME_PATTERN = /[a-zA-ZЁёА-я -]+/;

  function validateName(name) {
    if (name.match(NAME_PATTERN)) {
      return "";
    } else {
      return "Невалидное имя";
    }
  }

  const validators = {
    email: validateEmail,
    password: validatePassword,
    name: validateName,
  };

  // хук управления формой и валидации формы
  function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleValueChange = (event) => {
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

    props
      .onRegister(values)
      .then(() => {
        resetForm();
        setAuthError("");
      })
      .catch((err) => {
        setAuthError(err.message);
      });
  };

  return (
    <>
      <header className="register">
        <Link className="register__logo" to="/">
          <img className="register__image" src={logo} alt="логотип" />
        </Link>
      </header>
      <div className="register">
        <h2 className="register__title">Добро пожаловать!</h2>
        <form
          className="register__form"
          name="registerForm"
          onSubmit={handleSubmit}
        >
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
              onChange={handleValueChange}
              required
            />

            <span className="name-input-error register__error">
              {errors.name}
            </span>
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

            <span className="email-input-error register__error">
              {errors.email}
            </span>
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

            <span className="password-input-error register__error">
              {errors.password}
            </span>
            {authError !== "" && <span className="register__error">
              {authError}
            </span>}
            <input
              type="submit"
              className={`register__button-save ${
                isValid
                  ? "register__button-save_active"
                  : "register__button-save_inactive"
              }`}
              value="Зарегистрироваться"
              disabled={!isValid}
            />
          </fieldset>
        </form>
        <Link to="/sign-in" className="register__link">
          Уже зарегистрированы?{" "}
          <span className="register__text register__text_color_green">
            Войти
          </span>
        </Link>
      </div>
    </>
  );
}

export default Register;
