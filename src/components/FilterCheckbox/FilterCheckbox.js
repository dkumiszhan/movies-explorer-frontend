import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(props) {

    return(
        <div className="filter">
            <input
            className={`filter__input ${props.checked ? "filter__input_checked" : ""}`}
            type="checkbox"
            value={props.checked}
            onChange={props.handleCheckboxChange}
            />
            <p className="filter__text">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;