import React from "react";
import "./MoviesCard.css";
// import testpic from "../../images/avatar.jpeg";

function MoviesCard(props) {
  // console.log(props);
  return (
    <li className="card">
      <a href={props.url} target="_blank"><img className="card__image" src={props.image} alt="картинка фильма" /></a>
      <div className="card__flex-container">
        <p className="card__name">{props.name}</p>
        <button
          className={`card__button card__button-save ${props.buttonType} ${
            props.isLiked ? "card__button-save_saved" : ""
          }`}
          onClick={() => props.onClickHandler(props.id)}
        ></button>
      </div>
      <p className="card__duration">{props.duration}</p>
    </li>
  );
}

export default MoviesCard;
