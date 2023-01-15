import React from "react";
import "./Preloader.css";

const Preloader = (props) => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        {props.isLoading && (
          <div className="preloader__round">
            <span>
              <div className="loader"></div>
            </span>
          </div>
        )}
        {props.hasMore && (
          <button
            className="preloader__round preloader__text"
            type="button"
            onClick={props.handleClick}
          >
            {props.message}
          </button>
        )}
      </div>
    </div>
  );
};

export default Preloader;
