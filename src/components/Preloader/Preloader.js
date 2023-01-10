import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round">
                    {props.isLoading ? <div className="loader"></div> : <span className="preloader__text">{props.message}</span>}
                </span>
            </div>
        </div>
    )
};

export default Preloader
