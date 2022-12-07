import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";
import arrowLink from "../../images/arrow.svg";

function Portfolio(props) {
    return(
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__links">
                <li className="portfolio__link">
                    <a href="https://github.com/dkumiszhan/how-to-learn" target="_blank" className="portfolio__link-element">
                    Статичный сайт
                    <img src={arrowLink} className="portfolio__arrow-img" alt="ссылка"/>
                    </a>
                </li>
                <li className="portfolio__link">
                    <a href="https://github.com/dkumiszhan/russian-travel" target="_blank" className="portfolio__link-element">
                    Адаптивный сайт
                    <img src={arrowLink} className="portfolio__arrow-img" alt="ссылка"/>
                    </a>
                </li>
                <li className="portfolio__link">
                    <a href="https://github.com/dkumiszhan/react-mesto-api-full" target="_blank" className="portfolio__link-element">
                    Одностраничное приложение
                    <img src={arrowLink} className="portfolio__arrow-img" alt="ссылка"/>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;