import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import mainApi from "../../utils/MainApi";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import * as Constants from "../../utils/Constants";

function SavedMovies(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [likeMap, setLikeMap] = useState({});

  useEffect(() => {
    fetchSavedMovies();
  }, []);

  function fetchSavedMovies() {
    mainApi.getMovies().then((movies) => {
      setSavedMovies(movies);
      setLikeMap(
        movies.reduce((accumulator, movie) => {
          accumulator[movie._id] = true;
          return accumulator;
        }, {})
      );

      setFilteredMovies(movies);
    });
  }

  function unlikeHandler(movieId) {
    console.log(`unliking our ID${movieId}`);
    return mainApi.deleteMovie(movieId).then(() => {
      setSavedMovies(savedMovies.filter((movie) => movie._id !== movieId));
      setFilteredMovies(filteredMovies.filter((movie) => movie._id !== movieId));
      setLikeMap({ ...likeMap, [movieId]: undefined });
    });
  }

  const handleMenuClick = () => {
    setIsNavOpen(true);
  };

  const handleCloseClick = () => {
    setIsNavOpen(false);
  };

  const searchSubmitHandler = (keyword, checked) => {
    setFilteredMovies(filterMovies(savedMovies, keyword, checked));
  };

  function filterMovies(movies, keyword, checked) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) &&
        (!checked || movie.duration <= Constants.MAX_SHORT_MOVIE_DURATION_MINUTES)
      );
    });
  }

  function idGetter(movie) {
    return movie._id;
  }


  function imageUrlGetter(movie) {
    return movie.image;
  }

  return (
    <>
      {/* <Movies movies={filteredMovies} buttonType="card__button-delete" unlikeHandler={props.unlikeHandler} /> */}
      <Header isLoggedIn={true} handleMenuClick={handleMenuClick} />
      {isNavOpen && (
        <Navigation isOpen={isNavOpen} handleCloseClick={handleCloseClick} />
      )}
      <main className="main">
        <SearchForm
          onSearchSubmit={searchSubmitHandler}
          checked={props.checked}
        />
        <MoviesCardList
          cards={filteredMovies}
          idGetter={idGetter}
          lastItemIndex={filteredMovies.length}
          imageUrlGetter={imageUrlGetter}
          buttonType="card__button-delete"
          likeMap={likeMap}
          likeUnlikeHandler={unlikeHandler}
        />
      </main>

      <Footer />
    </>
  );
}

export default SavedMovies;
