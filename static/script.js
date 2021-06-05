fetch("https://jikan1.p.rapidapi.com/anime/16498/episodes", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "e5cca01e94msh13b50c3f5cb7543p139c26jsn9bd955386cb9",
		"x-rapidapi-host": "jikan1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});



const API_URL = 'https://jikan1.p.rapidapi.com/top/anime/1/upcoming'
const IMG_PATH ='https://image.tmdb.org/t/p/w1280'
const SEARCH_API = ''

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')


// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    

   showMovies(data.top)
   
}

function showMovies(movies) {
    main.innerHTML = ''
    console.log(movies)


    movies.forEach((movie) => {
        
        const { title, image_url, rank, url} = movie
        
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        
        movieEl.innerHTML =`
        
        <img src="${image_url}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(rank)}">${rank}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>For more info Please visit the link bellow!</p>
            <a href="${url}">Link to My Anime List website!</a>
        </div>
    
        `
        main.appendChild(movieEl)
    });
}

function getClassByRate(vote) {
    if (vote >=  10) {
        return 'red'
    } else if (vote >= 6) {
        return 'orange'
    } else {
        return 'green'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm != '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})