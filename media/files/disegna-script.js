const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
eraseSlider = document.querySelector("#erase-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");
let drawingHistory = [];

// global variables with default value
let prevMouseX, prevMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
brushWidth = 5,
eraseWidth = 25,
selectedColor = "#000";

const setCanvasBackground = () => {
    // setting whole canvas background to white, so the downloaded img background will be white
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawingHistory.push(canvas.toDataURL());
    ctx.fillStyle = selectedColor; // setting fillstyle back to the selectedColor, it'll be the brush color
}

window.addEventListener("load", () => {
    // setting canvas width/height.. offsetwidth/height returns viewable width/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});

// Get the input field
const textInput = document.getElementById('textInput');

// Function to handle keydown events
textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Get the text from the input field
        const text = textInput.value;
        // Clear the input field
        textInput.value = '';
        // Draw the text on the canvas
        ctx.font = "30px Calibri, sans-serif";
        ctx.fillStyle = selectedColor;
        ctx.fillText(text, 10, canvas.height - 12);
        drawingHistory.push(canvas.toDataURL());
    }
});

const drawLine = (e) => {

    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX, prevMouseY);
    ctx.stroke();
}

const drawRect = (e) => {

    // if fillColor isn't checked draw a rect with border else draw rect with background

    if(!fillColor.checked) {
        // creating rectangle according to the mouse pointer
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    // getting radius for circle according to the mouse pointer
    let radius = Math.sqrt(Math.pow((prevMouseX - e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2));
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI); // creating circle according to the mouse pointer
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill circle else draw border circle
}

const drawTriangle = (e) => {
    ctx.beginPath(); // creating new path to draw triangle
    ctx.moveTo(prevMouseX, prevMouseY); // moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    ctx.closePath(); // closing path of a triangle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke(); // if fillColor is checked fill triangle else draw border
}

const undo = () => {
    if (drawingHistory.length <= 1) {
        // Can't undo if there's only one or fewer entries in the history
        return;
    }
    // Remove the latest entry from the history array
    drawingHistory.pop();
    // Load the previous canvas state from the history array
    const prevCanvasState = new Image();
    prevCanvasState.src = drawingHistory[drawingHistory.length - 1];
    prevCanvasState.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(prevCanvasState, 0, 0);
    };
};

const undoButton = document.getElementById('undoButton');
undoButton.addEventListener('click', undo);

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // passing current mouseX position as prevMouseX value
    prevMouseY = e.offsetY; // passing current mouseY position as prevMouseY value
    ctx.beginPath(); // creating new path to draw
    ctx.lineWidth = selectedTool === "eraser" ? eraseWidth : brushWidth;
    ctx.strokeStyle = selectedColor; // passing selectedColor as stroke style
    ctx.fillStyle = selectedColor; // passing selectedColor as fill style
    // copying canvas data & passing as snapshot value.. this avoids dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if(!isDrawing) return; // if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas
    
    if(selectedTool === "brush" || selectedTool === "eraser") {
        // if selected tool is eraser then set strokeStyle to white 
        // to paint white color on to the existing canvas content else set the stroke color to selected color
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY); // creating line according to the mouse pointer
        ctx.stroke(); // drawing/filling line with color
    } else if(selectedTool === "line"){
        drawLine(e);
    } else if(selectedTool === "rectangle"){
        drawRect(e);
    } else if(selectedTool === "circle"){
        drawCircle(e);
    } else {
        drawTriangle(e);
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all tool option
        // removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value); // passing slider value as brushSize
eraseSlider.addEventListener("change", () => eraseWidth = eraseSlider.value); // passing slider value as brushSize

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => { // adding click event to all color button
        // removing selected class from the previous option and adding on current clicked option
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        // passing selected btn background color as selectedColor value
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    // passing picked color value from color picker to last color btn background
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clearing whole canvas
    setCanvasBackground();
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); // creating <a> element
    link.download = `${Date.now()}.jpg`; // passing current date as link download value
    link.href = canvas.toDataURL(); // passing canvasData as link href value
    link.click(); // clicking link to download image
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    drawingHistory.push(canvas.toDataURL());
});
