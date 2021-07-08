// fetch des films avec la meilleur note imdb
fetch('http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
    .then(res => res.json())
      .then(data => {
          // recuperation du meilleur film (position 0 de la réponse) et stockage dans best_movie
        const best_movie = data.results[0]
        console.log(best_movie)
        document.getElementById("image_meilleur_film").src = best_movie.image_url
        document.getElementById("nom_meilleur_film").innerText = best_movie.title
          // fetch de l'url du film avec la meilleur note de imdb
            fetch(best_movie.url)
                .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        document.getElementById("description_meilleur_film").innerText = data.description
                    })
      })



