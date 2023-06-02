import {formatFilmHTML} from './film.js'

const filmInfo = document.getElementById("film-info")

let watchListLocal = []

function removeFromWatchList(id) {
    watchListLocal = watchListLocal.filter(function(film) {
        return film.imdbID !== id
    })
    localStorage.setItem("watchList", JSON.stringify(watchListLocal))
    renderWatchList()
}

document.addEventListener('click', function(e) {
    if(e.target.dataset.id) {
        removeFromWatchList(e.target.dataset.id)
    }
})

function renderWatchList () {
    if (localStorage.hasOwnProperty("watchList")) {
        watchListLocal = JSON.parse(localStorage.getItem("watchList"))
    }
    let watchListHtml = ''
    for (let film of watchListLocal) {
        watchListHtml += formatFilmHTML(film)
    }
    if (watchListLocal.length) {
        filmInfo.innerHTML = watchListHtml
    } else {
        filmInfo.innerHTML = `
            <h3 class="watchlist-greeting-text" id="greeting-text">Your watchlist is looking a little empty...</h3>
            <div class="add-btn-group">
                <a href="index.html"><button class="add-btn-watchlist">+</button></a>
                <p class="add-movie-text">Let's add some movies!</p>
            </div>
        `
    }
    document.querySelectorAll(".add-btn").forEach(element => {
        element.textContent = '-'
    })
    document.querySelectorAll(".info-watchlist").forEach(element => {
        element.textContent = 'Remove'
    })

}

renderWatchList()