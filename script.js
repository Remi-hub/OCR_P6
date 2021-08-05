// get the top rated movie and the 7 next
async function topRatedMovie() {
    await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score')
        .then(res => res.json())
        .then(data => {
            // fetch the best movie, add image and title
            const best_movie = data.results[0]
            document.getElementById("best_movie_picture").src = best_movie.image_url
            document.getElementById("best_movie_name").innerText = best_movie.title

            // fetch the url of the top rated imdb movie and display it's description
            fetch(best_movie.url)
                .then(res => res.json())
                .then(data => {
                    document.getElementById("best_movie_description").innerText = data.description
                })

            // fetch top rated movie url and get multiple information to display in our modal window
            fetch(best_movie.url)
                .then(res => res.json())
                .then(data => {
            document.getElementById("best_movie_picture_modal").src = data.image_url
            document.getElementById("best_movie_title").innerText = data.title
            document.getElementById("best_movie_genre").innerText = data.genres
            document.getElementById("best_movie_release_date").innerText = data.date_published
            document.getElementById("best_movie_rating").innerText = data.avg_vote
            document.getElementById("best_movie_rating_imdb").innerText = data.imdb_score
            document.getElementById("best_movie_director").innerText = data.directors
            document.getElementById("best_movie_actors").innerText = data.actors
            document.getElementById("best_movie_duration").innerText = data.duration
            document.getElementById("best_movie_country").innerText = data.countries
            document.getElementById("best_movie_box_office_result").innerText = data.worldwide_gross_income
            document.getElementById("best_movie_description_result").innerText = data.description
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
    let image_index = 0
    for (let movies of data.results) {
        image_index++
        const top_movies_images = document.createElement('img')
        top_movies_images.src = movies.image_url
        top_movies_images.onclick = handleImageOnClick;
        top_movies_images.setAttribute('data-id', movies.id)
        top_movies_images.classList.add('movie_image')
        if  (page > 1 || image_index > 4) {
            top_movies_images.style.display = "none"
        }
    top_movie_container.appendChild(top_movies_images)
    }}


// handling click on movie images, popping modal window and displaying movie information
const modal = document.getElementById("myModal");

const handleImageOnClick = function (event) {
    // getting the movie ID from the event
    const movie_id = event.target.getAttribute('data-id')
    fetch(`http://localhost:8000/api/v1/titles/${movie_id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('movie_picture_modal').src = data.image_url
            document.getElementById("movie_title").innerText = data.title
            document.getElementById("movie_genre").innerText = data.genres
            document.getElementById("movie_release_date").innerText = data.date_published
            document.getElementById("movie_rating").innerText = data.avg_vote
            document.getElementById("movie_rating_imdb").innerText = data.imdb_score
            document.getElementById("movie_director").innerText = data.directors
            document.getElementById("movie_actors").innerText = data.actors
            document.getElementById("movie_duration").innerText = data.duration
            document.getElementById("movie_country").innerText = data.countries
            document.getElementById("movie_box_office_result").innerText = '$'+ data.worldwide_gross_income
                        if (data.worldwide_gross_income == null){
                document.getElementById('movie_box_office_result').innerHTML ='N/A';
            }
            document.getElementById("movie_description_result").innerText = data.description
            // display the modal
            modal.style.display = "block"
        })
}
// Get the <span> element that closes the modal
const span = document.getElementById("close_modal");
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

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



// handling arrow of the carrousel

let vignettes = {
    top_rated_movies: 0,
    category_comedy: 0,
    category_film_noir: 0,
    category_horror: 0
}

function handleArrow(category, direction){
    if (direction === "previous" && vignettes[category] === 0){
       console.log('debut')
        return
    }
     if (direction === "next" && vignettes[category] === 3){
       console.log('fin')
        return
    }
    if (direction ==="previous"){
        vignettes[category]--
    }
    if (direction ==="next"){
        vignettes[category]++
    }

    let child = document.getElementById(category).children
    let movie_list = Array.from(child).slice(2, 9)

    for (let i = 0; i < 7; i++){

            if (i >= vignettes[category] && i <= vignettes[category] + 3){
                movie_list[i].style.display = "block"
            }
            else {movie_list[i].style.display = "none"}


    }


}
