const baseURL = "http://localhost:3000";

// Save films data
function saveFilmsData(){
    console.log('Buy Ticket')
}
saveFilmsData();

save.addEventListener('click', saveFilmsData)

// Retrive the files using GET
function retrivingFilms(){
    fetch(`${baseURL}/films/1`,{
        method: "GET"
    })
    .then(res => res.json())
    .then(data => console.log(data))
}
retrivingFilms();


document.addEventListener('DOMContentLoaded', () => {
    function fetchMovies() {
        fetch('http://localhost:3000/films')
            .then(response => response.json())
            .then(data => {
                const filmsList = document.getElementById('films');
                filmsList.innerHTML = ''
                data.forEach(film => {
                    const listItem = document.createElement('li');
                    listItem.textContent = film.title;
                    listItem.classList.add('film', 'item');
                    filmsList.appendChild(listItem);
                });
            })
            
    }

    function displayMovieDetails(id) {
        fetch(`${baseURL}/films/${id}`)
            .then(response => response.json())
            .then(data => {
                const poster = document.querySelector('#poster');
                const movieTitle = document.querySelector('#title');
                const runtime = document.querySelector('#runtime');
                const filmInfo = document.querySelector('#film-info');
                const showtime = document.querySelector('#showtime');
                const ticketnum = document.querySelector('#ticket-num');

                poster.src = data.poster;
                movieTitle.textContent = data.title;
                runtime.textContent = `${data.runtime} minutes`;
                filmInfo.textContent = data.description;
                showtime.textContent = data.showtime;
                ticketnum.textContent = `${data.capacity - data.tickets_sold}`; 
            })
    }

    // Event listener for buy button
    const buyTicketButton = document.getElementById('buy-ticket');
    buyTicketButton.addEventListener('click', () => {
        // Decrease remaining tickets
        const ticketnum = document.getElementById('ticket-num');
        let remainingTickets = parseInt(ticketnum.textContent);
        if (remainingTickets > 0) {
            remainingTickets--;
            ticketnum.textContent = remainingTickets;

            // Make PATCH request 
            // Let's say our first film id is 1
            const filmId = 1; 
            fetch(`${baseURL}/films/${filmId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "tickets_sold": 28 + 1
                })
            })
            .then(response => response.json())
            .then(updatedMovie => {
            })

            // Make POST request 
            fetch(`${baseURL}/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "film_id": "28",
                    "number_of_tickets": 5
                })
            })
            .then(response => response.json())
            .then(newTicket => {
            })
        } else {
            console.log('Movie is sold out.');
        }
    });
    

    // Event listener for Delete button for each film
    const filmsList = document.getElementById('films');
    filmsList.addEventListener('click', event => {
        if (event.target.classList.contains('delete')) {
            const filmId = event.target.dataset.id;

            // Remove film from the list
            event.target.parentElement.remove();

            // Make DELETE request to delete film from the server
            fetch(`${baseURL}/films/${filmId}`, {
                method: 'DELETE'
            })
            .then(response => {})
            .then(deleteRequest => console.log(deleteRequest))
        }
    });

    // Fetch movies and display on page load
    fetchMovies();
    // Display movie details for the first movie
    displayMovieDetails(1);
});























