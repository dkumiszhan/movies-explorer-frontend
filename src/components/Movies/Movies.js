import React, { useState, useEffect } from "react";
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
  };

  function getIsDesktop() {
    return window.innerWidth >= 1280;
  }

  function getIsTablet() {
    return window.innerWidth <= 1280 && window.innerWidth > 768;
  }

  function getIsMobile() {
    return window.innerWidth <= 768 && window.innerWidth > 320;
  }

  const [initialMoviesResult, setInitialMoviesResult] = useState([]);

  function handleResize() {
    let itemsToDisplay = 0;
    if (getIsDesktop) {
      itemsToDisplay = 12;
      setInitialMoviesResult(moviesResult.slice(itemsToDisplay));
      console.log(`initialMoviesResult is ${initialMoviesResult}`);
    } else if (getIsTablet) {
      itemsToDisplay = 8;
      setInitialMoviesResult(moviesResult.slice(itemsToDisplay));
      console.log(`initialMoviesResult is ${initialMoviesResult}`);
    } else if (getIsMobile) {
      itemsToDisplay = 5;
      setInitialMoviesResult(moviesResult.slice(itemsToDisplay));
      console.log(`initialMoviesResult is ${initialMoviesResult}`);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
