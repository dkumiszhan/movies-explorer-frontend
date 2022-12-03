import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies() {
    return(
        <>
            <Header isLoggedIn={true} />
            <SearchForm />
            <MoviesCardList />
            <Preloader />
            <Footer />
        </>
    )
}

export default Movies;