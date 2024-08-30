// Fetch the data from the JSON file
async function fetchData() {
    try {
        const response = await fetch('travel_recommendation_api.json');  // Update with your JSON path
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to search data
async function search() {
    const searchTerm = document.getElementById('Search').value.toLowerCase().trim();
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';  // Clear previous results
    
    const data = await fetchData();
    
    let results = [];

    const beachKeywords = ['beach', 'beache', 'beaches', 'beatches'];
    const countryKeywords = ['country', 'countries', 'nation', 'nations','cntry','contry','ctry'];
    const templeKeywords = ['temple', 'temples', 'temple', 'tampl', 'tamble', 'tambl'];

    if (beachKeywords.includes(searchTerm)) {
        // Add all beaches to results
        data.beaches.forEach(beach => {
            results.push({
                name: beach.name,
                imageUrl: beach.imageUrl,
                description: beach.description
            });
        });
    } else if (countryKeywords.includes(searchTerm)) {
        // Add all countries to results (or you can list cities within countries)
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push({
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description
                });
            });
        });
    } else if (templeKeywords.includes(searchTerm)) {
        // Add all temples to results
        data.temples.forEach(temple => {
            results.push({
                name: temple.name,
                imageUrl: temple.imageUrl,
                description: temple.description
            });
        });
    } else{
         // Search through countries, cities, temples, and beaches
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchTerm)) {
                results.push({
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description
                });
            }
        });
    });

    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(searchTerm)) {
            results.push({
                name: temple.name,
                imageUrl: temple.imageUrl,
                description: temple.description
            });
        }
    });

    data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(searchTerm)) {
            results.push({
                name: beach.name,
                imageUrl: beach.imageUrl,
                description: beach.description
            });
        }
    });

    }

   

    // Display results
    if (results.length > 0) {
        results.forEach(result => {
            const card = document.createElement('div');
            card.classList.add('result-card');
            card.innerHTML = `
                <img src="Images/${result.imageUrl}" alt="${result.name}">
                <h3>${result.name}</h3>
                <p>${result.description}</p>
                <button class="visit-btn" data-link="${result.link}">Visit Now!</button>
            `;
            searchResultsContainer.appendChild(card);
        });
    } else {
        searchResultsContainer.innerHTML = '<p style="color: red;">No results found</p>';
    }
}

// Event listeners for the search and clear buttons
document.getElementById('btnSearch').addEventListener('click', search);

document.getElementById('btnClear').addEventListener('click', () => {
    document.getElementById('Search').value = '';
    document.getElementById('search-results').innerHTML = '';
});

var modal = document.getElementById('thankYouModal');

var span = document.getElementsByClassName('close')[0];

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    modal.style.display = 'block';

    
    this.reset();
});

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

var modal = document.getElementById("bookModal");
    var closeBtn = document.querySelector(".modal2 .close2");

    // Get button and attach event listener
    var bookNowBtn = document.getElementById("btnBookNow");
    bookNowBtn.onclick = function() {
        modal.style.display = "block";
    }

    // Close the modal when clicking on the close button
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when clicking outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }