document.addEventListener('DOMContentLoaded', function () {
    fetchData();
    const jerseyForm = document.getElementById('jerseyForm');
    jerseyForm.addEventListener('submit', handleFormSubmit);
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.addEventListener('click', deleteData);

});
function fetchData() {
    fetch("http://localhost:3000/jerseys")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const teamNames = data.map(jersey => ({
                team: jersey.team,
                season: jersey.season,
                player: jersey.player,
                number: jersey.number,
                price: jersey.price,
                availability: jersey.availability,
                image: jersey.image,

            })
            );
            console.log(teamNames);

            const container = document.getElementById("container");
            teamNames.forEach(jersey => {


                const jerseyContainer = document.createElement("div")
                jerseyContainer.classList.add("jersey")


                const team = document.createElement("h1");
                team.textContent = jersey.team;

                const season = document.createElement("p");
                season.textContent = jersey.season;

                const player = document.createElement("p");
                player.textContent = jersey.player;

                const number = document.createElement("p");
                number.textContent = jersey.number;

                const price = document.createElement("p");
                price.textContent = jersey.price;

                const availability = document.createElement("p");
                availability.textContent = jersey.availability;

                const image = document.createElement("img");
                image.src = jersey.image;


                jerseyContainer.appendChild(team)
                jerseyContainer.appendChild(player)
                jerseyContainer.appendChild(season)
                jerseyContainer.appendChild(number)
                jerseyContainer.appendChild(availability)
                jerseyContainer.appendChild(image)
                jerseyContainer.appendChild(price)


                container.appendChild(jerseyContainer);
            });
        })

}
function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const dataToSend = {
        team: form.team.value,
        season: form.season.value,
        player: form.player.value,
        number: parseInt(form.number.value),
        price: parseFloat(form.price.value),
        availability: form.availability.checked,
        image: form.image.value
    };

    fetch("http://localhost:3000/jerseys", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
        .then(response => response.json())
        .then(data => {
            console.log('POST request successful:', data);
            fetchData();
            form.reset();
        })
    
}
function deleteData() {
    const itemIdToDelete = 1;

    fetch(`http://localhost:3000/jerseys/${itemIdToDelete}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('DELETE request successful');
                fetchData();
            } else {
                console.error('DELETE request failed:', response.status, response.statusText);
            }
        })
     
}