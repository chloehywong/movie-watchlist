
export function formatFilmHTML(titleInfo) {
    return `
        <div class="info-container">
            <div class="info-sub-container">
                <img src=${titleInfo.Poster} class="info-poster">
                <div class="info-child">
                    <div class="info-inner-child">
                    <div class="info-child-1">
                        <h2 class="info-title">${titleInfo.Title}</h2>
                        <img src="./icons/star-icon.png" class="info-star-icon">
                        <p class="info-rating">${titleInfo.Ratings[0].Value}</p>
                    </div>
                    <div class="info-child-2">
                        <p class="info-runtime">${titleInfo.Runtime}</p>
                        <p class="info-genre">${titleInfo.Genre}</p>
                        <button class="add-btn" data-id="${titleInfo.imdbID}">+</button>
                        <p class="info-watchlist">Watchlist</p>
                    </div>
                    <p class="info-intro">${titleInfo.Plot}</p> 
                    </div> 
                </div>
            </div>
        </div>
        `
}