document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const movieList = document.getElementById('movie-list');
    const pickMoviesButton = document.getElementById('pick-movies');
    const moviePicks = document.getElementById('movie-picks');
    const picksList = document.getElementById('picks-list');
    const pickAgainButton = document.getElementById('pick-again');
    const jingle = document.getElementById('jingle');

    let movies = JSON.parse(localStorage.getItem('movies')) || [];

    // Render movie list
    function renderMovies() {
        movieList.innerHTML = '';
        movies.forEach((movie, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${movie.title} (${movie.year || 'N/A'}) - ${movie.description || 'No description'}</span>
                <button onclick="deleteMovie(${index})">Delete</button>
            `;
            movieList.appendChild(li);
        });
        pickMoviesButton.disabled = movies.length < 3;
    }

    // Add movie
    movieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const year = document.getElementById('year').value;
        const description = document.getElementById('description').value;

        movies.push({ title, year, description });
        localStorage.setItem('movies', JSON.stringify(movies));
        renderMovies();

        movieForm.reset();
    });

    // Delete movie
    window.deleteMovie = (index) => {
        movies.splice(index, 1);
        localStorage.setItem('movies', JSON.stringify(movies));
        renderMovies();
    };

    // Pick 3 random movies
    pickMoviesButton.addEventListener('click', () => {
        moviePicks.style.display = 'block';
        picksList.innerHTML = '';
        const shuffled = [...movies].sort(() => 0.5 - Math.random());
        const picks = shuffled.slice(0, 3);

        picks.forEach((movie, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.textContent = `${movie.title} (${movie.year || 'N/A'})`;
                picksList.appendChild(div);
                if (index === 0) jingle.play();
            }, index * 500);
        });
    });

    // Pick again
    pickAgainButton.addEventListener('click', () => {
        picksList.innerHTML = '';
        moviePicks.style.display = 'none';
    });

    // Initial render
    renderMovies();
});
