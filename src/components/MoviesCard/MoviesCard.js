import React from "react";
import "./MoviesCard.css";
// import testpic from "../../images/avatar.jpeg";

function MoviesCard(props) {
    return(
        <li className="card__item">
            <img className="card__image" src={props.image} alt=""/>
            <div className="card__flex-container">
                <p className="card__name">{props.name}</p>
                <button className="card__save-button"></button>
            </div>
                <p className="card__duration">1 h 30 min</p>
        </li>
    );
}

export default MoviesCard;