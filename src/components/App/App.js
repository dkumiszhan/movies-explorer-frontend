import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../protectedRoute/protectedRoute.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {

  const [currentUser, setCurrentUser] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Ещё");



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


  /*
  function filterMovies(movies, keyword, checked, isLiked) {
    return movies.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) &&
        (!checked || movie.duration <= 40) &&
        (!isLiked || movieIdMapping[movie.id])
      );
    });
  }
  */



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
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  message={message}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute>
                <SavedMovies
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                  message={message}
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