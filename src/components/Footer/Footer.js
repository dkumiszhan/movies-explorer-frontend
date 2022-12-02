import React from "react";
import "./Footer.css";

function Footer() {
    return(
        <div className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__text">&copy; 2022</p>
                <div className="footer__resources">
                    <p className="footer__text">Яндекс.Практикум</p>
                    <p className="footer__text">Github</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;