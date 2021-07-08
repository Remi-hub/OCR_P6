// fetch du film avec la meilleur note imdb
fetch('http://localhost:8000/api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
    .then(res => res.json())
      .then(data => {
        console.log(data.results[0])
        document.getElementById("image_meilleur_film").src = data.results[0].image_url
        data.results[0].title
      })

