import { Redirect, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Navigation from "../Navigation/Navigation";

import moviePic from "../../images/movie-pic.png";

const myMovies = [
  {
    _id: 0,
    name: "33 слова о дизайне",
    image: moviePic,
    isLiked: true,
  },
  {
    _id: 1,
    name: "33 слова о дизайне",
    image: moviePic,
  },
  {
    _id: 2,
    name: "33 слова о дизайне",
    image: moviePic,
  },
  {
    _id: 3,
    name: "33 слова о дизайне",
    image: moviePic,
  },
  {
    _id: 4,
    name: "33 слова о дизайне",
    image: moviePic,
  },
];

function App() {
  const [movies, setMovies] = useState(myMovies);

  function likeHandler(movieId) {
    console.log(`liking ${movieId}`);
    setMovies(currentMovies => currentMovies.map(movie => {
      if (movie._id === movieId)  {
        movie.isLiked = true;
      }
      return movie;
    }), {});
  }

  function unlikeHandler(movieId) {
    console.log(`unliking ${movieId}`);
    setMovies(currentMovies => currentMovies.map(movie => {
      if (movie._id === movieId)  {
        movie.isLiked = false;
      }
      return movie;
    }), {});
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-in" element={<Login isLoggedIn={false} />} />
        <Route path="/sign-up" element={<Register />} />
        <Route
          path="/movies"
          element={
            <Movies
              movies={movies}
              likeHandler={likeHandler}
              unlikeHandler={unlikeHandler}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies movies={movies} unlikeHandler={unlikeHandler} />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/navigation" element={<Navigation />} />
      </Routes>
    </>
  );
}

export default App;
