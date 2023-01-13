import React from "react";
import "./Preloader.css";

const Preloader = (props) => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        {props.isLoading && <div className="preloader__round loader"></div>}
        {props.hasMore && (
          <button
            className="preloader__text preloader__round"
            type="button"
            onClick={props.handleClick}
          >
            Еще
          </button>
        )}
      </div>
    </div>
  );
};

export default Preloader;
