import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    return(
        <section className="cards">
            <ul className="cards__list">
                {props.cards.map((item) => {
                    return (
                        <MoviesCard
                        key={props.idGetter(item)}
                        name={item.nameRU}
                        image={props.imageUrlGetter(item)}
                        isLiked={!!props.likeMap[props.idGetter(item)]}
                        buttonType={props.buttonType}
                        id={props.idGetter(item)}
                        url={item.trailerLink}
                        duration={`${Math.floor(item.duration/60)}h ${item.duration%60}м`}
                        onClickHandler={props.likeUnlikeHandler}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default MoviesCardList;