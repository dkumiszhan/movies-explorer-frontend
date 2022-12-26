import React from "react";
import "./NavTab.css";

function NavTab() {
    return(
        <nav className="navtabs">
            <ul className="navtabs__items">
                <li className="navtabs__item">
                    <a href="#about-project" className="navtabs__link">О проекте</a>
                </li>
                <li className="navtabs__item">
                    <a href="#about-techs" className="navtabs__link">Технологии</a>
                </li>
                <li className="navtabs__item">
                    <a href="#about-student" className="navtabs__link">Студент</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;