let api_key = "f14761adbc5a9026962539cff28ace2f";
let urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w500';

function searchMovies() {
    let searchInput = document.getElementById("searchInput").value;

    fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then(response => response.json())
    .then(response => displayMovies(response.results))
    .catch(error => console.error('Error:', error));
}

function displayMovies(movies) {
    let resultContainer = document.getElementById("results");
    resultContainer.innerHTML = "";
    if (movies.length === 0) {
        resultContainer.innerHTML = "<p>No se encontraron películas con ese nombre</p>";
        return; 
    }
    movies.forEach(movie => {
        let movieDiv = document.createElement("div");  
        movieDiv.classList.add("movie");
        
        let poster = document.createElement("img");
        poster.src = `${urlImg}${movie.poster_path}`;
        
        let movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");

        // Dentro de la función displayMovies, agregar el contenedor para el título y el año
        let titleYearDiv = document.createElement("div");
        titleYearDiv.classList.add("movie-title-year");

        let title = document.createElement("h2");
        title.textContent = movie.title;
        
        let releaseDate = document.createElement("p");
        releaseDate.textContent = movie.release_date;
        releaseDate.classList.add("year");

        let overview = document.createElement("p");
        overview.textContent = movie.overview;  

        titleYearDiv.appendChild(title);
        titleYearDiv.appendChild(releaseDate);

        movieInfo.appendChild(titleYearDiv);
        movieInfo.appendChild(overview);

        movieDiv.appendChild(poster);
        movieDiv.appendChild(movieInfo);

        resultContainer.appendChild(movieDiv);
    });
}

document.getElementById("searchButton").addEventListener("click", searchMovies);

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
});