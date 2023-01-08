import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

function Movies(props) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleMenuClick = () => {
        console.log("menu clicked");
        setIsNavOpen(true);
        console.log(`isNavOpen is ${isNavOpen}`);
    }

    const handleCloseClick = () => {
        console.log("close menu click");
        setIsNavOpen(false);
        console.log(`isNavOpen is ${isNavOpen}`);
    }

  return (
    <>
      <Header isLoggedIn={true} handleMenuClick={handleMenuClick} />
      {isNavOpen && <Navigation isOpen={isNavOpen} handleCloseClick={handleCloseClick} />}
      <main className="main">
        <SearchForm onSearchSubmit={props.onSearchSubmit} checked={props.checked} handleFilterChange={props.handleFilterChange} />
        <MoviesCardList
          buttonType=""
          cards={props.movies}
          movieIdMapping={props.movieIdMapping}
          likeUnlikeHandler={props.likeUnlikeHandler}
        />
        <Preloader />
      </main>

      <Footer />
    </>
  );
}

export default Movies;
