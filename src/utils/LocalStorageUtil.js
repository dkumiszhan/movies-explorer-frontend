const LOCAL_STORAGE_KEY_MOVIES = 'search-movies-result';
const LOCAL_STORAGE_KEY_QUERY = 'search-movies-query';
const LOCAL_STORAGE_KEY_SHORT = 'search-movies-short';

class LocalStorageUtil {

  static saveStateToLocalStorage(movies, isShort, query) {
    localStorage.setItem(LOCAL_STORAGE_KEY_MOVIES, JSON.stringify(movies));
    localStorage.setItem(LOCAL_STORAGE_KEY_SHORT, String(isShort));
    localStorage.setItem(LOCAL_STORAGE_KEY_QUERY, query);
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
        query: localStorage.getItem(LOCAL_STORAGE_KEY_QUERY) || '',
    };
  }
}

export default LocalStorageUtil;
