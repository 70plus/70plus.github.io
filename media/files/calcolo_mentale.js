/* ==================================================
   CALCOLO MENTALE - JS DEFINITIVO
   Funziona PC + Android + iPhone + iPad
================================================== */

let numero1, numero2, risultato;

/* =========================
   GENERAZIONE NUMERI
   Somma < 30 e unità > 10 (riporto)
========================= */
function genera() {
    document.getElementById("feedback").textContent = "";
    document.getElementById("risposta").value = "";

    do {
        numero1 = Math.floor(Math.random() * 29) + 1;
        numero2 = Math.floor(Math.random() * 29) + 1;
        risultato = numero1 + numero2;
    } while (risultato >= 30 || (numero1 % 10) + (numero2 % 10) < 10);

    document.getElementById("operazione").textContent =
        numero1 + " + " + numero2;

    disegna();
}

/* =========================
   DISEGNO CERCHI
========================= */
function disegna() {
    const cont = document.getElementById("contenitore");
    cont.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "grid";

    // Primo addendo
    creaBlocchi(numero1, grid, "primo");

    // Separatore visivo
    const sep = document.createElement("div");
    sep.className = "separator";
    grid.appendChild(sep);

    // Secondo addendo
    creaBlocchi(numero2, grid, "secondo");

    cont.appendChild(grid);

    // aggiorna subito il conteggio
    aggiornaConteggio();
}

function creaBlocchi(quantita, grid, classeAddendo) {
    const righe = Math.ceil(quantita / 10);

    for (let r = 0; r < righe; r++) {
        const row = document.createElement("div");
        row.className = `row ${classeAddendo}`; // marca la riga come "primo" o "secondo"

        for (let i = 0; i < 10; i++) {
            const circle = document.createElement("div");
            circle.className = "circle";
            if (i === 4) circle.classList.add("gap");

            const indice = r * 10 + i;
            if (indice < quantita) circle.classList.add("filled");

            row.appendChild(circle);
        }

        grid.appendChild(row);
    }
}

/* =========================
   DRAG AND DROP UNIVERSALE
   (Pointer Events: PC + Mobile)
========================= */
let dragged = null;
let offsetX = 0;
let offsetY = 0;

document.addEventListener("pointerdown", function(e) {

    if (!e.target.classList.contains("filled")) return;

    dragged = e.target;

    const rect = dragged.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    dragged.classList.add("dragging");

    moveAt(e.clientX, e.clientY);
});

document.addEventListener("pointermove", function(e) {
    if (!dragged) return;
    moveAt(e.clientX, e.clientY);
});

document.addEventListener("pointerup", function(e) {

    if (!dragged) return;

    const elementUnder = document.elementFromPoint(e.clientX, e.clientY);

    if (
        elementUnder &&
        elementUnder.classList.contains("circle") &&
        !elementUnder.classList.contains("filled")
    ) {
        elementUnder.classList.add("filled");
        dragged.classList.remove("filled");
    }

    dragged.classList.remove("dragging");
    resetPosition(dragged);
    dragged = null;

    aggiornaConteggio();
});

function moveAt(x, y) {
    dragged.style.left = x - offsetX + "px";
    dragged.style.top = y - offsetY + "px";
}

function resetPosition(element) {
    element.style.left = "";
    element.style.top = "";
}

function aggiornaConteggio() {
    const C1 = document.querySelectorAll(".row.primo .circle.filled").length;
    const C2 = document.querySelectorAll(".row.secondo .circle.filled").length;

    document.getElementById("conteggio").textContent = `${C1} + ${C2} =`;
}

/* =========================
   VERIFICA RISPOSTA
========================= */
function verifica() {
    const risposta = parseInt(document.getElementById("risposta").value);
    if (risposta === risultato) {
        document.getElementById("feedback").textContent = "🎉 Esatto!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").textContent =
            "❌ La risposta corretta è " + risultato;
        document.getElementById("feedback").style.color = "red";
    }
}

/* =========================
   MODAL INFORMAZIONI
========================= */
const infoBtn = document.getElementById("infoBtn");
const infoLayer = document.getElementById("infoLayer");
const closeBtn = document.getElementById("closeBtn");

infoBtn.onclick = function() { infoLayer.style.display = "block"; };
closeBtn.onclick = function() { infoLayer.style.display = "none"; };
window.onclick = function(event) {
    if (event.target === infoLayer) infoLayer.style.display = "none";
};

/* =========================
   AVVIO INIZIALE
========================= */
genera();
aggiornaConteggio();


