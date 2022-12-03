import { Redirect, Route, Routes } from "react-router-dom";
import './App.css';
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-in" element={<Login isLoggedIn={false} />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
                                            