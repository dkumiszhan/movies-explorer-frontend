import React, { useState } from "react";
import "./SearchForm.css";
import searchImg from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import LocalStorageUtil from "../../utils/LocalStorageUtil";

function SearchForm(props) {
  let queryInitial = '';
  let isCheckedInitial = false;

  if (props.useLocalStorage) {
    const localStorageState = LocalStorageUtil.loadStateFromLocalStorage();
    queryInitial = localStorageState.query;
    isCheckedInitial = localStorageState.isShort;
  }
  const [query, setQuery] = useState(queryInitial);
  const [isChecked, setIsChecked] = useState(isCheckedInitial);

  const handleMovieQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSearchSubmit(query, isChecked);
  };

  function handleCheckboxChange(evt) {
    setIsChecked(evt.checked);
  }

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
          value={query}
          onChange={handleMovieQueryChange}
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
      <FilterCheckbox
        checked={props.checked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </form>
  );
}

export default SearchForm;
