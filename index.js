//TMDB

const API_KEY = "api_key=c92d6125d9aa6a39285b3e0ad35be546";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const formMovie = document.getElementById("form-movie");
const searchMovie = document.getElementById("search");
const searchUrl = BASE_URL + '/search/movie?' + API_KEY;

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = ";";

  data.forEach((movie) => {
    const { id,title, poster_path, vote_average, overview } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}" />

        <div class="movie-information">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Descripción General</h3>
          ${overview}
        </div>
        `;

    main.appendChild(movieElement);
  });

  function getColor(vote) {
    if (vote >= 8) {
      return "points-movie-green";
    } else if (vote >= 5) {
      return "points-movie-orange";
    } else {
      return "points-movie-red";
    }
  }
}

formMovie.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchInput = searchMovie.value;

  if(searchInput){
    getMovies(searchUrl+'&query='+searchInput);
  }else{
    getMovies(API_URL);
  }
});