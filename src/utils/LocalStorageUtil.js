const LOCAL_STORAGE_KEY_FILTERED_MOVIES = "search-movies-filtered";
const LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING = "search-movies-id-mapping";
const LOCAL_STORAGE_KEY_QUERY = "search-movies-query";
const LOCAL_STORAGE_KEY_CHECKED = "search-movies-checked";
const LOCAL_STORAGE_KEY_JWT = "jwt";
const LOCAL_STORAGE_KEY_USER_ID = "ownerId";

class LocalStorageUtil {
  static saveStateToLocalStorage(filteredMovies, checked, query) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_FILTERED_MOVIES,
      JSON.stringify(filteredMovies)
    );
    localStorage.setItem(LOCAL_STORAGE_KEY_CHECKED, String(checked));
    localStorage.setItem(LOCAL_STORAGE_KEY_QUERY, query);
  }

  static setMovieToIdMapping(movieToIdMapping) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING,
      JSON.stringify(movieToIdMapping)
    );
  }

  static getJwt(jwt) {
    return localStorage.getItem(LOCAL_STORAGE_KEY_JWT);
  }

  static setJwt(jwt) {
    localStorage.setItem(LOCAL_STORAGE_KEY_JWT, jwt);
  }

  static removeJwt(jwt) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_JWT);
  }


  static getUserId(userId) {
    return localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
  }

  static setUserId(userId) {
    localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, userId);
  }

  static clearLocalStorageSearchResults() {
    localStorage.removeItem(LOCAL_STORAGE_KEY_FILTERED_MOVIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_CHECKED);
    localStorage.removeItem(LOCAL_STORAGE_KEY_QUERY);
    localStorage.removeItem(LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING);
    localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
  }

  static getMovieToIdMapping() {
    let value = localStorage.getItem(LOCAL_STORAGE_KEY_MOVIE_ID_MAPPING);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }

  static loadStateFromLocalStorage() {
    let filteredMovies = localStorage.getItem(
      LOCAL_STORAGE_KEY_FILTERED_MOVIES
    );
    if (filteredMovies) {
      filteredMovies = JSON.parse(filteredMovies);
    }
    let checked = localStorage.getItem(LOCAL_STORAGE_KEY_CHECKED);
    if (checked) {
      checked = checked === "true";
    }

    return {
      filteredMovies: filteredMovies || [],
      checked: checked || false,
      query: localStorage.getItem(LOCAL_STORAGE_KEY_QUERY) || "",
    };
  }
}

export default LocalStorageUtil;
