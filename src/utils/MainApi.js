class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  checkResponse = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(
          new Error(`Ошибка ${response.status}: ${response.statusText}`)
        );
  };

  register = ({ name, email, password }) => {
    console.log("trying to register");
    return fetch(`${this._baseUrl}/sign-up`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }).then((res) => {
        console.log("registered a user");
        this.checkResponse(res)
    });
  };

  authorize = ({ email, password }) => {
    return fetch(`${this._baseUrl}/sign-in`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((res) => this.checkResponse(res));
  };

  getContent = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this.checkResponse(res));
  };

  updateUserInfo = ({ name, email }) => {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: {
            ...this._headers,
            Authorization: this._getAuthHeader(),
        },
        method: "PATCH",
        body: JSON.stringify({ name, email }),
    }).then((res) => this.checkResponse(res));
  };

  createMovie = (movie) => {
    return fetch(`${this._baseUrl}/movies`, {
        headers: {
            ...this._headers,
            Authorization: this._getAuthHeader(),
        },
        method: "POST",
        body: JSON.stringify(movie),
    }).then((res) => this.checkResponse(res));
  };

  getMovies = () => {
    return fetch(`${this._baseUrl}/movies`, {
        headers: {
            ...this._headers,
            Authorization: this._getAuthHeader(),
        },
        method: "GET",
    }).then((res) => this.checkResponse(res));
  };


  deleteMovie = (movieId) => {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
        headers: {
            ...this._headers,
            Authorization: this._getAuthHeader(),
        },
        method: "DELETE",
    }).then((res) => this.checkResponse(res));
  };

  _getAuthHeader() {
    return "Bearer " + localStorage.getItem("jwt");
  }
}

const mainApi = new MainApi({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-type": "application/json",
  },
});

export default mainApi;
