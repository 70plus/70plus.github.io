window.onload = function() {
  const size = 6;
  const rollButton = document.getElementById('roll-button');
  const diceIcon = document.getElementById('dice-icon');
  const hWindow = window.innerHeight;
  const wWindow = window.innerWidth;

  rollButton.addEventListener('click', () => {
    diceIcon.classList.add('rolling');
    diceIcon.style.backgroundImage = `url('media/files/dado.png')`;
    setTimeout(() => {
      diceIcon.classList.remove('rolling');
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      diceIcon.style.backgroundImage = `url('media/files/dado-${randomNumber}.png')`;
    }, 1000);
  });

const tableStart = document.getElementById("pre-table").getBoundingClientRect();
const table = document.createElement('table');
const cellDimH = Math.trunc((hWindow - tableStart.bottom) / (size + 1));
const cellDimW = Math.trunc(wWindow /(size + 1));
const cellDim = Math.min(cellDimH, cellDimW);
table.style.border = '5px solid black';
table.style.borderCollapse = 'collapse';
table.style.margin = '0 auto';

for (let i = 0; i < size; i++) {
  const row = document.createElement('tr');
  for (let j = 0; j < size; j++) {
    const cell = document.createElement('td');
    cell.textContent = 'text';
    cell.style.textAlign = 'center';
    cell.style.width = cellDim + 'px';
    cell.style.height = cellDim + 'px';
    cell.style.border = '2px solid black';
    row.appendChild(cell);
  }
  table.appendChild(row);
}

document.body.appendChild(table); 
}
