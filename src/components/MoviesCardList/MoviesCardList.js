import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    // console.log(props, "movies card list this");
    console.log('moviecardlist props has ' + JSON.stringify(props.movieIdMapping));
    return(
        <section className="cards">
            <ul className="cards__list">
                {props.cards.map((item) => {
                    return (
                        <MoviesCard
                        key={item.id}
                        name={item.nameRU}
                        image={"https://api.nomoreparties.co" + item.image.url}
                        isLiked={!!props.movieIdMapping[item.id]}
                        buttonType={props.buttonType}
                        id={item.id}
                        duration={item.duration}
                        onClickHandler={props.likeUnlikeHandler}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default MoviesCardList;