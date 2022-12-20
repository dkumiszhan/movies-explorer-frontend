import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
    // console.log(props, "movies card list this");
    return(
        <section className="cards">
            <ul className="cards__list">
                {props.cards.map((item) => {
                    return (
                        <MoviesCard
                        key={item._id}
                        name={item.name}
                        image={item.image}
                        isLiked={!!item.isLiked}
                        buttonType={props.buttonType}
                        id={item._id}
                        onClickHandler={item.isLiked ? props.unlikeHandler : props.likeHandler}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default MoviesCardList;