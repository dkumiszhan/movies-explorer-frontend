import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
    return(
        <>
            <Header isLoggedIn={true} />
            <section className="profile">
                <h2 className="profile__greeting">Привет, Виталий!</h2>
                <div className="profile__info-content">
                    <div className="profile__container profile__container_border">
                        <p className="profile__text profile__text_bold">Имя</p>
                        <p className="profile__text">Кумисжан</p>
                    </div>
                    <div className="profile__container">
                        <p className="profile__text profile__text_bold">E-mail</p>
                        <p className="profile__text">pochta@yandex.ru</p>
                    </div>
                </div>
                <p className="profile__footer-text">Редактировать</p>
                <Link to="/" className="profile__footer-text profile__footer-text_redbold">Выйти из аккаунта</Link>
            </section>
        </>
    );
}

export default Profile;