import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import moviePic from "../../images/movie-pic.png";

const myCards = [
    {
        _id: 0,
        name: "33 слова о дизайне",
        image: moviePic, 
    },
    {
        _id: 1,
        name: "33 слова о дизайне",
        image: moviePic, 
    },
    {
        _id: 2,
        name: "33 слова о дизайне",
        image: moviePic, 
    },
    {
        _id: 3,
        name: "33 слова о дизайне",
        image: moviePic, 
    },
    {
        _id: 4,
        name: "33 слова о дизайне",
        image: moviePic, 
    }
];

function MoviesCardList(cards) {
    cards = myCards;
    return(
        <section className="cards">
            <ul className="cards__list">
                {cards.map((item) => {
                    return (
                        <MoviesCard
                        card={item}
                        key={item._id}
                        name={item.name}
                        image={item.image}
                        />
                    );
                })}
            </ul>
        </section>
    );
}

export default MoviesCardList;