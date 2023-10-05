const spot = document.getElementById('spot');
const firstSpotHTML = spot.innerHTML;
let counter = document.getElementById('counter');
let clickCount = 0;
let maxCount = 11;
let maxWait = 3000;
let timer, startTime;

function getRandomPosition() {
    const screenWidth = window.innerWidth - 200;
    const screenHeight = window.innerHeight - 200;
    const randomX = Math.floor(Math.random() * screenWidth);
    const randomY = Math.floor(Math.random() * screenHeight);
    return { x: randomX, y: randomY };
}

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
        spot.innerHTML = `Tempo:<br>${elapsedTime} sec.<br>Vai!`;
        spot.onclick = function() {
            restartGame();
        };
    }
}

function restartGame() {
    clickCount = 1;
    spot.innerHTML = firstSpotHTML;
    counter = document.getElementById('counter');
    counter.textContent = clickCount;
    startTime = Date.now();
    spot.onclick = function() {
        if (clickCount == 0) {
            startTime = Date.now();
        }
        if (clickCount < maxCount) {
            updateCounter();
            moveSpot();
        }
    };
    moveSpot();
}

// Calculate the minimum dimension of the screen (width or height)
const minDimension = Math.min(window.innerWidth, window.innerHeight);

// Adjust spot size and counter font size
const spotDiameter = Math.floor(minDimension / 4);
spot.style.width = spotDiameter + 'px';
spot.style.height = spotDiameter + 'px';
const fontSize = Math.floor(minDimension / 25);
spot.style.fontSize = fontSize + 'px';

// Set the initial center position for the spot
spot.style.left = ((window.innerWidth - 200) / 2) + 'px';
spot.style.top = ((window.innerHeight - 200) / 2) + 'px';

spot.onclick = function() {
    if (clickCount == 0) {
        startTime = Date.now();
    }
    if (clickCount < maxCount) {
        updateCounter();
        moveSpot();
    }
}
