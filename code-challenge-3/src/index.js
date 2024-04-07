// Your code here
document.addEventListener("DOMContentLoaded", async(event) => {
    const films = await movieList()
    const poster = await movieList()
   displayMovies(films)
   viewMovie(poster)
   displayMovieDetails(films)
  

})

function displayMovies (films) {
 const film = films.map(movie => {
        return `
        <li>
          <div class="movie" id="${movie.id}">
            ${movie.title}
          </div>
        </li>
        `
    })

    const ul = document.getElementById("films")
    ul.innerHTML = film
}


 function viewMovie (poster) {
    const imageCarrier = document.querySelector("#image-carrier")
    const div = document.createElement("div")
    


    const view = document.querySelectorAll(".movie")
    view.forEach(show => {
        show.addEventListener("click", (event) => {
            const viewPoster = poster.find((element)=> element.id === event.target.id)
            div.innerHTML = `
             <img class="posters" src="${viewPoster.poster}" alt="Movie poster"/>
            `
            imageCarrier.appendChild(div)
        })
    
    })

 }


 function displayMovieDetails (films) {
    const details = document.querySelector("#showing")
    const carrier = document.createElement("div")


    const view = document.querySelectorAll(".movie")
    view.forEach(show => {
    show.addEventListener("click", (event)=> {
       const viewDetails = films.find((element) => element.id === event.target.id)
       carrier.innerHTML = `
       <div class="card">
       <div id="title" class="title">${viewDetails.title}</div>
       <div id="runtime" class="meta">${viewDetails.runtime} minutes</div>
       <div class="content" id="details">
         <div class="description">
           <div id="film-info">${viewDetails.description}</div>
           <span id="showtime" class="ui label">${viewDetails.showtime}</span>
           <span id="ticket-num">${viewDetails.capacity} remaining</span> 
         </div>
       </div>
     </div>       
       
       `
       details.appendChild(carrier)
    })
   })
 }

 const btn = document.querySelector("#buyTicket")
    btn.addEventListener("click", (event) => {
        
     let remainingTickets = document.querySelector("#ticket-num")
    
     event.preventDefault()
     if(remainingTickets > 0){
        const counter = document.querySelector("#ticket-num")
        counter.textContent = remainingTickets - 1
     }else if (parseInt(remainingTickets, 10)===0){
        btn.textContent = "Sold out"
    }

    })

function movieList () {
    return fetch("http://localhost:3000/films",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        }
    })
    .then(resp => resp.json())
    .then(data => data)
}