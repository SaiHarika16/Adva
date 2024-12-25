const boat = document.getElementById('boat');
const boatWidth = 281;
const boatHeight = 281;
const wasteWidth = 3 * 37.8;  // Width in pixels for 3 cm
const wasteHeight = 3 * 37.8; // Height in pixels for 3 cm

let boatX = window.innerWidth / 2;
let boatY = window.innerHeight - 246 - boatHeight;

let boatSpeed = 10;

let wastes = [];
let score = 0;
let time = 30;
let gameInterval;
let timerInterval;
let wasteInterval;

// Retrieve previous high score from localStorage
let highScore = localStorage.getItem('highScore') || 0;

const pollutants = [
    { type: 'plastic', image: 'bottle.png' },
    { type: 'oil', image: 'oil-spill.png' },
    { type: 'chemical', image: 'toxic.png' },
    { type: 'fish', image: 'fish.png' },
    { type: 'sewage', image: 'sewage.png' }
];

const collected = {
    plastic: parseInt(localStorage.getItem('plasticScore')) || 0,
    oil: parseInt(localStorage.getItem('oilScore')) || 0,
    chemical: parseInt(localStorage.getItem('chemicalScore')) || 0,
    fish: parseInt(localStorage.getItem('fishScore')) || 0,
    sewage: parseInt(localStorage.getItem('sewageScore')) || 0
};

document.addEventListener('keydown', moveBoat);

function moveBoat(e) {
    if (e.key === 'ArrowLeft' && boatX > boatWidth / 2) {
        boatX -= boatSpeed;
    } else if (e.key === 'ArrowRight' && boatX < window.innerWidth - boatWidth / 2) {
        boatX += boatSpeed;
    }
    boat.style.left = `${boatX}px`;
}


function generateWaste() {
    const x = Math.random() * (window.innerWidth - wasteWidth);
    const y = -wasteHeight;
    const typeIndex = Math.floor(Math.random() * pollutants.length);
    const waste = pollutants[typeIndex];
    wastes.push({ x, y, type: waste.type, image: waste.image });
    drawWaste(x, y, waste.image);
}

function drawWaste(x, y, image) {
    const wasteElem = document.createElement('img');
    wasteElem.src = image;
    wasteElem.classList.add('waste');
    wasteElem.style.width = `${wasteWidth}px`;
    wasteElem.style.height = `${wasteHeight}px`;
    wasteElem.style.left = `${x}px`;
    wasteElem.style.top = `${y}px`;
    document.body.appendChild(wasteElem);
}

function updateWastes() {
    wastes.forEach((waste, index) => {
        waste.y += 2;
        const wasteElem = document.querySelectorAll('.waste')[index];
        if (wasteElem) {
            wasteElem.style.top = `${waste.y}px`;
        }
        if (waste.y > window.innerHeight) {
            wastes.splice(index, 1);
            wasteElem.remove();
        }
    });
}

function checkCollision() {
    wastes.forEach((waste, index) => {
        const wasteElem = document.querySelectorAll('.waste')[index];
        const wasteCenterX = waste.x + wasteWidth / 2;
        const wasteCenterY = waste.y + wasteHeight / 2;
        const boatLeft = boatX - boatWidth / 2;
        const boatRight = boatX + boatWidth / 2;
        const boatTop = boatY;
        const boatBottom = boatY + boatHeight;

        if (
            wasteCenterX > boatLeft &&
            wasteCenterX < boatRight &&
            wasteCenterY > boatTop &&
            wasteCenterY < boatBottom
        ) {
            score += 1;
            wastes.splice(index, 1);
            wasteElem.remove();

            // Track collected items using the type
            collected[waste.type] += 1;

            // Save collected data to localStorage
            localStorage.setItem(`${waste.type}Score`, collected[waste.type]);

            updateScore();
        }
    });
}


function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

function updateTimer() {
    document.getElementById('timer').innerText = `Time: ${time} seconds`;
}

function gameLoop() {
    updateWastes();
    checkCollision();
}

function startGame() {
    // Clear existing wastes
    document.querySelectorAll('.waste').forEach(waste => waste.remove());

    // Clear intervals
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    clearInterval(wasteInterval);

    // Reset game state
    wastes = [];
    score = 0;
    time = 30;

    // Initialize boat position
    boatX = window.innerWidth / 2;
    boat.style.left = `${boatX}px`;

    // Start game
    generateWaste();
    gameInterval = setInterval(gameLoop, 1000 / 60); // Game loop running at 60 FPS
    timerInterval = setInterval(() => {
        time--;
        updateTimer();

        if (time <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            clearInterval(wasteInterval);
            displayDashboard();
        }
    }, 1000);

    wasteInterval = setInterval(generateWaste, 2000); // Generates waste every 2 seconds
}

function displayDashboard() {
    // Update high score if needed
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }

    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = `
        <p>Plastic: ${collected.plastic} <button id="explore-plastic" class="explore-btn" ${collected.plastic >= 5 ? '' : 'disabled'} onclick="explore('plastic')">Explore</button></p>
        <p>Oil Spills: ${collected.oil} <button id="explore-oil" class="explore-btn" ${collected.oil >= 5 ? '' : 'disabled'} onclick="explore('oil')">Explore</button></p>
        <p>Chemical Runoff: ${collected.chemical} <button id="explore-chemical" class="explore-btn" ${collected.chemical >= 5 ? '' : 'disabled'} onclick="explore('chemical')">Explore</button></p>
        <p>Overfishing: ${collected.fish} <button id="explore-fish" class="explore-btn" ${collected.fish >= 5 ? '' : 'disabled'} onclick="explore('fish')">Explore</button></p>
        <p>Sewage: ${collected.sewage} <button id="explore-sewage" class="explore-btn" ${collected.sewage >= 5 ? '' : 'disabled'} onclick="explore('sewage')">Explore</button></p>
        <p>High Score: ${highScore}</p>
        <button id="play-again" class="explore-btn" onclick="restartGame()">Play Again</button>
    `;
    alert('Time is up! Check the dashboard for the impact of your collected waste.');
}

function explore(type) {
    if (type === 'plastic') {
        window.location.href = 'plasticinfo.html';
    } else if (type === 'oil') {
        window.location.href = 'shipinfo.html';
    } else if (type === 'chemical') {
        window.location.href = 'toxicinfo.html';
    } else if (type === 'fish') {
        window.location.href = 'fishinfo.html';
    } else if (type === 'sewage') {
        window.location.href = 'sinfo.html';
    }
}

function restartGame() {
    // Reset game state
    score = 0;
    time = 30;

    // Clear existing wastes
    document.querySelectorAll('.waste').forEach(waste => waste.remove());

    // Reset dashboard
    document.getElementById('dashboard').innerHTML = '';

    // Initialize boat position
    boatX = window.innerWidth / 2;
    boatY = window.innerHeight - 246 - boatHeight;
    boat.style.left = `${boatX}px`;

    // Start new game
    startGame();
}


// Initialize game on page load
window.onload = startGame;
