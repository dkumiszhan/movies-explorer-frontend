import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
// import Movies from "../Movies/Movies";
import Navigation from "../Navigation/Navigation";

function SavedMovies(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [savedMoviesResult, setSavedMoviesResult] = useState(props.savedMovies);

  console.log("savedMovies props is " + JSON.stringify(props));

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

  const searchSubmitHandler = (keyword, isChecked) => {
    return props.onSearchSubmit(keyword, isChecked, true).then((newMovies) => {
        setSavedMoviesResult(newMovies);
    });
  }


  return (
    <>
      {/* <Movies movies={filteredMovies} buttonType="card__button-delete" unlikeHandler={props.unlikeHandler} /> */}
      <Header isLoggedIn={true} handleMenuClick={handleMenuClick} />
      {isNavOpen && (
        <Navigation isOpen={isNavOpen} handleCloseClick={handleCloseClick} />
      )}
      <main className="main">
        <SearchForm onSearchSubmit={searchSubmitHandler} checked={props.checked} />
        <MoviesCardList
          cards={savedMoviesResult}
          buttonType="card__button-delete"
          movieIdMapping={props.movieIdMapping}
          likeUnlikeHandler={props.unlikeHandler}
        />
      </main>

      <Footer />
    </>
  );
}

export default SavedMovies;
