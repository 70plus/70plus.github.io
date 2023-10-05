const spot = document.getElementById('spot');
const firstSpotHTML = spot.innerHTML;
let counter = document.getElementById('counter');
let clickCount = 1;
let maxCount = 11;
let maxWait = 3000;
let timer;
let startTime = Date.now();

function getRandomPosition() {
    const screenWidth = window.innerWidth - 200;
    const screenHeight = window.innerHeight - 200;
    const randomX = Math.floor(Math.random() * screenWidth);
    const randomY = Math.floor(Math.random() * screenHeight);
    return { x: randomX, y: randomY };
}

// Set the initial random position for the spot
const initialPosition = getRandomPosition();
spot.style.left = initialPosition.x + 'px';
spot.style.top = initialPosition.y + 'px';

function moveSpot() {
    if (clickCount === maxCount) {
        spot.style.left = ((window.innerWidth - 200) / 2) + 'px';
        spot.style.top = ((window.innerHeight - 200) / 2) + 'px';
    } else {
        const newPosition = getRandomPosition();
        spot.style.left = newPosition.x + 'px';
        spot.style.top = newPosition.y + 'px';
        clearInterval(timer);
        timer = setInterval(moveSpot, maxWait);
    }
}

function updateCounter() {
    clickCount++;
    counter.textContent = clickCount;

    if (clickCount === maxCount) {
        clearInterval(timer);
        const elapsedTime = Math.floor((Date.now() - startTime) / 100) / 10; // Calculate elapsed time in seconds
        spot.textContent = `Tempo: ${elapsedTime} secondi`;
        spot.onclick = function() {
            restartGame();
        };
    }
}

function restartGame() {
    clickCount = 1;
    spot.innerHTML = firstSpotHTML;
    counter = document.getElementById('counter');
    startTime = Date.now();
    spot.onclick = function() {
        if (clickCount < maxCount) {
            updateCounter();
            moveSpot();
        }
    };
    moveSpot();
}

spot.onclick = function() {
    if (clickCount < maxCount) {
        updateCounter();
        moveSpot();
    }
};

// Start the initial timer
timer = setInterval(moveSpot, maxWait);
