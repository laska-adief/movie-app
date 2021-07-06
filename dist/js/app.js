const APIKEY = "5443e5fb";
const APIURL = "https://www.omdbapi.com/";

const inputSearch = document.getElementById("keyword");
const btnSearch = document.getElementById("btnSearch");
const moviesEl = document.getElementById("movies");

btnSearch.addEventListener("click", (e) => {
  const keyword = inputSearch.value;
  e.preventDefault();
  showMovie(keyword);
});

async function showMovie(keyword) {
  moviesEl.innerHTML = "";
  const resp = await fetch(`${APIURL}?apikey=${APIKEY}&s=${keyword}`);
  const respData = await resp.json();

  const movies = respData.Search;
  if (movies === undefined) {
    moviesEl.innerHTML = "<h2 class='notFound'>Movie not found</h2>";
    return;
  }

  console.log(movies);

  movies.forEach((movie) => {
    const { Title, Year, Poster } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
          <img
            class="movie-poster"
            src="${Poster}"
            alt="${Title}"
            id=movie-poster
          />

          <div class="movie-info">
            <h2 class="movie-title">${Title}</h2>
            <p class="movie-year">${Year}</p>
          </div>
        `;

    moviesEl.appendChild(movieEl);
  });
}
