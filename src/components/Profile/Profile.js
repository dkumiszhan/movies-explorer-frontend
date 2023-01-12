import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import validator from "validator";

function Profile(props) {
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
        
        // const resetForm = useCallback(
        //   (newValues = {}, newErrors = {}, newIsValid = false) => {
        //     setValues(newValues);
        //     setErrors(newErrors);
        //     setIsValid(newIsValid);
        //   },
        //   [setValues, setErrors, setIsValid]
        // );
    
        return { values, handleValueChange, errors };
      }
    
      const { values, handleValueChange, errors } =
        useFormWithValidation();
    
      const handleSubmit = (e) => {
        
        e.preventDefault();
        console.log("saving name and email");
        props.onButtonSubmit(values);
      };
  return (
    <>
      <Header isLoggedIn={true} />
      <form className="profile" onSubmit={handleSubmit}>
        <h2 className="profile__greeting">Привет, Виталий!</h2>
        <div className="profile__info-content">
          <div className="profile__container profile__container_border">
            <p className="profile__text profile__text_size_bold">Имя</p>
            {/* <input className="profile__text" value="Кумисжан" /> */}
            <input
              className="profile__text profile__input"
              id="name-input"
              type="text"
              name="name"
              defaultValue="Кумисжан"
              minLength="2"
              maxLength="40"
              onChange={handleValueChange}
              required
            />
            {/* <p className="profile__text">Кумисжан</p> */}
          </div>
          <span className="profile__error">{errors.name}</span>
          <div className="profile__container">
            <p className="profile__text profile__text_size_bold">E-mail</p>
            {/* <input className="profile__text" value="pochta@yandex.ru" /> */}
            {/* <p className="profile__text">pochta@yandex.ru</p> */}
            <input
              className="profile__text profile__input"
              id="name-input"
              type="email"
              name="email"
              defaultValue="pochta@yandex.ru"
              minLength="2"
              maxLength="40"
              onChange={handleValueChange}
              required
            />
          </div>
          <span className="profile__error">{errors.email}</span>
        </div>
        <button className="profile__button profile__footer-text" type="submit" onSubmit={handleSubmit}>
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
