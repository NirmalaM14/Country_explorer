// const API_URL = "https://restcountries.com/v3.1";
// let countries = [];
// let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// // Fetch countries on load
// window.onload = () => {
//     fetchCountries();
//     renderFavorites();
// };

// // Fetch countries data from the API
// async function fetchCountries() {
//     try {
//         const response = await fetch(`${API_URL}/all`);
//         countries = await response.json();
//         renderCountryList();
//         populateLanguageOptions(); // Populate language options when countries are fetched
//     } catch (error) {
//         console.error("Error fetching countries:", error);
//     }
// }

// // Populate language options in the dropdown
// function populateLanguageOptions() {
//     const languageFilter = document.getElementById("languageFilter");
//     const languages = new Set();

//     countries.forEach(country => {
//         if (country.languages) {
//             Object.values(country.languages).forEach(lang => languages.add(lang));
//         }
//     });

//     languages.forEach(lang => {
//         const option = document.createElement("option");
//         option.value = lang;
//         option.textContent = lang.charAt(0).toUpperCase() + lang.slice(1); // Capitalize first letter
//         languageFilter.appendChild(option);
//     });
// }

// // Render the country list
// function renderCountryList(filteredCountries = countries) {
//     const countryList = document.getElementById("countryList");
//     countryList.innerHTML = filteredCountries
//         .slice(0, 20) // Limit to first 20 countries initially
//         .map(
//             (country) => `
//                 <div class="country-card">
//                     <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
//                     <p>${country.name.common}</p>
//                     <button onclick="showCountryDetails('${country.cca3}')">View Details</button>
//                     <span class="favorite-icon" onclick="toggleFavorite('${country.cca3}')">
//                         <i class="${isFavorite(country.cca3) ? 'fas fa-heart' : 'far fa-heart'}"></i>
//                     </span>
//                 </div>
//             `
//         )
//         .join("");
// }

// // Show details of a selected country
// function showCountryDetails(countryCode) {
//     const country = countries.find((c) => c.cca3 === countryCode);
//     if (!country) return;

//     const details = document.getElementById("countryInfo");
//     details.innerHTML = `
//         <h2>${country.name.common}</h2>
//         <img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="width: 200px; height: auto;">
//         <p><strong>Capital:</strong> ${country.capital}</p>
//         <p><strong>Region:</strong> ${country.region}</p>
//         <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
//         <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
//         <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
//         <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(", ") : 'N/A'}</p>
//         <button onclick="toggleFavorite('${country.cca3}')">
//             <i class="${isFavorite(country.cca3) ? 'fas fa-heart' : 'far fa-heart'}"></i> 
//             ${isFavorite(country.cca3) ? 'Remove from Favorites' : 'Add to Favorites'}
//         </button>
//     `;
//     document.getElementById("countryDetails").style.display = "block";
// }

// // Close the modal
// function closeDetails() {
//     document.getElementById("countryDetails").style.display = "none";
// }

// // Search functionality
// document.getElementById("searchBtn").addEventListener("click", async () => {
//     const query = document.getElementById("searchInput").value;
//     if (!query) return;

//     try {
//         const response = await fetch(`${API_URL}/name/${query}`);
//         const searchResults = await response.json();
//         renderSearchResults(searchResults);
//     } catch (error) {
//         console.error("Search failed:", error);
//     }
// });

// // Render search results
// function renderSearchResults(results) {
//     const countryList = document.getElementById("countryList");
//     countryList.innerHTML = results
//         .map(
//             (country) => `
//                 <div class="country-card">
//                     <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
//                     <p>${country.name.common}</p>
//                     <button onclick="showCountryDetails('${country.cca3}')">View Details</button>
//                     <span class="favorite-icon" onclick="toggleFavorite('${country.cca3}')">
//                         <i class="${isFavorite(country.cca3) ? 'fas fa-heart' : 'far fa-heart'}"></i>
//                     </span>
//                 </div>
//             `
//         )
//         .join("");
// }

// // Toggle favorite country
// function toggleFavorite(countryCode) {
//     const isFav = favorites.includes(countryCode);
//     if (isFav) {
//         favorites = favorites.filter((code) => code !== countryCode);
//     } else if (favorites.length < 5) {
//         favorites.push(countryCode);
//     }
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//     renderFavorites();
//     renderCountryList(countries); // Re-render country list to update heart icons
//     showCountryDetails(countryCode);
// }

// // Render favorite countries
// function renderFavorites() {
//     const favoriteList = document.getElementById("favoriteList");
//     favoriteList.innerHTML = favorites
//         .map(
//             (code) => {
//                 const country = countries.find((c) => c.cca3 === code);
//                 return country ? `<li onclick="showCountryDetails('${country.cca3}')">${country.name.common}</li>` : "";
//             }
//         )
//         .join("");
// }

// // Check if a country is a favorite
// function isFavorite(countryCode) {
//     return favorites.includes(countryCode);
// }

// // Filter functionality
// document.getElementById("filterBtn").addEventListener("click", () => {
//     const languageFilter = document.getElementById("languageFilter").value;
//     const countryNameFilter = document.getElementById("countryNameFilter").value.toLowerCase();

//     let filteredCountries = countries;

//     // Filter by language
//     if (languageFilter) {
//         filteredCountries = filteredCountries.filter(country =>
//             Object.values(country.languages).includes(languageFilter)
//         );
//     }

//     // Filter by country name
//     if (countryNameFilter) {
//         filteredCountries = filteredCountries.filter(country =>
//             country.name.common.toLowerCase().includes(countryNameFilter)
//         );
//     }

//     renderCountryList(filteredCountries);
// });


const API_URL = "https://restcountries.com/v3.1";
let countries = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Fetch countries on load
window.onload = () => {
    fetchCountries();
    renderFavorites();
};

// Fetch countries data from the API
async function fetchCountries() {
    try {
        const response = await fetch(`${API_URL}/all`);
        countries = await response.json();
        renderCountryList();
        populateLanguageOptions();
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

// Populate language options in the dropdown
function populateLanguageOptions() {
    const languageFilter = document.getElementById("languageFilter");
    const languages = new Set();

    countries.forEach(country => {
        if (country.languages) {
            Object.values(country.languages).forEach(lang => languages.add(lang));
        }
    });

    languages.forEach(lang => {
        const option = document.createElement("option");
        option.value = lang;
        option.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
        languageFilter.appendChild(option);
    });
}

// Render the country list
function renderCountryList(filteredCountries = countries) {
    const countryList = document.getElementById("countryList");
    countryList.innerHTML = filteredCountries
        .map(
            (country) => `
                <div class="country-card">
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                    <p>${country.name.common}</p>
                    <button onclick="showCountryDetails('${country.cca3}')">View Details</button>
                    <span class="favorite-icon" onclick="toggleFavorite('${country.cca3}')">
                        <i class="${isFavorite(country.cca3) ? 'fas fa-heart' : 'far fa-heart'}"></i>
                    </span>
                </div>
            `
        )
        .join("");
}

// Show details of a selected country
function showCountryDetails(countryCode) {
    const country = countries.find((c) => c.cca3 === countryCode);
    if (!country) return;

    const details = document.getElementById("countryInfo");
    details.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" style="width: 200px; height: auto;">
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(", ")}</p>
        <p><strong>Currency:</strong> ${country.currencies ? Object.values(country.currencies).map(curr => curr.name).join(", ") : 'N/A'}</p>
        <button onclick="toggleFavorite('${country.cca3}')">
            <i class="${isFavorite(country.cca3) ? 'fas fa-heart' : 'far fa-heart'}"></i> 
            ${isFavorite(country.cca3) ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    `;
    document.getElementById("countryDetails").style.display = "block";
}

// Close the modal for country details
function closeDetails() {
    document.getElementById("countryDetails").style.display = "none";
}

// Search functionality
document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value;
    if (!query) return;

    try {
        const response = await fetch(`${API_URL}/name/${query}`);
        const searchResults = await response.json();
        renderSearchResults(searchResults);
    } catch (error) {
        console.error("Search failed:", error);
    }
});

// Render search results
function renderSearchResults(results) {
    const countryList = document.getElementById("countryList");
    countryList.innerHTML = results
        .map(
            (country) => `
                <div class="country-card">
                    <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                    <p>${country.name.common}</p>
                    <button onclick="showCountryDetails('${country.cca3}')">View Details</button>
                    <span class="favorite-icon" onclick="toggleFavorite('${country.cca3}')">
                        <i class="${isFavorite(country.cca3) ? 'fas fa-heart' : 'far fa-heart'}"></i>
                    </span>
                </div>
            `
        )
        .join("");
}

// Toggle favorite country
function toggleFavorite(countryCode) {
    const isFav = favorites.includes(countryCode);
    if (isFav) {
        favorites = favorites.filter((code) => code !== countryCode);
    } else if (favorites.length < 5) {
        favorites.push(countryCode);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
    renderCountryList(countries);
    showCountryDetails(countryCode);
}

// Render favorite countries
function renderFavorites() {
    const favoriteList = document.getElementById("favoritesList");
    favoriteList.innerHTML = favorites
        .map(
            (code) => {
                const country = countries.find((c) => c.cca3 === code);
                return country ? `
                    <li onclick="showCountryDetails('${country.cca3}')">
                        ${country.name.common}
                        <span class="remove-favorite" onclick="removeFavorite(event, '${country.cca3}')">&times;</span>
                    </li>` : "";
            }
        )
        .join("");
}

// Remove country from favorites
function removeFavorite(event, countryCode) {
    event.stopPropagation(); // Prevent triggering the country details on click
    favorites = favorites.filter((code) => code !== countryCode);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

// Check if a country is a favorite
function isFavorite(countryCode) {
    return favorites.includes(countryCode);
}

// Open favorites modal
function openFavoritesList() {
    renderFavorites(); // Update the favorites list each time the modal opens
    document.getElementById("favoritesModal").style.display = "block";
}

// Close favorites modal
function closeFavoritesList() {
    document.getElementById("favoritesModal").style.display = "none";
}

// Filter functionality
document.getElementById("filterBtn").addEventListener("click", () => {
    const languageFilter = document.getElementById("languageFilter").value;
    const countryNameFilter = document.getElementById("searchInput").value.toLowerCase();

    let filteredCountries = countries;

    // Filter by language
    if (languageFilter) {
        filteredCountries = filteredCountries.filter(country =>
            Object.values(country.languages).includes(languageFilter)
        );
    }

    // Filter by country name
    if (countryNameFilter) {
        filteredCountries = filteredCountries.filter(country =>
            country.name.common.toLowerCase().includes(countryNameFilter)
        );
    }

    renderCountryList(filteredCountries);
});

