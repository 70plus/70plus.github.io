window.onload = function() {
  const size = 6;
  const rollButton = document.getElementById('roll-button');
  const diceIcon = document.getElementById('dice-icon');

  rollButton.addEventListener('click', () => {
    diceIcon.classList.add('rolling');
    diceIcon.style.backgroundImage = `url('media/files/dado.png')`;
    setTimeout(() => {
      diceIcon.classList.remove('rolling');
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      diceIcon.style.backgroundImage = `url('media/files/dado-${randomNumber}.png')`;
    }, 1000);
  });

const table = document.createElement('table');
const tablePosition = table.getBoundingClientRect();
const cellDim = (window.innerHeight - tablePosition - '10px') / size;
// table.style.width = '80%';
table.style.border = '5px solid black';
table.style.borderCollapse = 'collapse';
table.style.margin = '0 auto';

for (let i = 0; i < size; i++) {
  const row = document.createElement('tr');
  for (let j = 0; j < size; j++) {
    const cell = document.createElement('td');
    cell.textContent = 'text';
    cell.style.textAlign = 'center';
    cell.style.width = '40px';
    cell.style.height = '40px';
    cell.style.border = '2px solid black';
    row.appendChild(cell);
  }
  table.appendChild(row);
}

document.body.appendChild(table); 
}
