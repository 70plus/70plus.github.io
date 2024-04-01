window.onload = function() {
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
}
