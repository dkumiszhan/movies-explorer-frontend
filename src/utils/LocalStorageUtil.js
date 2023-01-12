const LOCAL_STORAGE_KEY_FILTERED_MOVIES = "search-movies-filtered";
const LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING = "search-movies-id-mapping";
const LOCAL_STORAGE_KEY_QUERY = "search-movies-query";
const LOCAL_STORAGE_KEY_SHORT = "search-movies-short";

class LocalStorageUtil {
  static saveStateToLocalStorage(filteredMovies, isShort, query) {
    localStorage.setItem(LOCAL_STORAGE_KEY_FILTERED_MOVIES, JSON.stringify(filteredMovies));
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
    localStorage.removeItem(LOCAL_STORAGE_KEY_FILTERED_MOVIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_SHORT);
    localStorage.removeItem(LOCAL_STORAGE_KEY_QUERY);
    localStorage.removeItem(LOCAL_STORAGE_KEY_FILTERED_MOVIES);
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

  static loadStateFromLocalStorage() {
    let filteredMovies = localStorage.getItem(LOCAL_STORAGE_KEY_FILTERED_MOVIES);
    if (filteredMovies) {
      filteredMovies = JSON.parse(filteredMovies);
    }
    let isShort = localStorage.getItem(LOCAL_STORAGE_KEY_SHORT);
    if (isShort) {
      isShort = Boolean(isShort);
    }

    return {
      filteredMovies: filteredMovies || [],
      isShort: isShort || false,
      query: localStorage.getItem(LOCAL_STORAGE_KEY_QUERY) || "",
    };
  }
}

export default LocalStorageUtil;
