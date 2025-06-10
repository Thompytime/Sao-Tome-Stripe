// --- 1. GLOBAL DATA DEFINITIONS ---
// These variables MUST be defined outside the DOMContentLoaded listener.

const imageNameMap = {
    'Água Grande_District': 'Água Grande',
    'Cantagalo_District': 'Cantagalo',
    'Lembá_District': 'Lembá',
    'Lobata_District': 'Lobata',
    'Mé-Zóchi_District': 'Mé-Zóchi',
    'Pagué_District - Autonomous Region of Príncipe': 'Pagué',
    'Caué_District': 'Caué'
};

const portugueseDistrictNames = [
    "Água Grande",
    "Cantagalo",
    "Caué",
    "Lembá",
    "Lobata",
    "Mé-Zóchi",
    "Pagué",
];

const countyData = {
    "Água Grande": {
        "Cantagalo": { "miles": 10, "kilometers": 16, "direction": "S" },
        "Caué": { "miles": 23, "kilometers": 36, "direction": "S" },
        "Lembá": { "miles": 17, "kilometers": 27, "direction": "SW" },
        "Lobata": { "miles": 8, "kilometers": 12, "direction": "NW" },
        "Mé-Zóchi": { "miles": 6, "kilometers": 10, "direction": "SW" },
        "Pagué": { "miles": 112, "kilometers": 180, "direction": "N" }
    },
    "Cantagalo": {
        "Água Grande": { "miles": 10, "kilometers": 16, "direction": "N" },
        "Caué": { "miles": 15, "kilometers": 24, "direction": "S" },
        "Lembá": { "miles": 25, "kilometers": 40, "direction": "W" },
        "Lobata": { "miles": 15, "kilometers": 25, "direction": "NW" },
        "Mé-Zóchi": { "miles": 8, "kilometers": 12, "direction": "W" },
        "Pagué": { "miles": 109, "kilometers": 176, "direction": "N" }
    },
    "Caué": {
        "Água Grande": { "miles": 23, "kilometers": 36, "direction": "N" },
        "Cantagalo": { "miles": 15, "kilometers": 24, "direction": "N" },
        "Lembá": { "miles": 18, "kilometers": 29, "direction": "NW" },
        "Lobata": { "miles": 25, "kilometers": 40, "direction": "N" },
        "Mé-Zóchi": { "miles": 18, "kilometers": 29, "direction": "N" },
        "Pagué": { "miles": 106, "kilometers": 171, "direction": "N" }
    },
    "Lembá": {
        "Água Grande": { "miles": 17, "kilometers": 27, "direction": "NE" },
        "Cantagalo": { "miles": 25, "kilometers": 40, "direction": "E" },
        "Caué": { "miles": 18, "kilometers": 29, "direction": "SE" },
        "Lobata": { "miles": 12, "kilometers": 20, "direction": "NE" },
        "Mé-Zóchi": { "miles": 12, "kilometers": 20, "direction": "E" },
        "Pagué": { "miles": 106, "kilometers": 171, "direction": "N" }
    },
    "Lobata": {
        "Água Grande": { "miles": 8, "kilometers": 12, "direction": "SE" },
        "Cantagalo": { "miles": 15, "kilometers": 25, "direction": "SE" },
        "Caué": { "miles": 25, "kilometers": 40, "direction": "S" },
        "Lembá": { "miles": 12, "kilometers": 20, "direction": "SW" },
        "Mé-Zóchi": { "miles": 9, "kilometers": 14, "direction": "S" },
        "Pagué": { "miles": 112, "kilometers": 181, "direction": "N" }
    },
    "Mé-Zóchi": {
        "Água Grande": { "miles": 6, "kilometers": 10, "direction": "NE" },
        "Cantagalo": { "miles": 8, "kilometers": 12, "direction": "E" },
        "Caué": { "miles": 18, "kilometers": 29, "direction": "S" },
        "Lembá": { "miles": 12, "kilometers": 20, "direction": "W" },
        "Lobata": { "miles": 9, "kilometers": 14, "direction": "N" },
        "Pagué": { "miles": 109, "kilometers": 175, "direction": "N" }
    },
    "Pagué": {
        "Água Grande": { "miles": 112, "kilometers": 180, "direction": "S" },
        "Cantagalo": { "miles": 109, "kilometers": 176, "direction": "S" },
        "Caué": { "miles": 106, "kilometers": 171, "direction": "S" },
        "Lembá": { "miles": 106, "kilometers": 171, "direction": "S" },
        "Lobata": { "miles": 112, "kilometers": 181, "direction": "S" },
        "Mé-Zóchi": { "miles": 109, "kilometers": 175, "direction": "S" }
    }
};

const countyCoordinates = {
    "Água Grande": { "lat": 0.3365, "lon": 6.7273 },
    "Cantagalo": { "lat": 0.2167, "lon": 6.6833 },
    "Caué": { "lat": 0.0167, "lon": 6.5333 },
    "Lembá": { "lat": 0.2667, "lon": 6.5167 },
    "Lobata": { "lat": 0.3667, "lon": 6.6333 },
    "Mé-Zóchi": { "lat": 0.3000, "lon": 6.6500 },
    "Pagué": { "lat": 1.6333, "lon": 7.4167 }
};

const countyImages = [
    'Água Grande_District.svg',
    'Cantagalo_District.svg',
    'Lembá_District.svg',
    'Lobata_District.svg',
    'Mé-Zóchi_District.svg',
    'Pagué_District - Autonomous Region of Príncipe.svg',
    'Caué_District.svg'
];

// --- 2. DISTANCE CALCULATION FUNCTIONS AND MAX DISTANCE ---

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Haversine formula to calculate distance between two lat/lon points in km
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
}

let maxCalculatedDistanceKm = 0;

for (const countyA in countyCoordinates) {
    if (countyCoordinates.hasOwnProperty(countyA)) {
        const coordsA = countyCoordinates[countyA];
        for (const countyB in countyCoordinates) {
            if (countyCoordinates.hasOwnProperty(countyB)) {
                if (countyA === countyB) {
                    continue;
                }
                const coordsB = countyCoordinates[countyB];
                const distance = calculateDistance(
                    coordsA.lat,
                    coordsA.lon,
                    coordsB.lat,
                    coordsB.lon
                );
                if (distance > maxCalculatedDistanceKm) {
                    maxCalculatedDistanceKm = distance;
                }
            }
        }
    }
}

// Add a 5% buffer and round up to a whole number for maxDistanceKm
const maxDistanceKm = Math.ceil(maxCalculatedDistanceKm * 1.05);
console.log("Dynamically calculated maxDistanceKm for São Tomé and Príncipe:", maxDistanceKm, "km");

// Helper function to generate correct key for imageNameMap lookup
function generateImageKey(imageName) {
    // Remove .svg extension only
    return imageName.replace('.svg', '');
}

// --- 3. DOMContentLoaded LISTENER ---
document.addEventListener('DOMContentLoaded', () => {

    const countyNames = countyImages.map(image => image.replace('.svg', '').replace(' - Autonomous Region of Príncipe', ''));

    const guessInput = document.getElementById('guess-input');
    const dropdown = document.getElementById('dropdown-options');
    const countyImage = document.getElementById('county-image');
    const submitGuessButton = document.getElementById('submit-guess');
    const reloadButton = document.getElementById('reload-button');
    const playButton = document.getElementById('play-button');
    const feedbackElement = document.getElementById('feedback');
    const attemptsLeftElement = document.getElementById('attempts-left');

    if (!guessInput || !dropdown || !countyImage || !submitGuessButton || !reloadButton || !playButton || !feedbackElement || !attemptsLeftElement) {
        console.error('Critical DOM elements missing:', {
            guessInput: !!guessInput,
            dropdown: !!dropdown,
            countyImage: !!countyImage,
            submitGuessButton: !!submitGuessButton,
            reloadButton: !!reloadButton,
            playButton: !!playButton,
            feedbackElement: !!feedbackElement,
            attemptsLeftElement: !!attemptsLeftElement
        });
        if (feedbackElement) {
            feedbackElement.textContent = 'Error: Game elements not found. Please refresh the page.';
        }
        return;
    }

    let currentCountyIndex = Math.floor(Math.random() * countyImages.length);
    let attemptsLeft = 5;
    let incorrectGuesses = [];
    // Fixed: Use correct key generation for imageNameMap lookup
    let correctAnswer = imageNameMap[generateImageKey(countyImages[currentCountyIndex])];
    let gameOver = false;

    // Add safety check for correctAnswer
    if (!correctAnswer) {
        console.error('Failed to find correct answer for image:', countyImages[currentCountyIndex]);
        console.error('Generated key:', generateImageKey(countyImages[currentCountyIndex]));
        console.error('Available keys:', Object.keys(imageNameMap));
        correctAnswer = 'Unknown'; // Fallback value
    }

    countyImage.src = 'images SAO/' + countyImages[currentCountyIndex];
    attemptsLeftElement.textContent = `Attempts left: ${attemptsLeft}`;

    // Add error handling for image loading
    countyImage.onerror = () => {
        console.error('Failed to load image:', countyImage.src);
        feedbackElement.textContent = 'Error loading district image. Please refresh.';
    };

    guessInput.addEventListener('input', function () {
        if (!dropdown) {
            console.error('dropdown is null in input handler');
            return;
        }
        const inputValue = guessInput.value.trim().toLowerCase();
        dropdown.innerHTML = '';
        let filteredCounties = inputValue.length === 0
            ? portugueseDistrictNames
            : portugueseDistrictNames.filter(county => county.toLowerCase().includes(inputValue));

        filteredCounties.forEach(county => {
            const option = document.createElement('div');
            option.classList.add('dropdown-option');
            option.textContent = county;
            option.addEventListener('click', () => {
                guessInput.value = option.textContent;
                dropdown.style.display = 'none';
            });
            dropdown.appendChild(option);
        });
        dropdown.style.display = filteredCounties.length > 0 ? 'block' : 'none';
    });

    guessInput.addEventListener('click', function () {
        if (!dropdown) {
            console.error('dropdown is null in click handler');
            return;
        }
        dropdown.innerHTML = '';
        portugueseDistrictNames.forEach(portugueseName => {
            const option = document.createElement('div');
            option.classList.add('dropdown-option');
            option.textContent = portugueseName;
            option.addEventListener('click', () => {
                guessInput.value = portugueseName;
                dropdown.style.display = 'none';
            });
            dropdown.appendChild(option);
        });
        dropdown.style.display = 'block';
    });

    document.addEventListener('click', event => {
        if (!guessInput.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    function showModal(message) {
        closeModal();
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <p>${message}</p>
            <button class="modal-button">OK</button>
        `;
        document.body.appendChild(modal);
        const modalButton = modal.querySelector('.modal-button');
        modalButton.addEventListener('click', closeModal);
        modal.style.display = 'block';
    }

    function closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    }

    function showAlert(message) {
        closeAlert();
        const alertModal = document.createElement('div');
        alertModal.classList.add('modal');
        alertModal.innerHTML = `
            <p>${message}</p>
            <button class="modal-button">OK</button>
        `;
        document.body.appendChild(alertModal);
        const modalButton = alertModal.querySelector('.modal-button');
        modalButton.addEventListener('click', closeAlert);
        alertModal.style.display = 'block';
    }

    function closeAlert() {
        const alertModal = document.querySelector('.modal');
        if (alertModal) {
            alertModal.style.display = 'none';
            document.body.removeChild(alertModal);
        }
    }

    submitGuessButton.addEventListener('click', function () {
        if (gameOver) return;

        if (!guessInput) {
            console.error('guessInput is null in submit-guess handler');
            showAlert('Input field not found. Please refresh the page.');
            return;
        }

        // Add safety check for correctAnswer
        if (!correctAnswer || correctAnswer === 'Unknown') {
            console.error('correctAnswer is invalid:', correctAnswer);
            showAlert('Game error: Please refresh the page.');
            return;
        }

        const userGuess = guessInput.value.trim();
        if (!userGuess) {
            showAlert('Please enter a guess!');
            return;
        }
        const normalizedUserGuess = userGuess.toLowerCase();
        const normalizedCorrectAnswer = correctAnswer.toLowerCase();

        const acceptableAnswers = [normalizedCorrectAnswer];
        // Ensure this normalization matches the keys in imageNameMap
        const imageFileNameWithoutSvg = generateImageKey(countyImages[currentCountyIndex]);
        const englishVersionDerived = imageFileNameWithoutSvg.toLowerCase()
                                        .replace(/_/g, ' ')
                                        .replace(' district', '')
                                        .replace(' - autonomous region of príncipe', '');
        acceptableAnswers.push(englishVersionDerived);


        if (!portugueseDistrictNames.map(name => name.toLowerCase()).includes(normalizedUserGuess) && !Object.values(imageNameMap).map(name => name.toLowerCase()).includes(normalizedUserGuess) && !englishVersionDerived.includes(normalizedUserGuess)) {
            showAlert("Unknown District!"); // Changed to District for São Tomé
            return;
        }


        if (acceptableAnswers.includes(normalizedUserGuess)) {
            feedbackElement.textContent = `The correct district is ${correctAnswer}. You know your district Lines!`;
            feedbackElement.style.color = 'green';
            showModal(`The correct district is ${correctAnswer}. You know your district Lines!`);
            gameOver = true;
        } else {
            attemptsLeft--;
            attemptsLeftElement.textContent = `Attempts left: ${attemptsLeft}`;
            incorrectGuesses.push(userGuess);

            let distanceMessage = "Incorrect, distance data not available for this guess.";
            let distanceMiles = null;
            let distanceKms = null;
            let direction = null;
            let percentage = 0;

            if (countyData[correctAnswer]?.[userGuess]) {
                distanceMiles = countyData[correctAnswer][userGuess].miles;
                distanceKms = countyData[correctAnswer][userGuess].kilometers;
                direction = countyData[correctAnswer][userGuess].direction;
                percentage = 100 * (1 - distanceKms / maxDistanceKm);
                if (percentage < 0) percentage = 0;
            } else if (countyData[userGuess]?.[correctAnswer]) {
                distanceMiles = countyData[userGuess][correctAnswer].miles;
                distanceKms = countyData[userGuess][correctAnswer].kilometers;
                direction = countyData[userGuess][correctAnswer].direction;
                percentage = 100 * (1 - distanceKms / maxDistanceKm);
                if (percentage < 0) percentage = 0;
            }

            if (distanceMiles !== null && distanceKms !== null && direction !== null) {
                distanceMessage = `Incorrect, ${userGuess} is approximately ${Math.round(distanceMiles)} miles / ${Math.round(distanceKms)} km away.<br>`;

                const directionToArrow = {
                    "N": "South", "NE": "South West", "E": "West", "SE": "North West",
                    "S": "North", "SW": "North East", "W": "East", "NW": "South East"
                };
                const arrowFileName = directionToArrow[direction] || "North";

                const arrowImage = document.createElement('img');
                arrowImage.src = `images/Arrow ${arrowFileName}.svg`;
                arrowImage.alt = `Direction: ${direction}`;
                arrowImage.classList.add('direction-arrow');
                arrowImage.onerror = () => {
                    console.error('Failed to load arrow image:', arrowImage.src);
                    feedbackElement.textContent = 'Error loading direction arrow.';
                };

                const currentRow = 4 - attemptsLeft;
                if (currentRow >= 0 && currentRow <= 4) {
                    const incorrectGuessElement = document.getElementById(`incorrect-guess-${currentRow}`);
                    const distanceElement = document.getElementById(`distance-${currentRow}`);
                    const arrowContainer = document.getElementById(`direction-arrow-container-${currentRow}`);
                    const percentageElement = document.getElementById(`percentage-${currentRow}`);
                    if (incorrectGuessElement && distanceElement && arrowContainer && percentageElement) {
                        incorrectGuessElement.value = userGuess;
                        distanceElement.value = `${Math.round(distanceMiles)} miles / ${Math.round(distanceKms)} km`;
                        arrowContainer.innerHTML = '';
                        arrowContainer.appendChild(arrowImage);
                        percentageElement.value = `${Math.round(percentage)}%`;
                    }
                }

                distanceMessage += ` The desired district is ${directionToArrow[direction] || direction} of ${userGuess}.`;
            }

            feedbackElement.innerHTML = distanceMessage;
            feedbackElement.style.color = 'red';

            if (attemptsLeft === 0) {
                feedbackElement.innerHTML = `Incorrect! The correct district is <span style="color: black;">${correctAnswer}</span>. You are in a Right State!`;
                feedbackElement.style.color = 'red';
                showModal(`Incorrect! The correct district is ${correctAnswer}. You are in a Right State!`);
                gameOver = true;
            }
        }

        if (gameOver) {
            guessInput.disabled = true;
            submitGuessButton.disabled = true;
        }

        guessInput.value = '';
        dropdown.style.display = 'none';
    });

    reloadButton.addEventListener('click', function () {
        attemptsLeft = 5;
        incorrectGuesses = [];
        gameOver = false;

        for (let i = 0; i <= 4; i++) {
            const incorrectGuessElement = document.getElementById(`incorrect-guess-${i}`);
            const distanceElement = document.getElementById(`distance-${i}`);
            const arrowContainer = document.getElementById(`direction-arrow-container-${i}`);
            const percentageElement = document.getElementById(`percentage-${i}`);
            if (incorrectGuessElement && distanceElement && arrowContainer && percentageElement) {
                incorrectGuessElement.value = '';
                distanceElement.value = '';
                arrowContainer.innerHTML = '';
                percentageElement.value = '';
            }
        }
        feedbackElement.textContent = '';
        attemptsLeftElement.textContent = `Attempts left: ${attemptsLeft}`;

        currentCountyIndex = Math.floor(Math.random() * countyImages.length);
        // Fixed: Use correct key generation for imageNameMap lookup
        correctAnswer = imageNameMap[generateImageKey(countyImages[currentCountyIndex])];
        
        // Add safety check for correctAnswer on reload
        if (!correctAnswer) {
            console.error('Failed to find correct answer for image on reload:', countyImages[currentCountyIndex]);
            correctAnswer = 'Unknown'; // Fallback value
        }
        
        countyImage.src = 'images SAO/' + countyImages[currentCountyIndex];

        guessInput.disabled = false;
        submitGuessButton.disabled = false;
        guessInput.value = '';
        dropdown.style.display = 'none';
        closeModal();
    });

    playButton.addEventListener('click', function () {
        const startScreen = document.getElementById('start-screen');
        const gameContainer = document.getElementById('game-container');
        if (startScreen && gameContainer) {
            startScreen.style.display = 'none';
            gameContainer.style.display = 'block';
        }
    });
});