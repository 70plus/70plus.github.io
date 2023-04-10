winPos = [
  [1, 2, 3], [4, 5, 6], 
  [7, 8, 9], [1, 4, 7], 
  [2, 5, 8], [3, 6, 9], 
  [1, 5, 9], [3, 5, 7]
];

vinte = [0,0]
inizioGioco("X");

for (let i = 1; i <= 9; i++) {
  // Quando si clicca su una cella
  document.getElementById(i.toString()).addEventListener(
    "click", 
    function() {
      if (this.innerHTML === "" && !gameEnded) {
        // inserisci nella cella "X" o "O", con il colore corretto
        this.innerHTML = playerSymbol;
        this.classList.add(playerSymbol.toLowerCase());
 
       // il giocatore di mano ha vinto?
        checkWin(playerSymbol);        
 
       // tocca all'altro giocatore
        if (playerSymbol === "X") {playerSymbol = "O"}
        else {playerSymbol = "X"}
	
	if (gameEnded === false)
	   {document.getElementById("dialogo").innerHTML = conta + " Clicca "+ playerSymbol + " ...";}
      }
    }
  );
}

function checkWin(x) {
  for (let i = 0; i < winPos.length; i++) {
	if (
	  document.getElementById(winPos[i][0]).innerHTML === x &&
	  document.getElementById(winPos[i][1]).innerHTML === x &&
	  document.getElementById(winPos[i][2]).innerHTML === x
	) {
	  document.getElementById(winPos[i][0]).classList.add("win");
	  document.getElementById(winPos[i][1]).classList.add("win");
	  document.getElementById(winPos[i][2]).classList.add("win"); 
	  gameEnded = true;
          if (x === "X") {++vinte[0]}
	  else {++vinte[1]}
	  document.getElementById("dialogo").innerHTML = conta + ">> <b>"+ x + "</b> ha vinto!";
	}
  }
}

function inizioGioco (primo){
	playerSymbol = primo;
	gameEnded = false;
	conta = "<b>X</b> - <b>O</b> "+vinte[0]+" - "+vinte[1]+" ---->"
	document.getElementById("dialogo").innerHTML = conta + " Clicca "+ primo + " ...";
}

document.getElementById("reset").addEventListener(
  "click", 
  function() {
    for (let i = 1; i <= 9; i++) {
      document.getElementById(i.toString()).innerHTML = "";
      document.getElementById(i.toString()).classList.remove("x");
      document.getElementById(i.toString()).classList.remove("o");
      document.getElementById(i.toString()).classList.remove("win");
    };
    inizioGioco(playerSymbol);
  }
);