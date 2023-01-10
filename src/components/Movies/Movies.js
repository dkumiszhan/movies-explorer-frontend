import React, { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import LocalStorageUtil from "../../utils/LocalStorageUtil";

function Movies(props) {

  const { movies } = LocalStorageUtil.loadStateFromLocalStorage(); 
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [moviesResult, setMoviesResult] = useState(movies);

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
    return props.onSearchSubmit(keyword, isChecked, false).then((newMovies) => {
        setMoviesResult(newMovies);

        LocalStorageUtil.saveStateToLocalStorage(newMovies, isChecked, keyword);
        return newMovies;
    });
  }

  return (
    <>
      <Header isLoggedIn={true} handleMenuClick={handleMenuClick} />
      {isNavOpen && (
        <Navigation isOpen={isNavOpen} handleCloseClick={handleCloseClick} />
      )}
      <main className="main">
        <SearchForm
          onSearchSubmit={searchSubmitHandler}
          useLocalStorage={true}
        />
        <MoviesCardList
          buttonType=""
          cards={moviesResult}
          movieIdMapping={props.movieIdMapping}
          likeUnlikeHandler={props.likeUnlikeHandler}
        />
        <Preloader message={props.message} isLoading={props.isLoading} />
      </main>

      <Footer />
    </>
  );
}

export default Movies;
