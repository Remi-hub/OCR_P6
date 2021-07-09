// get the top rated movie and the 7 next
async function topRatedMovie() {
    await fetch('http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
        .then(res => res.json())
        .then(data => {
            // fetch the best movie, add image and title
            const best_movie = data.results[0]
            console.log(best_movie)
            document.getElementById("image_meilleur_film").src = best_movie.image_url
            document.getElementById("top_rated_movie_name").innerText = best_movie.title

            // fetch the url of the top rated imdb movie and display it's description
            fetch(best_movie.url)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    document.getElementById("description_meilleur_film").innerText = data.description
                })

        })
}

// get top 7 movies by genre
async function getMoviesByGenre(page, genre, container, start=0, end=5){
    const url = `http://localhost:8000/api/v1/titles/?genre=${genre}&sort_by=-imdb_score&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const top_movie_container = document.getElementById(container)
    data.results = data.results.slice(start, end)
    for (let movies of data.results) {
        const top_movies_images = document.createElement('img')
        top_movies_images.src = movies.image_url
        top_movie_container.appendChild(top_movies_images)

    }}

// loading 3 top categories
async function loadCategories(){
    await getMoviesByGenre(1,"","top_rated_movies", 1,5)
    await getMoviesByGenre(2,"","top_rated_movies", 0,3)
    await getMoviesByGenre(1, "comedy","category_comedy")
    await getMoviesByGenre(2, "comedy","category_comedy",0,2)
    await getMoviesByGenre(1, "Film-Noir","category_film_noir")
    await getMoviesByGenre(2, "Film-Noir","category_film_noir", 0,2)
    await getMoviesByGenre(1, "Horror","category_horror")
    await getMoviesByGenre(2, "Horror","category_horror", 0,2)
}

topRatedMovie()
loadCategories()
