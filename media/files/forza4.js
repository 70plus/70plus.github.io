window.onload = function() {
//-----------------------------------------------------------
// parametri generali
  const size = 6;
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
  const diceIcon = document.getElementById('dice-icon');
  const vaiButton = document.getElementById("vai");
  const infoButton = document.getElementById("info");
  const infoBox = document.getElementById("info-box");
  const infoText = document.querySelector("#infoTesto");
  const closeButton = document.querySelector("#okB");
  let playMsg = new Array(2);
  playMsg[0] = document.getElementById('box-left');
  playMsg[1] = document.getElementById('box-right');
// giocatori
  const playColor = new Array('#ffffff', '#3a86ff', '#ff006e');
  let player;
// altri parametri
  let randomNumber;
// stato del gioco

  let playRunning = false;
  let diceEnabled = false;
  let setCellColor = false;
//-----------------------------------------------------------
// box di informazioni sul gioco
infoButton.addEventListener("click", function() {
  infoText.innerHTML = `
      Regole del gioco:<ul>
      <li>due giocatori tirano a turno il dado;
      <li>una volta tirato il dado, cercano sulla tavola di gioco le caselle con il numero indicato dal dado;
      <li>scelgono la casella che preferiscono, toccandola;
      <li>la casella assumerà il colore assegnato al giocatore;
      <li>vince chi per primo riesce a colorare 4 caselle in orizzontale, verticale o diagonale.`;
  infoBox.showModal();
})
closeButton.addEventListener("click", () => {
    infoBox.close();
})
//-----------------------------------------------------------
// evento "tira il dado"
  diceIcon.addEventListener('click', () => {
    if (diceEnabled == true) {
      diceEnabled = false;
      diceIcon.classList.add('rolling');
      diceIcon.style.backgroundImage = `url('media/files/dado.png')`;
      setTimeout(() => {
        diceIcon.classList.remove('rolling');
        randomNumber = Math.floor(Math.random() * 6) + 1;
        if (avblCells[randomNumber] > 0) {
            avblCells[randomNumber] -= 1;
            setCellColor = true;
            playMsg[player-1].innerText = "Colora la cella";
        } else {
            diceEnabled = true;
            playMsg[player - 1].innerText = "Non ci sono celle libere";
            player = 3 - player;
            playMsg[player - 1].innerText = "Tira il dado";
        }
        diceIcon.style.backgroundImage = `url('media/files/dado-${randomNumber}.png')`;
      }, 1000);
    }
  });
//-----------------------------------------------------------
// inserimento della tabella di gioco
const tableStart = document.getElementById("pre-table").getBoundingClientRect();
const table = document.createElement('table');
const cellDimH = Math.trunc((hWindow - tableStart.bottom) / (size + 1));
const cellDimW = Math.trunc(wWindow /(size + 1));
const cellDim = Math.min(cellDimH, cellDimW);
table.style.border = '5px solid #4CAF50';
table.style.borderCollapse = 'collapse';
table.style.margin = '0 auto';

for (let i = 0; i < size; i++) {
  const row = document.createElement('tr');
  for (let j = 0; j < size; j++) {
    const cell = document.createElement('td');
    cell.id = `${i}-${j}`;
    cell.textContent = '---';
    cell.style.textAlign = 'center';
    cell.style.width = cellDim + 'px';
    cell.style.height = cellDim + 'px';
    cell.style.border = '2px solid #4CAF50';
    row.appendChild(cell);
  }
  table.appendChild(row);
}

document.body.appendChild(table); 
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
            tableCont[i + j * size] = (refRow[col[j]] + row[i]) % size + 1;  
        }
    }
}
//-----------------------------------------------------------
// funzione colora la cella
   function addCellsListener(i,j) {
       document.getElementById(`${i}-${j}`).addEventListener('click', function() {
           if (cellOwner[i + j * size] == 0 && document.getElementById(`${i}-${j}`).innerText == randomNumber)  {
               cellOwner[i + j * size] = player;
               document.getElementById(`${i}-${j}`).style.backgroundColor = playColor[player];
               diceEnabled = true;
               setCellColor = false;
               playMsg[player - 1].innerText = "Aspetta il tuo turno";
               player = 3 - player;
               playMsg[player - 1].innerText = "Tira il dado";
           }
       });
    }
//-----------------------------------------------------------
// funzione di riempimento della tabella
vaiButton.addEventListener("click", function() {
   tableGen();
   for (let i = 0; i < size; i++) {
     for (let j = 0; j < size; j++) {
        document.getElementById(`${i}-${j}`).innerText = tableCont[i + j * size];
        document.getElementById(`${i}-${j}`).style.backgroundColor = playColor[0];
        cellOwner[i + j * size] = 0;
        addCellsListener(i,j);
     }
   }
   playRunning = true;
   diceEnabled = true;
   setCellColor = false;
   player = Math.floor(Math.random() * 2) + 1;
   console.log(player);
   playMsg[player-1].innerText = "Tira il dado";
   playMsg[2 - player].innerText = "Aspetta il tuo turno";
})
//-----------------------------------------------------------
}
