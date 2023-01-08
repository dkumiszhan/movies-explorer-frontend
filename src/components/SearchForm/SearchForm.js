import React, { useState } from "react";
import "./SearchForm.css";
import searchImg from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import moviesApi from "../../utils/MoviesApi";

function SearchForm(props) {
  const [movie, setMovie] = useState({ moviename: "", });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ 
        ...movie,
        [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log("submitting movie");
    e.preventDefault();
    console.log(e);
    props.onSearchSubmit(movie.moviename);
    // moviesApi.getMovies().then((res) => {
    //     console.log("get movies");
    //     console.log(res);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <form className="searchform" name="searchForm" onSubmit={handleSubmit}>
      <fieldset className="searchform__fieldset">
        <input
          className="searchform__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          name="moviename"
          minLength="2"
          maxLength="40"
          value={movie.moviename || ""}
          onChange={handleChange}
          required
        ></input>
        <span className="movieName-input-error searchform__error"></span>
        <button className="searchform__submit" type="submit">
          <img
            src={searchImg}
            className="searchform__find-image"
            alt="кнопка найти"
          />
        </button>
      </fieldset>
      <FilterCheckbox checked = {props.checked} handleFilterChange = {props.handleFilterChange}/>
    </form>
  );
}

export default SearchForm;
