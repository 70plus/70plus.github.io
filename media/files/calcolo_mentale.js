let numero1, numero2, risultato;
let dragged = null;

const infoBtn = document.getElementById("infoBtn");
const infoLayer = document.getElementById("infoLayer");
const closeBtn = document.getElementById("closeBtn");

infoBtn.onclick = function() {
    infoLayer.style.display = "block";
}

closeBtn.onclick = function() {
    infoLayer.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == infoLayer) {
        infoLayer.style.display = "none";
    }
}

function genera() {

    document.getElementById("feedback").innerHTML = "";
    document.getElementById("risposta").value = "";

    do {
        numero1 = Math.floor(Math.random() * 49) + 1;
        numero2 = Math.floor(Math.random() * 49) + 1;
        risultato = numero1 + numero2;
    } while (
    	risultato >= 30 ||
    	(numero1 % 10) + (numero2 % 10) < 10
    );

    document.getElementById("operazione").innerHTML =
        numero1 + " + " + numero2;

    disegna();
}

function disegna() {
    const cont = document.getElementById("contenitore");
    cont.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "grid";

    // Primo addendo
    creaBlocchi(numero1, grid);

    // Separatore visivo
    const sep = document.createElement("div");
    sep.className = "separator";
    grid.appendChild(sep);

    // Secondo addendo
    creaBlocchi(numero2, grid);

    cont.appendChild(grid);
}

function creaBlocchi(quantita, grid) {

    const righe = Math.ceil(quantita / 10);

    for (let r = 0; r < righe; r++) {

        const row = document.createElement("div");
        row.className = "row";

        for (let i = 0; i < 10; i++) {

            const circle = document.createElement("div");
            circle.className = "circle";
            if (i === 4) {
    		circle.classList.add("gap");
            }

            const indice = r * 10 + i;

            if (indice < quantita) {
                circle.classList.add("filled");
                circle.draggable = true;
                circle.addEventListener("dragstart", drag);
            }

            circle.addEventListener("dragover", allowDrop);
            circle.addEventListener("drop", drop);

            row.appendChild(circle);
        }

        grid.appendChild(row);
    }
}

function drag(e) {
    dragged = e.target;
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();

    if (!e.target.classList.contains("filled")) {

        e.target.classList.add("filled");
        e.target.draggable = true;
        e.target.addEventListener("dragstart", drag);

        dragged.classList.remove("filled");
        dragged.draggable = false;
    }
}

function verifica() {

    const risposta = parseInt(
        document.getElementById("risposta").value
    );

    if (risposta === risultato) {
        document.getElementById("feedback").innerHTML = "🎉 Esatto!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").innerHTML =
            "❌ La risposta corretta è " + risultato;
        document.getElementById("feedback").style.color = "red";
    }
}

// ===== SUPPORTO TOUCH =====

document.addEventListener("touchstart", function(e) {
    if (e.target.classList.contains("filled")) {
        dragged = e.target;
    }
});

document.addEventListener("touchend", function(e) {

    if (!dragged) return;

    const touch = e.changedTouches[0];
    const elem = document.elementFromPoint(touch.clientX, touch.clientY);

    if (elem && elem.classList.contains("circle") && !elem.classList.contains("filled")) {

        elem.classList.add("filled");
        elem.draggable = true;
        elem.addEventListener("dragstart", drag);

        dragged.classList.remove("filled");
        dragged.draggable = false;
    }

    dragged = null;
});

genera();
