document.addEventListener('DOMContentLoaded', () => {
    const fetchHouses = () => {
        fetch('/api/houses')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#houses-table tbody');
                tableBody.innerHTML = ''; // Clear the table body

                data.forEach(house => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${house.id}</td>
                        <td>${house.price}</td>
                        <td>${house.sqrft}</td>
                        <td>${house.beds}</td>
                        <td>${house.baths || 'N/A'}</td>
                        <td>${house.type || 'N/A'}</td>
                        <td>${house.location || 'N/A'}</td>
                        <td>${house.dateListed}</td>
                        <td>${house.status || 'N/A'}</td>
                        <td>${house.interestedPpl}</td>
                        <td>
                            <button onclick="deleteHouse(${house.id})">Delete</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    fetchHouses();

    document.getElementById('add-house-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const newHouse = {
            price: document.getElementById('price').value,
            sqrft: document.getElementById('sqrft').value,
            beds: document.getElementById('beds').value,
            baths: document.getElementById('baths').value,
            type: document.getElementById('type').value,
            location: document.getElementById('location').value,
            dateListed: document.getElementById('dateListed').value,
            status: document.getElementById('status').value,
            interestedPpl: document.getElementById('interestedPpl').value
        };

        fetch('/api/houses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newHouse)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchHouses();
        })
        .catch(error => console.error('Error adding house:', error));
    });

    document.getElementById('update-house-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const houseId = document.getElementById('update-id').value;
        const updatedHouse = {
            price: document.getElementById('update-price').value,
            sqrft: document.getElementById('update-sqrft').value,
            beds: document.getElementById('update-beds').value,
            baths: document.getElementById('update-baths').value,
            type: document.getElementById('update-type').value,
            location: document.getElementById('update-location').value,
            dateListed: document.getElementById('update-dateListed').value,
            status: document.getElementById('update-status').value,
            interestedPpl: document.getElementById('update-interestedPpl').value
        };

        fetch(`/api/houses/${houseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedHouse)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            fetchHouses();
        })
        .catch(error => console.error('Error updating house:', error));
    });
});

function deleteHouse(id) {
    fetch(`/api/houses/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        fetchHouses();
    })
    .catch(error => console.error('Error deleting house:', error));
}
