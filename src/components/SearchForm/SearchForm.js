import React from "react";
import "./SearchForm.css";
import searchImg from "../../images/search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
    const handleChange = (e) => {
        const { search } = e.target;
    }
    return(
        <form className="searchform" name="searchForm">
            <fieldset className="searchform__fieldset">
                <input
                className="searchform__input"
                id="search-input"
                type="text"
                placeholder="Фильм"
                name="search"
                minLength="2"
                maxLength="40"
                value=""
                onChange={handleChange}
                required
                ></input>
                <button
                className="searchform__submit"
                type="submit"
                ><img 
                src={searchImg}
                className="searchform__find-image"
                alt="кнопка найти"
                /></button>
            </fieldset>
            <FilterCheckbox />
        </form>
    );
}

export default SearchForm; 