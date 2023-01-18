import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import NotFound from "../NotFound/NotFound";
import * as Constants from "../../utils/Constants";
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
  const [isLoggedIn, setIsLoggedIn] = useState(LocalStorageUtil.getJwt());
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getContent(LocalStorageUtil.getJwt())
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
        navigate(Constants.ROUTE_MOVIES);
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
        navigate(Constants.ROUTE_MOVIES);
        return jwt;
      })
      .catch((err) => {
        console.error("login error", err);
        throw err;
      });
  }

  function initAuthState(data, jwt) {
    LocalStorageUtil.clearLocalStorageSearchResults();
    LocalStorageUtil.setJwt(jwt.token);
    LocalStorageUtil.setUserId(jwt._id);
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
    LocalStorageUtil.removeJwt();
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
            path={Constants.ROUTE_SIGNIN}
            element={
              <AnonymousRoute>
                <Login onLogin={onLogin} />
              </AnonymousRoute>
            }
          />
          <Route
            path={Constants.ROUTE_SIGNUP}
            element={
              <AnonymousRoute>
                <Register onRegister={onRegister} />
              </AnonymousRoute>
            }
          />
          <Route
            path={Constants.ROUTE_MOVIES}
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
            path={Constants.ROUTE_SAVED_MOVIES}
            element={
              <ProtectedRoute>
                <SavedMovies
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path={Constants.ROUTE_PROFILE}
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
          <Route path={Constants.ROUTE_NAVIGATION} element={<Navigation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
