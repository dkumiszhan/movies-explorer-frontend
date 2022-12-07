import React from "react";
import "./NavTab.css";

function NavTab() {
    return(
        <nav className="navtabs">
            <ul className="navtab-list">
                <li className="navtab">
                    <a href="#about-project" className="navtab__link">О проекте</a>
                </li>
                <li className="navtab">
                    <a href="#about-techs" className="navtab__link">Технологии</a>
                </li>
                <li className="navtab">
                    <a href="#about-student" className="navtab__link">Студент</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;