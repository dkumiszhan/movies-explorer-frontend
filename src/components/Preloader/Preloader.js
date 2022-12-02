import React from 'react'
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round">
                    <p className="preloader__text">Ещё</p>
                </span>
            </div>
        </div>
    )
};

export default Preloader
