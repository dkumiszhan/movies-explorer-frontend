import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
    return(
        <div className="error__container">
            <h2 className="error__number">404</h2>
            <p className="error__name">Страница не найдена</p>
            <Link to="" className="error__link">Назад</Link>
        </div>
    );
}

export default NotFound;