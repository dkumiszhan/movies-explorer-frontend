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
import ProtectedRoute from "../protectedRoute/protectedRoute.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [beatMovies, setBeatMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  // key beatsfilms ID and value is our ID
  const [movieIdMapping, setMovieIdMapping] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Ещё");

  function likeHandler(movieId) {
    console.log(`liking ${movieId}`);
    const likedMovie = beatMovies.find((movie) => movie.id === movieId);
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
    console.log(movieIdMapping);
    const unlikedMovie = beatMovies.find((movie) => movie.id === movieId);
    console.log(unlikedMovie);
    return mainApi.deleteMovie(movieIdMapping[movieId]).then(() => {
      setMovieIdMapping({ ...movieIdMapping, [movieId]: undefined });
      delete movieIdMapping[movieId];
      console.log(movieIdMapping);
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
    return mainApi.getMovies().then((movies) => {
      setSavedMovies(movies);
      return movies;
    });

    /*
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
    */
  }

  function fetchMovieData() {
    console.log("fetchMovieData is called");
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

  function filterMovies(movies, keyword, checked, isLiked) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) &&
        (!checked || movie.duration <= 40) &&
        (!isLiked || movieIdMapping[movie.id])
      );
    });
  }

  function onSearchSubmit(keyword, checked, isLiked) {
    setIsLoading(true);
    return fetchMovieData()
      .then(() => {
        console.log("i am here too");
        return fetchSavedMovies().then((savedMovies) => {
          const filteredMovies = filterMovies(
            beatMovies,
            keyword,
            checked,
            isLiked
          );

          setIsLoading(false);
          if (filteredMovies.length === 0) {
            setMessage("Ничего не найдено");
          } else {
            setMessage("Ещё");
          }
          return filteredMovies;
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
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  movieIdMapping={movieIdMapping}
                  likeUnlikeHandler={likeUnlikeHandler}
                  onSearchSubmit={onSearchSubmit}
                  message={message}
                  isLoading={isLoading}
                  isLiked={false}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                  savedMovies={beatMovies.filter(
                    (movie) => !!movieIdMapping[movie.id]
                  )}
                  movieIdMapping={movieIdMapping}
                  unlikeHandler={unlikeHandler}
                  onSearchSubmit={onSearchSubmit}
                  isLiked={true}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile onButtonSubmit={onButtonSubmit} />
              </ProtectedRoute>
            }
          />
          <Route path="/navigation" element={<Navigation />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
