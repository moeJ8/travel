const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

function searchCondition(){
    const input = document.getElementById("Search").value.toLowerCase();
    const searchResult = document.getElementById("search-results");
    searchResult.innerHTML='';
    fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data =>{
        const country = data.countries.find(item => item.name.toLowerCase() === input);
        if(country){
            searchResult.innerHTML += `<h2>${countries.name}</h2>`;
            searchResult.innerHTML += `<h2>${countries.cities.name}</h2>`;
        }
    })
}