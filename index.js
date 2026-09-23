// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

//Your code here!

// DOM Elements
const stateInput = document.getElementById("state-input");
const fetchBtn = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Event Listener for the button click
fetchBtn.addEventListener("click", () => {
    const state = stateInput.value.trim();
    
    // Clear input field
    stateInput.value = "";

    // Clear previous results/errors before sending the next request
    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    if (!state) {
        showError("Please enter a state abbreviation.");
        return;
    }

    // Fetch the alerts
    fetchWeatherAlerts(state);
});

//Fetch Alerts for a State from the API
function fetchWeatherAlerts(state) {
    fetch(`${weatherApi}${state}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Log to console for testing
            console.log(data); 
            
            //Display Alerts on the Page
            displayAlerts(data);
        })
        .catch(errorObject => {
            //Handle network and API errors
            console.log(errorObject.message);
            showError(errorObject.message);
        });
}

//Display the Alerts on the Page
function displayAlerts(data) {
    const features = data.features || [];
    const alertCount = features.length;
    
    const title = data.title || "Weather Alerts";

    // Create the summary text element
    const summaryElement = document.createElement("h2");
    summaryElement.textContent = `${title}: ${alertCount}`;
    alertsDisplay.appendChild(summaryElement);

    // Create a ul for headlines
    const ul = document.createElement("ul");

    features.forEach(feature => {
        const headlineText = feature.properties.headline;
        const li = document.createElement("li");
        li.textContent = headlineText;
        ul.appendChild(li);
    });

    alertsDisplay.appendChild(ul);
}

// Step 4: Show error message in the dedicated div
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}
