import React, { useState } from "react";
import "./SearchForm.css";
import searchImg from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  const [movie, setMovie] = useState({ name: "", });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ 
        ...movie,
        [name]: value,
    });
  };

  return (
    <form className="searchform" name="searchForm">
      <fieldset className="searchform__fieldset">
        <input
          className="searchform__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
          name="name"
          minLength="2"
          maxLength="40"
          value={movie.name || ""}
          onChange={handleChange}
          required
        ></input>
        <button className="searchform__submit" type="submit">
          <img
            src={searchImg}
            className="searchform__find-image"
            alt="кнопка найти"
          />
        </button>
      </fieldset>
      <FilterCheckbox />
    </form>
  );
}

export default SearchForm;
