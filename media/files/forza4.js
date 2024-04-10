window.onload = function () {
    //-----------------------------------------------------------
    // parametri generali
    const size = 6;
    let remCells;
    const winSeq = 4;
    const hWindow = window.innerHeight;
    const wWindow = window.innerWidth;
    // memorizzazione dello stato
    let row = new Array(size);
    let col = new Array(size);
    let refRow = new Array(size);
    let tableCont = new Array(size * size);
    let cellOwner = new Array(size * size);
    let avblCells = new Array(size + 1);
    // elementi del gioco
    const diceIcon = document.getElementById("dice-icon");
    const vaiButton = document.getElementById("vai");
    const infoButton = document.getElementById("info");
    const infoBox = document.getElementById("info-box");
    const infoText = document.querySelector("#infoTesto");
    const closeButton = document.querySelector("#okB");
    const line = document.getElementById("line");
    const speedSel = document.getElementById("speed");
    let playMsg = new Array(2);
    playMsg[0] = document.getElementById("box-left");
    playMsg[1] = document.getElementById("box-right");
    // identificazione dei giocatori
//    const msgColor = new Array("#ffffff", "#3a86ff", "#ff006e");
//    const playColor = new Array("#ffffff", "#a2d2ff", "#ffafcc");
    const msgColor = new Array("#ffffff", "#3a86ff", "#f77f00");
    const playColor = new Array("#ffffff", "#a2d2ff", "#fcbf49");
    let player = Math.floor(Math.random() * 2) + 1;
    // altri parametri
    let randomNumber;
    // stato del gioco
    let speed = false;
    let fight = false;
    let diceEnabled = false;
    let setCellColor = false;
    let gameEnded;
    let timeoutID;
    let timeoutLen = 5000; // tempo massimo per scegliere una cella da colorare
    let rollingTimeout; // tempo di rotolamento del dado
    let inTime;
    let reUse = false; // true: riutilizza il valore del dado, senza rilanciarlo
    // messaggi
    let msgContent = new Array(
        "<b>Tira il dado</b>",
        "<b>Colora la cella</b>",
        "Aspetta il tuo turno",
        "Non ci sono celle libere",
        "<b>Hai vinto!</b>",
        "",
        "<b>La partita è patta!</b>",
        "<b>Hai perso il turno</b>"
    );
    //-----------------------------------------------------------
    // box di informazioni sul gioco
    infoButton.addEventListener("click", function () {
        infoBox.showModal();
    });
    closeButton.addEventListener("click", () => {
        infoBox.close();
    });
    //-----------------------------------------------------------
    // bottone di selezione della velocità
    speedSel.addEventListener("click", function () {
        switch (true) {
            case !speed && !fight:
                speedSel.innerHTML = "🚀";
                speed = true;
                fight = false;
                break;
            case speed && !fight:
                speedSel.innerHTML = "🥊";
                speed = true;
                fight = true;
                break;
            case speed && fight:
                speedSel.innerHTML = "🐢";
                speed = false;
                fight = false;
                break;
        }
    });
    //-----------------------------------------------------------
    // evento tira il dado
    diceIcon.addEventListener("click", () => {
        if (diceEnabled == true) {
            diceEnabled = false;
            rollingTimeout = 20;
            if (!reUse) {
                diceIcon.classList.add("rolling");
                diceIcon.style.backgroundImage = `url('media/files/dado.png')`;
                rollingTimeout = 1000;
            }
            setTimeout(() => {
                if (!reUse) {
                    diceIcon.classList.remove("rolling");
                    randomNumber = Math.floor(Math.random() * 6) + 1;
                }
                diceIcon.style.border = "2px solid white";
                if (avblCells[randomNumber] > 0) {
                    setCellColor = true;
                    playMsg[player - 1].innerHTML = msgContent[1];
                    if (!reUse) {
                        playMsg[2 - player].innerHTML = msgContent[2];
                    }
                    inTime = true;
                    reUse = false;
                    if (speed) {
                        line.classList.add("start-animation");
                        timeoutId = setTimeout(() => {
                            line.classList.remove("start-animation");
                            inTime = false;
                            playMsg[player - 1].innerHTML = msgContent[7];
                            player = 3 - player;
                            if (fight) {
                                playMsg[player - 1].innerHTML = msgContent[1];
                                reUse = true;
                                diceEnabled = true;
                                diceIcon.click();
                            } else {
                                diceEnabled = true;
                                playMsg[player - 1].innerHTML = msgContent[0];
                                diceIcon.style.border =
                                    "2px solid " + msgColor[player];
                            }
                        }, timeoutLen);
                    }
                } else {
                    diceEnabled = true;
                    playMsg[player - 1].innerHTML = msgContent[3];
                    player = 3 - player;
                    diceIcon.style.border = "2px solid " + msgColor[player];
                    playMsg[player - 1].innerHTML = msgContent[0];
                }
                diceIcon.style.backgroundImage = `url('media/files/dado-${randomNumber}.png')`;
            }, rollingTimeout);
        }
    });
    //-----------------------------------------------------------
    // main
    playMsg[0].style.width =
        Math.floor((wWindow - diceIcon.offsetWidth - 30) / 2) + "px";
    playMsg[1].style.width = playMsg[0].style.width;
    // inserimento della tabella di gioco
    const tableStart = document
        .getElementById("pre-table")
        .getBoundingClientRect();
    const table = document.createElement("table");
    const cellDimH = Math.trunc((hWindow - tableStart.bottom) / (size + 1));
    const cellDimW = Math.trunc(wWindow / (size + 1));
    const cellDim = Math.min(cellDimH, cellDimW);
    table.style.border = "5px solid #4CAF50";
    table.style.borderCollapse = "collapse";
    table.style.margin = "0 auto";
    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            cell.id = `${i}-${j}`;
            cell.textContent = "---";
            cell.style.textAlign = "center";
            cell.style.width = cellDim + "px";
            cell.style.height = cellDim + "px";
            cell.style.border = "2px solid #4CAF50";
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
    // informazioni sull gioco
    infoText.innerHTML = `
      <b>Forza 4</b> si gioca in due. Ci sono tre modalità di gioco:<ul>
      <li>🐢, modalità <b>normale</b>;
      <li>🚀, modalità <b>veloce</b>, se non si sceglie la cella da colorare entro 6 secondi, si passa il turno;
      <li>🥊, modalità <b>combattimento</b>, allo scadere dei 6 secondi, il valore del dado passa all'altro giocatore.
      <br><br>   
      All'avvio di <b>Forza 4</b> il primo giocatore è scelto a caso;
          conclusa una partita, nella successiva comincia il penultimo che ha giocato.<br>
      Il giocatore di turno tira il dado <b>toccandolo</b>, poi tocca una casella con il valore ottenuto, per colorarla.
      La casella assumerà il colore assegnato al giocatore.<br>
      Vince chi per primo riesce a colorare 4 caselle in orizzontale, verticale o diagonale.`;
    //-----------------------------------------------------------
    // funzione di generazione della tabella
    function tableGen() {
        for (let i = 0; i < size; i++) {
            row[i] = i;
            col[i] = i;
            refRow[i] = i;
            avblCells[i + 1] = size;
        }
        for (i = row.length - 1; i > 0; i--) {
            let k = Math.floor(Math.random() * (i + 1));
            [row[i], row[k]] = [row[k], row[i]];
            k = Math.floor(Math.random() * (i + 1));
            [col[i], col[k]] = [col[k], col[i]];
        }
        for (i = 0; i < size; i++) {
            //        ii = row[i];
            for (let j = 0; j < size; j++) {
                tableCont[i * size + j] =
                    ((refRow[col[j]] + row[i]) % size) + 1;
            }
        }
    }
    //-----------------------------------------------------------
    // funzione colora la cella
    function addCellsListener(i, j) {
        document
            .getElementById(`${i}-${j}`)
            .addEventListener("click", function () {
                if (speed) {
                    clearTimeout(timeoutId);
                }
                if (
                    inTime &&
                    setCellColor &&
                    cellOwner[i * size + j] == 0 &&
                    document.getElementById(`${i}-${j}`).innerHTML ==
                        randomNumber
                ) {
                    line.classList.remove("start-animation");
                    cellOwner[i * size + j] = player;
                    document.getElementById(`${i}-${j}`).style.backgroundColor =
                        playColor[player];
                    avblCells[randomNumber] -= 1;
                    remCells -= 1;
                    setCellColor = false;
                    // verifica se fine partita
                    gameEnded = false;
                    if (
                        endGame(0, j, 1, 0, size, player) ||
                        endGame(i, 0, 0, 1, size, player)
                    ) {
                        gameEnded = true;
                    }
                    if (i + j < size) {
                        if (endGame(i + j, 0, -1, 1, i + j + 1, player)) {
                            gameEnded = true;
                        }
                    } else if (
                        endGame(
                            size - 1,
                            i + j - size + 1,
                            -1,
                            1,
                            2 * size - 1 - i - j,
                            player
                        )
                    ) {
                        gameEnded = true;
                    }
                    if (i < j) {
                        if (endGame(0, j - i, 1, 1, size - j + i, player)) {
                            gameEnded = true;
                        }
                    } else if (endGame(i - j, 0, 1, 1, size - i + j, player)) {
                        gameEnded = true;
                    }
                    if (gameEnded) {
                        playMsg[player - 1].innerHTML = msgContent[4];
                        playMsg[2 - player].innerHTML = msgContent[5];
                        diceEnabled = false;
                    } else if (remCells > 0) {
                        diceEnabled = true;
                        playMsg[player - 1].innerHTML = msgContent[2];
                        player = 3 - player;
                        diceIcon.style.border = "2px solid " + msgColor[player];
                        playMsg[player - 1].innerHTML = msgContent[0];
                    } else {
                        playMsg[player - 1].innerHTML = msgContent[6];
                        playMsg[2 - player].innerHTML = msgContent[6];
                        diceEnabled = false;
                    }
                }
            });
    }
    //-----------------------------------------------------------
    // funzione di inizio partita
    vaiButton.addEventListener("click", function () {
        tableGen();
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`${i}-${j}`).innerHTML =
                    tableCont[i * size + j];
                document.getElementById(`${i}-${j}`).style.backgroundColor =
                    playColor[0];
                cellOwner[i * size + j] = 0;
                addCellsListener(i, j);
            }
        }
        diceIcon.style.backgroundImage = `url('media/files/dado.png')`;
        remCells = size * size;
        diceEnabled = true;
        reUse = false;
        setCellColor = false;
        player = 3 - player;
        diceIcon.style.border = "2px solid " + msgColor[player];
        playMsg[player - 1].innerHTML = msgContent[0];
        playMsg[2 - player].innerHTML = msgContent[2];
    });
    //-----------------------------------------------------------
    // funzione di verifica del fine partita
    function endGame(i, j, ix, jx, np, player) {
        if (np < winSeq) {
            return false;
        }
        let seqLen = 0;
        let maxSeq = 0;
        for (let p = 0; p < np; p++) {
            if (cellOwner[i * size + j] == player) {
                if (seqLen == 0) {
                    ip = i;
                    jp = j;
                    seqLen = 1;
                } else {
                    seqLen += 1;
                }
            } else if (seqLen > maxSeq) {
                maxSeq = seqLen;
                iMax = ip;
                jMax = jp;
                seqLen = 0;
            }
            i += ix;
            j += jx;
        }
        if (seqLen > maxSeq) {
            maxSeq = seqLen;
        }
        if (maxSeq >= winSeq) {
// 10apr24 9:00
           ip = iMax;
           jp = jMax;
// -----------------------------
            for (p = 0; p < maxSeq; p++) {
                document.getElementById(`${ip}-${jp}`).style.backgroundColor =
                    msgColor[player];
                ip += ix;
                jp += jx;
            }
        }
        return maxSeq >= winSeq;
    }
    //-----------------------------------------------------------
};
