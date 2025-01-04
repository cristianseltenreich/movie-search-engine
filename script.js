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
        // Crear un contenedor para cada película
        let movieDiv = document.createElement("div");  
        movieDiv.classList.add("movie");
        
        // Crear y configurar el elemento de la imagen del póster
        let poster = document.createElement("img");
        poster.src = `${urlImg}${movie.poster_path}`;
        
        // Crear un contenedor para la información de la película
        let movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");

        // Crear un contenedor para el título y el año
        let titleYearDiv = document.createElement("div");
        titleYearDiv.classList.add("movie-title-year");

        // Crear y configurar el elemento del título
        let title = document.createElement("h2");
        title.textContent = movie.title;
        
        // Crear y configurar el elemento de la fecha de lanzamiento
        let releaseDate = document.createElement("p");
        releaseDate.textContent = movie.release_date;
        releaseDate.classList.add("year");

        // Crear y configurar el elemento de la descripción
        let overview = document.createElement("p");
        overview.textContent = movie.overview;  

        // Añadir el título y la fecha de lanzamiento al contenedor titleYearDiv
        titleYearDiv.appendChild(title);
        titleYearDiv.appendChild(releaseDate);

        // Añadir el contenedor titleYearDiv y la descripción al contenedor movieInfo
        movieInfo.appendChild(titleYearDiv);
        movieInfo.appendChild(overview);

        // Añadir el póster y el contenedor movieInfo al contenedor movieDiv
        movieDiv.appendChild(poster);
        movieDiv.appendChild(movieInfo);

        // Añadir el contenedor movieDiv al contenedor de resultados
        resultContainer.appendChild(movieDiv);
    });
}

document.getElementById("searchButton").addEventListener("click", searchMovies);
//evento que obtiene el valor del input y llama a la funcion searchMovies

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    //evento para que al presionar enter se ejecute la funcion searchMovies
    if (event.key === 'Enter') {
        searchMovies();
    }
});