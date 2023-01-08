import { Redirect, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import moviePic from "../../images/movie-pic.png";

function App() {
  const [isShort, setIsShort] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState("");
  const [movies, setMovies] = useState([]);
  const [beatMovies, setBeatMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  // key beatsfilms ID and value is our ID
  const [movieIdMapping, setMovieIdMapping] = useState({});
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const handleFilterChange = () => {
    console.log(checked);
    setChecked(!checked);
    localStorage.setItem("checked", checked);
  };

  function likeHandler(movieId) {
    console.log(`liking ${movieId}`);
    const likedMovie = movies.find((movie) => movie.id === movieId);
    console.log(likedMovie);
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
        setMovieIdMapping({
          ...movieIdMapping,
          [movieId]: savedMovie._id,
        });
      });
  }

  function unlikeHandler(movieId) {
    console.log(`unliking ${movieId}`);
    const unlikedMovie = movies.find((movie) => movie.id === movieId);
    console.log(unlikedMovie);
    return mainApi.deleteMovie(movieIdMapping[movieId]).then(() => {
      setMovieIdMapping({ ...movieIdMapping, [movieId]: undefined });
    });
  }

  function likeUnlikeHandler(movieId) {
    console.log(`likeUnlikeHanlder ${movieId}`);
    if (movieIdMapping[movieId]) {
      return unlikeHandler(movieId);
    } else {
      return likeHandler(movieId);
    }
  }

  function onRegister(data) {
    return mainApi
      .register(data)
      .then(() => {
        console.log("registering");
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch(() => {
        console.log("error registering");
        setIsLoggedIn(false);
        navigate("/sign-up");
      });
  }

  function onLogin(data) {
    console.log(data);
    return mainApi
      .authorize(data)
      .then((jwt) => {
        console.log("loggin in");
        setIsLoggedIn(true);
        navigate("/movies");
        localStorage.setItem("jwt", jwt.token);
        localStorage.setItem("ownerId", jwt._id);
        console.log(`token is ${jwt.token}`);
        return jwt;
      })
      .catch(() => {
        console.log("error logging in");
        setIsLoggedIn(false);
        navigate("/sign-up");
      });
  }

  function onButtonSubmit(data) {
    console.log(data);
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }
  };

  useEffect(() => {
    tokenCheck();
    fetchMovieData();
  }, []);

  function fetchBeatMovies() {
    if (beatMovies.length > 0) {
      return Promise.resolve(beatMovies);
    } else {
      return moviesApi.getMovies().then((movies) => {
        setBeatMovies(movies);
        return movies;
      });
    }
  }

  function fetchSavedMovies() {
    console.log("Fetching saved movies");
    if (savedMovies.length > 0) {
      console.log("Movies are already fetched, using previous result");
      return Promise.resolve(savedMovies);
    } else {
      console.log("Fetching new movies since nothing is fetched");
      return mainApi.getMovies().then((movies) => {
        setSavedMovies(movies);
        return movies;
      });
    }
  }

  function fetchMovieData() {
    console.log('fetchMovieData is called');
    return fetchBeatMovies().then(() =>
      fetchSavedMovies().then(() => {
        const likeMapping = savedMovies.reduce((likeMapping, savedMovie) => {
          likeMapping[savedMovie.movieId] = savedMovie._id;
          return likeMapping;
        }, {});

        console.log("like mapping is " + JSON.stringify(likeMapping));

        setMovieIdMapping(likeMapping);
      })
    );
  }

  function filterMovies(movies, keyword) {
    return movies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
    });
  }

  function onSearchSubmit(keyword) {
    console.log("I am here");
    fetchMovieData()
      .then(() => {
        console.log("i am here too");
        return fetchSavedMovies().then((savedMovies) => {
          const filteredMovies = filterMovies(beatMovies, keyword);
          console.log("filtered movies are " + JSON.stringify(filterMovies));

          setMovies(filteredMovies);

          if (filterMovies.length === 0) {
            setMessage("Ничего не найдено");
          }
        });
      })
      .catch(() => {
        setMessage(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route
            path="/movies"
            element={
              <Movies
                movies={movies}
                movieIdMapping={movieIdMapping}
                likeUnlikeHandler={likeUnlikeHandler}
                onSearchSubmit={onSearchSubmit}
                checked={checked}
                handleFilterChange={handleFilterChange}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                savedMovies={beatMovies.filter((movie) => !!movieIdMapping[movie.id])}
                movieIdMapping={movieIdMapping}
                unlikeHandler={unlikeHandler}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile onButtonSubmit={onButtonSubmit} />}
          />
          <Route path="/navigation" element={<Navigation />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
