import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import Movies from "../Movies/Movies";
import Navigation from "../Navigation/Navigation"; 

function SavedMovies(props) {
  const filteredMovies = props.movies.filter((movie) => movie.isLiked);

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuClick = () => {
    console.log("menu clicked");
    setIsNavOpen(true);
    console.log(`isNavOpen is ${isNavOpen}`);
  };

  const handleCloseClick = () => {
    console.log("close menu click");
    setIsNavOpen(false);
    console.log(`isNavOpen is ${isNavOpen}`);
  };

  return (
    <>
      {/* <Movies movies={filteredMovies} buttonType="card__button-delete" unlikeHandler={props.unlikeHandler} /> */}
      <Header isLoggedIn={true} handleMenuClick={handleMenuClick} />
      {isNavOpen && <Navigation isOpen={isNavOpen} handleCloseClick={handleCloseClick} />}
      <main className="main">
        <SearchForm />
        <MoviesCardList
          cards={filteredMovies}
          buttonType="card__button-delete"
          unlikeHandler={props.unlikeHandler}
        />
      </main>

      <Footer />
    </>
  );
}

export default SavedMovies;
