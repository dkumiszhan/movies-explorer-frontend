import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies() {
    return(
        <>
            <Header isLoggedIn={true} />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
}

export default SavedMovies;