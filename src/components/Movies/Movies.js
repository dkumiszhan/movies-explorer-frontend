import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi.js";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";
import LocalStorageUtil from "../../utils/LocalStorageUtil";

function Movies(props) {
  let state = LocalStorageUtil.loadStateFromLocalStorage();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(state.filteredMovies);
  const [movieIdMapping, setMovieIdMapping] = useState(
    LocalStorageUtil.getMovieToIdMapping() || {}
  );

  const [hasMore, setHasMore] = useState(false);

  const [itemsPerRow, setItemsPerRow] = useState(1);
  const [lastItemIndex, setLastItemIndex] = useState(1);
  const [message, setMessage] = useState("Ещё");


  useEffect(() => {
    resetToInitialSearchResultState(filteredMovies.length);
    updateItemsPerRow(window.innerWidth);

    window.addEventListener("resize", () =>
      updateItemsPerRow(window.innerWidth)
    );
  }, []);

  function likeHandler(movieId) {
    const likedMovie = filteredMovies.find((movie) => movie.id === movieId);
    return mainApi
      .createMovie({
        ...likedMovie,
        owner: localStorage.getItem("ownerId"),
        thumbnail: `https://api.nomoreparties.co${likedMovie.image.url}`,
        movieId: likedMovie.id,
        image: `https://api.nomoreparties.co${likedMovie.image.url}`,
        // remove extra properties from beatmovies API not needed for our API
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
        owner: undefined,
        isLiked: undefined,
      })

      .then((savedMovie) => {
        let newMovieIdMapping = {
          ...movieIdMapping,
          [movieId]: savedMovie._id,
        };
        setMovieIdMapping(newMovieIdMapping);
        LocalStorageUtil.setMovieToIdMapping(newMovieIdMapping);
      });
  }

  function unlikeHandler(movieId) {
    let ourId = movieIdMapping[movieId];
    return mainApi.deleteMovie(ourId).then(() => {
      let newMovieIdMapping = { ...movieIdMapping, [movieId]: undefined };
      setMovieIdMapping(newMovieIdMapping);
      LocalStorageUtil.setMovieToIdMapping(newMovieIdMapping);
    });
  }

  function onSearchSubmit(keyword, checked) {
    props.setIsLoading(true);
    setMessage("");
    return moviesApi.getMovies().then((beatMovies) => {
      mainApi.getMovies().then((savedMovies) => {
        const likeMapping = savedMovies.reduce((likeMapping, savedMovie) => {
          likeMapping[savedMovie.movieId] = savedMovie._id;
          return likeMapping;
        }, {});
        setMovieIdMapping(likeMapping);
        LocalStorageUtil.setMovieToIdMapping(likeMapping);

        let filteredMovies = filterMovies(beatMovies, keyword, checked);
        setFilteredMovies(filteredMovies);
        resetToInitialSearchResultState(filteredMovies.length);

        LocalStorageUtil.saveStateToLocalStorage(
          filteredMovies,
          checked,
          keyword
        );
        setMessage("Ещё");
        props.setIsLoading(false);
        if (filteredMovies.length === 0) {
            setMessage("Ничего не найдено");
        }
        return filteredMovies;
      });
    });
  }

  function likeUnlikeHandler(movieId) {
    if (movieIdMapping[movieId]) {
      return unlikeHandler(movieId);
    } else {
      return likeHandler(movieId);
    }
  }

  function filterMovies(movies, keyword, checked) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) &&
        (!checked || movie.duration <= 40)
      );
    });
  }

  const handleMenuClick = () => {
    setIsNavOpen(true);
  };

  const handleCloseClick = () => {
    setIsNavOpen(false);
  };

  function resetToInitialSearchResultState(currentResultSize) {
    let windowWidth = window.innerWidth;
    let newLastItemIndex = 12;
    if (windowWidth >= 1280) {
      newLastItemIndex = 12;
    } else if (windowWidth >= 768) {
      newLastItemIndex = 8;
    } else {
      newLastItemIndex = 5;
    }
    setLastItemIndex(newLastItemIndex);
    if (newLastItemIndex < currentResultSize) {
      setHasMore(true);
    }
  }

  function updateItemsPerRow(windowWidth) {
    if (windowWidth >= 1280) {
      setItemsPerRow(4);
    } else if (windowWidth >= 768) {
      setItemsPerRow(2);
    } else {
      setItemsPerRow(1);
    }
  }

  function idGetter(movie) {
    return movie.id;
  }

  function handlePreloaderClick() {
    let newLastItemIndex = lastItemIndex + itemsPerRow;
    newLastItemIndex -= newLastItemIndex % itemsPerRow;
    setLastItemIndex(newLastItemIndex);
    setHasMore(newLastItemIndex < filteredMovies.length);
  }

  function imageUrlGetter(movie) {
    return `https://api.nomoreparties.co${movie.image.url}`;
  }

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} handleMenuClick={handleMenuClick} />
      {isNavOpen && (
        <Navigation isOpen={isNavOpen} handleCloseClick={handleCloseClick} />
      )}
      <main className="main">
        <SearchForm onSearchSubmit={onSearchSubmit} useLocalStorage={true} />
        <MoviesCardList
          buttonType=""
          idGetter={idGetter}
          imageUrlGetter={imageUrlGetter}
          cards={filteredMovies}
          lastItemIndex={lastItemIndex}
          likeMap={movieIdMapping}
          likeUnlikeHandler={likeUnlikeHandler}
        />
        <Preloader
          message={message}
          isLoading={props.isLoading}
          hasMore={hasMore}
          handleClick={handlePreloaderClick}
        />
      </main>

      <Footer />
    </>
  );
}

export default Movies;
