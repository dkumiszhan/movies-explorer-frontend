import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked(!checked);
    };

    return(
        <div className="filter">
            <input
            className="filter__input"
            type="checkbox"
            value={checked}
            onChange={handleChange}
            />
            <p className="filter__text">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;