class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    _getAuthHeader() {
        return "Bearer " + localStorage.getItem("jwt");
    }

    getMovies() {
        return fetch(`${this._baseUrl}`, {
            method: "GET",
            headers: {
                ...this._headers,
                // authorization: this._getAuthHeader(),
            }
        }).then((res) => {
            return this._getResponseData(res);
        });
    }

    findMovies(keyword) {
        console.log(keyword);
        return this.getMovies()
        .then((res) => {
            console.log(`movies are ${JSON.stringify(res)}`);
            const matchedMovies = res.filter(element => {
                console.log("filtering");
                return element.nameRU.toLowerCase().includes(keyword.toLowerCase());
            });
            // console.log(`matched movies are ${JSON.stringify(matchedMovies)}`);
            // console.log(matchedMovies);
            return matchedMovies;
        })
        .catch((err) => console.log(err));
        // console.log(`movies are ${movies}`);
        // const match = movies.find(element => {
        //     if (element.nameRU.includes(keyword)) {
        //     return true;
        //     }
        // });
        // return match;
    }

}

const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-type": "application/json",
    },
});

export default moviesApi;
