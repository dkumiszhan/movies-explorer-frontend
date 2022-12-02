import React from "react";
import "./NavTab.css";
import { Link } from "react-router-dom";

function NavTab() {
    return(
        <nav className="navtabs">
            <ul className="navtab-list">
                <li className="navtab">
                    <Link to="/about-project" className="navtab__link">О проекте</Link>
                </li>
                <li className="navtab">
                    <Link to="/techs" className="navtab__link">Технологии</Link>
                </li>
                <li className="navtab">
                    <Link to="/student" className="navtab__link">Студент</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavTab;