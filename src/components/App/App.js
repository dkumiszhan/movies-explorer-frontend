import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../protectedRoute/protectedRoute.js";
import AnonymousRoute from "../anonymousRoute/anonymousRoute.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import LocalStorageUtil from "../../utils/LocalStorageUtil";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("jwt"));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getContent(localStorage.getItem("jwt"))
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function onRegister(data) {
    return mainApi
      .register(data)
      .then((jwt) => {
        initAuthState(data, jwt);
        navigate("/movies");
        return jwt;
      })
      .catch((err) => {
        console.error("register error", err);
        throw err;
      });
  }

  function onLogin(data) {
    return mainApi
      .authorize(data)
      .then((jwt) => {
        initAuthState(data, jwt);
        navigate("/movies");
        return jwt;
      })
      .catch((err) => {
        console.error("login error", err);
        throw err;
      });
  }

  function initAuthState(data, jwt) {
    LocalStorageUtil.clearLocalStorageSearchResults();
    localStorage.setItem("jwt", jwt.token);
    localStorage.setItem("ownerId", jwt._id);
    setIsLoggedIn(true);
    setCurrentUser({
      name: data.name,
      email: data.email,
    });
  }

  function onButtonSubmit(data) {
    if (data.name !== currentUser.name || data.email !== currentUser.email) {
      return mainApi
        .updateUserInfo(data)
        .then((res) => {
          setCurrentUser(res);
          return true;
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } else {
      return Promise.resolve(false);
    }
  }

  function handleOnLogout() {
    localStorage.removeItem("jwt");
    LocalStorageUtil.clearLocalStorageSearchResults();
    setCurrentUser({});
    setIsLoading(false);
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path="/sign-in"
            element={
              <AnonymousRoute>
                <Login onLogin={onLogin} />
              </AnonymousRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <AnonymousRoute>
                <Register onRegister={onRegister} />
              </AnonymousRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <Movies
                  setIsLoading={setIsLoading}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
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
                  // message={message}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  onButtonSubmit={onButtonSubmit}
                  handleOnLogout={handleOnLogout}
                  name={currentUser.name}
                  email={currentUser.email}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
