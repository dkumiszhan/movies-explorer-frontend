import { Route, Routes, useNavigate } from "react-router-dom";
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
import LocalStorageUtil from "../../utils/LocalStorageUtil";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [beatMovies, setBeatMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  // key beatsfilms ID and value is our ID
  const [movieIdMapping, setMovieIdMapping] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Ещё");

  useEffect(() => {
    fetchMovieData();
  }, []);

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
        setSavedMovies([...savedMovies, likedMovie]);
      });
  }

  function unlikeHandler(movieId) {
    console.log(`unliking ${movieId}`);
    console.log(movieIdMapping);
    const unlikedMovie = beatMovies.find((movie) => movie.id === movieId);
    console.log(unlikedMovie);
    return mainApi.deleteMovie(movieIdMapping[movieId]).then(() => {
      setMovieIdMapping({ ...movieIdMapping, [movieId]: undefined });
      setSavedMovies((currentMovies) => {
        return currentMovies.filter((movie) => movie.id !== movieId);
      });
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
        navigate("/movies");
      })
      .catch(() => {
        console.log("error registering");
        navigate("/sign-up");
      });
  }

  function onLogin(data) {
    console.log(data);
    return mainApi
      .authorize(data)
      .then((jwt) => {
        console.log("loggin in");
        navigate("/movies");
        localStorage.setItem("jwt", jwt.token);
        localStorage.setItem("ownerId", jwt._id);
        console.log(`token is ${jwt.token}`);
        return jwt;
      })
      .catch(() => {
        console.log("error logging in");
        navigate("/sign-up");
      });
  }

  function onButtonSubmit(data) {
    console.log(data);
  }

  function fetchBeatMovies() {
    let movies = LocalStorageUtil.getMovies();
    if (movies.length > 0) {
      setBeatMovies(movies);
      return Promise.resolve(beatMovies);
    } else {
      return moviesApi.getMovies().then((movies) => {
        LocalStorageUtil.setMovies(movies);
        setBeatMovies(movies);
        return movies;
      });
    }
  }

  function fetchSavedMovies() {
    console.log("Fetching saved movies");
    let movieMapping = LocalStorageUtil.getMovieToIdMapping();
    if (movieMapping) {
      setMovieIdMapping(movieMapping);
      return Promise.resolve(movieMapping);
    } else {
      return mainApi.getMovies().then((savedMovies) => {
        const likeMapping = savedMovies.reduce((likeMapping, savedMovie) => {
          likeMapping[savedMovie.movieId] = savedMovie._id;
          return likeMapping;
        }, {});

        LocalStorageUtil.setMovieToIdMapping(likeMapping);
        setMovieIdMapping(likeMapping);

        let savedMovieIds = new Set(savedMovies.map((movie) => movie.movieId));
        setSavedMovies(
          beatMovies.filter((movie) => savedMovieIds.has(movie.id))
        );

        return likeMapping;
      });
    }
  }

  function fetchMovieData() {
    console.log("fetchMovieData is called");
    return fetchBeatMovies().then(fetchSavedMovies);
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
        return fetchSavedMovies().then(() => {
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
              <ProtectedRoute>
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
              <ProtectedRoute>
                <SavedMovies
                  savedMovies={savedMovies}
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
              <ProtectedRoute>
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