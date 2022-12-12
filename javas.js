const API_URL="http://www.omdbapi.com/?i=tt3896198&apikey=7a9d990b&s=";
const API_URL_ID= "http://www.omdbapi.com/?apikey=7a9d990b&i=";

var search_input=document.getElementById("search_input");
var card = document.getElementsByClassName("moviecards")[0];


document.getElementsByClassName("button")[0].addEventListener("click",function(){
    console.log(search_input.value);
    const query = search_input.value;
    if(query){
        getmovies(API_URL+query);
    }
});

async function getmovies(url){
    const resp = await fetch(url);
    const respdata = await resp.json();
    console.log(respdata);
    showmovies(respdata.Search);
}

function showmovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const moviedata=await fetch(API_URL_ID+movie.imdbID);
        const moviedataobj = await moviedata.json();
        moviedisplay(moviedataobj);
    });
}


function moviedisplay(imovie){
    const movieelm=document.createElement("div");
    movieelm.classList.add("moviecards");
    movieelm.innerHTML=`
    <div class="card">
    <img src="${imovie.Poster}" alt="poster" width ="300px" height="300px"/>
    <br>
    <div class = "movie_des">
      <span class="movie-title"><b>TITLE</b><span class="value">${imovie.Title}</span></span>
      <span class="movie-title"><b>RATING</b><span class="value">${imovie.imbdRating}</span></span>
      <span class="movie-title"><b>DIRECTOR</b><span class="value">${imovie.Director}</span></span>
      <span class="movie-title"><b>RELEASED ON</b><span class="value">${imovie.Released}</span></span>
      <span class="movie-title"><b>GENRE</b><span class="value">${imovie.Genre}</span></span>
      
     </div>
    </div>
    
`;
card.appendChild(movieelm);
}