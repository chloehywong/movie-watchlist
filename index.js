import { formatFilmHTML } from "./film.js"

const searchBtn = document.getElementById("search-btn")
const titleSearch = document.getElementById("title-search")
const filmInfo = document.getElementById("film-info")
const movieIcon = document.getElementById("movie-icon")
const greetingText = document.getElementById("greeting-text")
let data = []

// TODO: A bug we found is we can add the same film to the watchlist
// We shouldn't allow the user to add a movie to the watchlist
// if it's already there.

let watchListLocal = []
if (localStorage.hasOwnProperty("watchList")) {
    watchListLocal = JSON.parse(localStorage.getItem("watchList"))
}


async function getTitleById(id) {
    let response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=45ec124c`)
    let data = await response.json()
    return data
}


async function searchClick() {
    let searchResults = await fetch(`http://www.omdbapi.com/?s=${titleSearch.value}&apikey=45ec124c`)
    let resultsJson = await searchResults.json()
    let filmResults = ''
    let titleData = []
    
    if (resultsJson.Response === 'False') {
        filmResults = `
        <div class="film-info">
            <div class="film-info-unable">
                <h3 class="unable-text">Unable to find what you're looking for. 
                Please try another search.</h3>
            </div>
        </div>
        `
    } else {
        for(let title of resultsJson.Search){
            let titleInfo = await getTitleById(title.imdbID)
            titleData.push(titleInfo)

            movieIcon.remove()
            greetingText.remove() 

            filmResults += formatFilmHTML(titleInfo)
        }
    }
    data = titleData
    filmInfo.innerHTML = filmResults
}

function addToWatchList(id) {
    let targetFilm = data.filter(function(film) {
        return film.imdbID === id
    })[0]
    watchListLocal.push(targetFilm)
    localStorage.setItem("watchList", JSON.stringify(watchListLocal))
}

searchBtn.addEventListener("click", searchClick)

document.addEventListener('click', function(e) {
    if(e.target.dataset.id) {
        addToWatchList(e.target.dataset.id)
    }
})
