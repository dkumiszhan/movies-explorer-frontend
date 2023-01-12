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

  let state = LocalStorageUtil.loadStateFromLocalStorage();

  const [currentUser, setCurrentUser] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(state.filteredMovies);
  // key beatsfilms ID and value is our ID
  const [movieIdMapping, setMovieIdMapping] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Ещё");

  useEffect(() => {
  }, []);

  function likeHandler(movieId) {
    console.log(`liking ${movieId}`);
    const likedMovie = filteredMovies.find((movie) => movie.id === movieId);
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

  function unlikeHandlerOurs(movieId) {
    console.log(`unliking our ID${movieId}`);
    return mainApi.deleteMovie(movieId).then(() => {
      let beatMoviesId = Object.keys(movieIdMapping).find(key => movieIdMapping[key] === movieId);
      if (beatMoviesId) {
        setMovieIdMapping({ ...movieIdMapping, [beatMoviesId]: undefined });
      } else {
        console.error(`${movieId} is not found while unliking`);
      }
    });
  }

  function unlikeHandlerBeatMovies(movieId) {
    console.log(`unliking beatMovies ID ${movieId}`);
    let ourId = movieIdMapping[movieId];
    return mainApi.deleteMovie(ourId).then(() => {
      setMovieIdMapping({ ...movieIdMapping, [movieId]: undefined });
    });
  }


  function likeUnlikeHandler(movieId) {
    console.log(`likeUnlikeHanlder ${movieId}`);
    if (movieIdMapping[movieId]) {
      return unlikeHandlerBeatMovies(movieId);
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

  function handleOnLogout() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
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
    return moviesApi.getMovies().then(beatMovies => {
      mainApi.getMovies().then(savedMovies => {
        const likeMapping = savedMovies.reduce((likeMapping, savedMovie) => {
          likeMapping[savedMovie.movieId] = savedMovie._id;
          return likeMapping;
        }, {});
        // TODO: storage into localstorage
        setMovieIdMapping(likeMapping);
          
        let filteredMovies = filterMovies(beatMovies, keyword, checked, isLiked);
        // TODO: storage into localstorage
        setFilteredMovies(filteredMovies);
      })
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
                  movieIdMapping={movieIdMapping}
                  unlikeHandler={unlikeHandlerOurs}
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
                <Profile onButtonSubmit={onButtonSubmit} handleOnLogout={handleOnLogout}/>
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