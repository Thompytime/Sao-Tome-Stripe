document.addEventListener('DOMContentLoaded', () => {
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
let correctAnswer = imageNameMap[countyImages[currentCountyIndex].replace('.svg', '')];
let gameOver = false;
const maxDistanceKm = 150;

countyImage.src = '/images-sao/' + countyImages[currentCountyIndex];
attemptsLeftElement.textContent = `Attempts left: ${attemptsLeft}`;

countyImage.onerror = () => {
    console.error('Failed to load image:', countyImage.src);
    feedbackElement.textContent = 'Error loading district image. Please refresh.';
};

guessInput.addEventListener('input', function () {
    const inputValue = guessInput.value.trim().toLowerCase();
    dropdown.innerHTML = '';
    let filtered = inputValue.length === 0
        ? portugueseDistrictNames
        : portugueseDistrictNames.filter(county => county.toLowerCase().includes(inputValue));
    filtered.forEach(county => {
        const option = document.createElement('div');
        option.classList.add('dropdown-option');
        option.textContent = county;
        option.addEventListener('click', () => {
            guessInput.value = county;
            dropdown.style.display = 'none';
        });
        dropdown.appendChild(option);
    });
    dropdown.style.display = filtered.length > 0 ? 'block' : 'none';
});

guessInput.addEventListener('click', function () {
    dropdown.innerHTML = '';
    portugueseDistrictNames.forEach(name => {
        const option = document.createElement('div');
        option.classList.add('dropdown-option');
        option.textContent = name;
        option.addEventListener('click', () => {
            guessInput.value = name;
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
    modal.innerHTML = `<p>${message}</p><button class="modal-button">OK</button>`;
    document.body.appendChild(modal);
    modal.querySelector('.modal-button').addEventListener('click', closeModal);
    modal.style.display = 'block';
}

function showAlert(message) {
    closeAlert();
    const alertModal = document.createElement('div');
    alertModal.classList.add('modal');
    alertModal.innerHTML = `<p>${message}</p><button class="modal-button">OK</button>`;
    document.body.appendChild(alertModal);
    alertModal.querySelector('.modal-button').addEventListener('click', closeAlert);
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

    const userGuess = guessInput.value.trim();
    if (!userGuess) {
        showAlert('Please enter a guess!');
        return;
    }

    const normalizedGuess = userGuess.toLowerCase();
    const correctNormalized = correctAnswer.toLowerCase();
    const englishVersion = countyImages[currentCountyIndex]
        .replace('.svg', '')
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(' district', '')
        .replace(' - autonomous region of príncipe', '');
    const acceptableAnswers = [correctNormalized, englishVersion];

    const knownNames = portugueseDistrictNames.map(n => n.toLowerCase())
        .concat(countyImages.map(name => name.toLowerCase().replace(/_/g, ' ').replace('.svg', '').replace(' district', '').replace(' - autonomous region of príncipe', '')));
    if (!knownNames.includes(normalizedGuess)) {
        showAlert("Unknown County!");
        return;
    }

    if (acceptableAnswers.includes(normalizedGuess)) {
        feedbackElement.textContent = `The correct district is ${correctAnswer}. You know your district Lines!`;
        feedbackElement.style.color = 'green';
        showModal(`The correct county is ${correctAnswer}. You know your district Lines!`);
        gameOver = true;
    } else {
        attemptsLeft--;
        attemptsLeftElement.textContent = `Attempts left: ${attemptsLeft}`;
        incorrectGuesses.push(userGuess);

        let miles = null, kms = null, dir = null, percent = 0;

        if (countyData[correctAnswer]?.[userGuess]) {
            ({ miles, kilometers: kms, direction: dir } = countyData[correctAnswer][userGuess]);
        } else if (countyData[userGuess]?.[correctAnswer]) {
            ({ miles, kilometers: kms, direction: dir } = countyData[userGuess][correctAnswer]);
        }

        if (kms != null) {
            percent = Math.max(0, 100 * (1 - kms / maxDistanceKm));
        }

        const directionToArrow = {
            "N": "South", "NE": "South West", "E": "West", "SE": "North West",
            "S": "North", "SW": "North East", "W": "East", "NW": "South East"
        };

        const row = 4 - attemptsLeft;
        const guessEl = document.getElementById(`incorrect-guess-${row}`);
        const distEl = document.getElementById(`distance-${row}`);
        const arrowEl = document.getElementById(`direction-arrow-container-${row}`);
        const percEl = document.getElementById(`percentage-${row}`);

        if (guessEl && distEl && arrowEl && percEl) {
            guessEl.value = userGuess;
            distEl.value = miles && kms ? `${Math.round(miles)} miles / ${Math.round(kms)} km` : '';
            arrowEl.innerHTML = '';
            if (dir && directionToArrow[dir]) {
                const img = document.createElement('img');
                img.src = `/images/Arrow ${directionToArrow[dir]}.svg`;
                img.alt = `Direction: ${dir}`;
                img.classList.add('direction-arrow');
                arrowEl.appendChild(img);
            }
            percEl.value = `${Math.round(percent)}%`;
        }

        feedbackElement.innerHTML = miles && kms && dir
            ? `Incorrect, ${userGuess} is approximately ${Math.round(miles)} miles / ${Math.round(kms)} km away.<br>The desired district is ${directionToArrow[dir] || dir} of ${userGuess}.`
            : "Incorrect, distance data not available for this guess.";
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

playButton.addEventListener('click', function () {
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    if (startScreen && gameContainer) {
        startScreen.style.display = 'none';
        gameContainer.style.display = 'block';
    }

    playsDone++;
});

reloadButton.addEventListener('click', function () {
    if (!hasPaid && playsDone >= 1) {
        showPaywall();
        return;
    }

    attemptsLeft = 5;
    incorrectGuesses = [];
    gameOver = false;

    for (let i = 0; i <= 4; i++) {
        const guessEl = document.getElementById(`incorrect-guess-${i}`);
        const distEl = document.getElementById(`distance-${i}`);
        const arrowEl = document.getElementById(`direction-arrow-container-${i}`);
        const percEl = document.getElementById(`percentage-${i}`);
        if (guessEl && distEl && arrowEl && percEl) {
            guessEl.value = '';
            distEl.value = '';
            arrowEl.innerHTML = '';
            percEl.value = '';
        }
    }

    feedbackElement.textContent = '';
    attemptsLeftElement.textContent = `Attempts left: ${attemptsLeft}`;

    currentCountyIndex = Math.floor(Math.random() * countyImages.length);
    correctAnswer = imageNameMap[countyImages[currentCountyIndex].replace('.svg', '')];
    countyImage.src = '/images-sao/' + countyImages[currentCountyIndex];

    guessInput.disabled = false;
    submitGuessButton.disabled = false;
    guessInput.value = '';
    dropdown.style.display = 'none';
    closeModal();

    playsDone++;
});

// Handle Stripe success
if (window.location.search.includes('success=true')) {
    hasPaid = true;
    alert('Payment successful! Unlimited plays unlocked.');
}
});

// --- Global vars and payment logic ---
let playsDone = 0;
let hasPaid = false;

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    }
}

function showPaywall() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <p>You have reached your free game limit. Unlock unlimited plays for $5!</p>
        <button id="pay-button">Pay Now</button>
        <button class="modal-button">Cancel</button>
    `;
    document.body.appendChild(modal);

    document.getElementById('pay-button').addEventListener('click', () => {
        closeModal();
        startPayment();
    });

    modal.querySelector('.modal-button').addEventListener('click', closeModal);
    modal.style.display = 'block';
}

async function startPayment() {
    try {
        const response = await fetch('/api/create-checkout-session', { method: 'POST' });
        const data = await response.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert('Payment initiation failed.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Payment error. Please try again.');
    }
}
