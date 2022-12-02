import React from "react";
import "./Promo.css";
import Navtab from "../NavTab/NavTab";

function Promo() {
    return(
        <section className="promo">
            <h2 className="promo__title">Учебный проект студента факультета Веб-разработки.</h2>
            <Navtab />
        </section>
    );
}

export default Promo;