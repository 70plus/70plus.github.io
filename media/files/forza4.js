window.onload = function() {
//-----------------------------------------------------------
// definizioni
  const size = 6;
  const rollButton = document.getElementById('roll-button');
  const diceIcon = document.getElementById('dice-icon');
  const hWindow = window.innerHeight;
  const wWindow = window.innerWidth;
  const vaiButton = document.getElementById("vai");
  const infoButton = document.getElementById("info");
  const infoBox = document.getElementById("info-box");
  const infoText = document.querySelector("#infoTesto");
  const closeButton = document.querySelector("#okB");
  let randomNumber;
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
  rollButton.addEventListener('click', () => {
    diceIcon.classList.add('rolling');
    diceIcon.style.backgroundImage = `url('media/files/dado.png')`;
    setTimeout(() => {
      diceIcon.classList.remove('rolling');
      randomNumber = Math.floor(Math.random() * 6) + 1;
      diceIcon.style.backgroundImage = `url('media/files/dado-${randomNumber}.png')`;
    }, 1000);
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
// funzione di riempimento della tabella
vaiButton.addEventListener("click", function() {
   for (let i = 0; i < size; i++) {
     for (let j = 0; j < size; j++) {
        document.getElementById(`${i}-${j}`).innerText = Math.floor(Math.random() * 6) + 1;
     }
   }
})
//-----------------------------------------------------------

}

