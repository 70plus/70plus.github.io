let numeroTabellina = 2;
let dragged = null;

/* =========================
   INIZIALIZZAZIONE SELECT
========================= */
function initSelect() {
    const select = document.getElementById("tabellinaSelect");

    for (let i = 1; i <= 10; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = "Tabellina del " + i;
        if (i === 2) option.selected = true;
        select.appendChild(option);
    }

    select.addEventListener("change", function() {
        numeroTabellina = parseInt(this.value);
        generaTabellina();
    });
}

/* =========================
   GENERAZIONE TABELLINA
========================= */
function generaTabellina() {

    const colDom = document.getElementById("colonnaDomande");
    const colVal = document.getElementById("colonnaValori");

    colDom.innerHTML = "";
    colVal.innerHTML = "";
    document.getElementById("risultatoFinale").textContent = "";

    let risultati = [];

    for (let i = 1; i <= 10; i++) {

        risultati.push(numeroTabellina * i);

        const riga = document.createElement("div");
        riga.className = "domanda";

        const sx = document.createElement("div");
        sx.className = "domanda-sx";
        sx.textContent = numeroTabellina + " x " + i + " =";

        const drop = document.createElement("div");
        drop.className = "risultato";
        drop.dataset.risposta = numeroTabellina * i;

        riga.appendChild(sx);
        riga.appendChild(drop);
        colDom.appendChild(riga);
    }

    risultati = shuffle(risultati);

    risultati.forEach(val => {
        const box = document.createElement("div");
        box.className = "valore";
        box.textContent = val;
        box.dataset.valore = val;
        colVal.appendChild(box);
    });
}

/* =========================
   SHUFFLE
========================= */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* =========================
   DRAG & DROP UNIVERSALE
========================= */
// let dragged = null;

document.addEventListener("pointerdown", function(e) {
    if (e.target.classList.contains("valore")) {
        dragged = e.target;
        dragged.style.opacity = "0.5";
    }
});

document.addEventListener("pointerup", function(e) {

    if (!dragged) return;

    // coordinate del punto di rilascio
    const x = e.clientX;
    const y = e.clientY;

    const elementUnderFinger = document.elementFromPoint(x, y);

    const target = elementUnderFinger
        ? elementUnderFinger.closest(".risultato")
        : null;

    if (target && target.children.length === 0) {
        target.appendChild(dragged);
    }

    dragged.style.opacity = "1";
    dragged = null;
});

/* =========================
   VERIFICA
========================= */
function verifica() {

    let corretti = 0;
    const risultati = document.querySelectorAll(".risultato");

    risultati.forEach(box => {

        if (box.children.length === 0) return;

        const tessera = box.children[0];

        // pulizia classi precedenti
        tessera.classList.remove("correct", "wrong");

        const valore = tessera.dataset.valore;
        const risposta = box.dataset.risposta;

        if (valore === risposta) {
            tessera.classList.add("correct");
            corretti++;
        } else {
            tessera.classList.add("wrong");
        }
    });

const risultatoDiv = document.getElementById("risultatoFinale");

if (corretti === 10) {
    risultatoDiv.textContent = "🎉 WoW, perfetto! 10 su 10!";
    risultatoDiv.style.color = "green";
}
else if (corretti >= 8) {
    risultatoDiv.textContent = `👏 Molto bene! ${corretti}/10 risultati corretti`;
    risultatoDiv.style.color = "#2b7cff";
}
else if (corretti >= 5) {
    risultatoDiv.textContent = `🙂 Buon lavoro! ${corretti}/10 corretti. Continua così!`;
    risultatoDiv.style.color = "orange";
}
else {
    risultatoDiv.textContent = `💪 ${corretti}/10 corretti. Riprova, puoi fare meglio!`;
    risultatoDiv.style.color = "red";
}
}

function ricomincia() {

    // rigenera la stessa tabellina
    generaTabellina();

    // reset messaggio
    const risultatoDiv = document.getElementById("risultatoFinale");
    risultatoDiv.textContent = "";
    risultatoDiv.style.color = "black";
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
   AVVIO
========================= */
initSelect();
generaTabellina();
