import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import validator from "validator";
import mainApi from "../../utils/MainApi";

function Profile(props) {
    const [ message, setMessage ] = useState("");

  function validateEmail(email) {
    if (validator.isEmail(email)) {
      return "";
    } else {
      return "Невалидный имейл";
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
    name: validateName,
  };

  function useFormWithValidation() {
    const [values, setValues] = useState({
      name: "",
      email: "",
    });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleValueChange = (event) => {
        setMessage("");
      const target = event.target;
      const name = target.name;
      const value = target.value;
      target.setCustomValidity(validators[name](value));

      if (value) {
        setValues({ ...values, [name]: value });
      } else {
        setValues({ ...values, [name]: "" });
      }
      setErrors({ ...errors, [name]: target.validationMessage });

      setIsValid(target.closest("form").checkValidity());
    };
    return { values, setValues, handleValueChange, errors };
  }

  const { values, setValues, handleValueChange, errors } = useFormWithValidation();

  useEffect(() => {
    mainApi.getContent(localStorage.getItem("jwt")).then((res) => {
        setValues({
            name: res.data.name,
            email: res.data.email,
        });
    }).catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onButtonSubmit(values).then((wasUpdated) => {
      if (wasUpdated) {
        setMessage("Данные успешно сохранены");
      }
    }).catch((err) => console.log(err));
  };
  return (
    <>
      <Header isLoggedIn={true} />
      <form className="profile" onSubmit={handleSubmit}>
        <h2 className="profile__greeting">{`Привет, ${values.name}!`}</h2>
        <div className="profile__info-content">
          <div className="profile__container profile__container_border">
            <p className="profile__text profile__text_size_bold">Имя</p>
            <input
              className="profile__text profile__input"
              id="name-input"
              type="text"
              name="name"
              minLength="2"
              maxLength="40"
              value={values.name}
              onChange={handleValueChange}
              required
            />
          </div>
          <span className="profile__error">{errors.name}</span>
          <div className="profile__container">
            <p className="profile__text profile__text_size_bold">E-mail</p>
            <input
              className="profile__text profile__input"
              id="name-input"
              type="email"
              name="email"
              minLength="2"
              maxLength="40"
              value={values.email}
              onChange={handleValueChange}
              required
            />
          </div>
          <span className="profile__error">{errors.email}</span>
          <span className="profile__message">{message}</span>
        </div>
        <button
          className="profile__button profile__footer-text"
          type="submit"
          onSubmit={handleSubmit}
        >
          Редактировать
        </button>
        <button
          type="button"
          className="profile__footer-text profile__footer-text_size_redbold"
          onClick={props.handleOnLogout}
        >
          Выйти из аккаунта
        </button>
      </form>
    </>
  );
}

export default Profile;
