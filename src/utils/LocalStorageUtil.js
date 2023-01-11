const LOCAL_STORAGE_KEY_MOVIES = "search-movies-result";
const LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING = "search-movies-id-mapping";
const LOCAL_STORAGE_KEY_QUERY = "search-movies-query";
const LOCAL_STORAGE_KEY_SHORT = "search-movies-short";

class LocalStorageUtil {
  static saveStateToLocalStorage(movies, isShort, query) {
    localStorage.setItem(LOCAL_STORAGE_KEY_MOVIES, JSON.stringify(movies));
    localStorage.setItem(LOCAL_STORAGE_KEY_SHORT, String(isShort));
    localStorage.setItem(LOCAL_STORAGE_KEY_QUERY, query);
  }

  static setMovieToIdMapping(movieToIdMapping) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING,
      JSON.stringify(movieToIdMapping)
    );
  }

  static clearLocalStorage() {
    localStorage.removeItem(LOCAL_STORAGE_KEY_MOVIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_SHORT);
    localStorage.removeItem(LOCAL_STORAGE_KEY_QUERY);
    localStorage.removeItem(LOCAL_STORAGE_KEY_MOVIES);
  }


  static getMovieToIdMapping() {
    let value = localStorage.getItem(
      LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING,
    );
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }

  static getMovies() {
    let value = localStorage.getItem(
      LOCAL_STORAGE_KEY_MOVIES,
    );
    if (value) {
      return JSON.parse(value);
    }
    return [];
  }


  static setMovies(movies) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_MOVIES,
      JSON.stringify(movies)
    );
  }



  static loadStateFromLocalStorage() {
    let movies = localStorage.getItem(LOCAL_STORAGE_KEY_MOVIES);
    if (movies) {
      movies = JSON.parse(movies);
    }
    let isShort = localStorage.getItem(LOCAL_STORAGE_KEY_SHORT);
    if (isShort) {
      isShort = Boolean(isShort);
    }

    return {
      movies: movies || [],
      isShort: isShort || false,
      query: localStorage.getItem(LOCAL_STORAGE_KEY_QUERY) || "",
    };
  }
}

export default LocalStorageUtil;
