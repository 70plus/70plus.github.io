/* ------------------------------------
   DICHIARAZIONI
   ------------------------------------ */

let sp2 = `&nbsp;&nbsp;`;
let sp4 = sp2 + sp2;
let sp6 = sp4 + sp2;
let test, nomeTest, nDomande;
const storicoDiv = document.getElementById("storicoDiv");

/* ------------------------------------
   FUNZIONI
   ------------------------------------ */

function usaDomande(test,i) {
  let domanda = test[i+2];
  storicoDiv.insertAdjacentHTML("beforeend", `<br>` + sp4 + `Domanda ` + (i + 1) + `:&nbsp;` + domanda[idTestoDom] + `<br>`);
  usaRisposte(domanda);
  storicoDiv.insertAdjacentHTML("beforeend", `<br>` + sp4 + `Risposte esatte:<br>`);
  usaRispEsatte(domanda);
  storicoDiv.insertAdjacentHTML("beforeend", `<br>` + domanda[idSpiega] + `<br>`);
  return;
}

function usaRisposte(domanda) {
  let listaRisp = domanda[idListaRisp];
  let nRisposte = listaRisp.length;
  let rispEsatte = domanda[idListaRispEsatte];
  for (let i = listaRisp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [listaRisp[i], listaRisp[j]] = [listaRisp[j], listaRisp[i]];
    for (let k = 0; k < rispEsatte.length; k++){
      if (rispEsatte[k] == i) {rispEsatte[k] = j}
      else {
        if (rispEsatte[k] == j) {rispEsatte[k] = i};
      }
    }
  }
  for (i = 0; i < nRisposte; i++) {
    storicoDiv.insertAdjacentHTML("beforeend", sp6 + `- ` + listaRisp[i] + `<br>`);
  }
  return
}

function usaRispEsatte(domanda) {
  let rispEsatte = domanda[idListaRispEsatte];
  for (let i = 0; i < rispEsatte.length; i++) {
    storicoDiv.insertAdjacentHTML("beforeend", sp6 + domanda[idListaRisp][rispEsatte[i]] + `<br>`);
  }
  return
}
/* ------------------------------------
   MAIN
   ------------------------------------ */

// rileva le dimensioni dello schermo
hWindow = window.innerHeight;
wWindow = window.innerWidth;
// su PC restringi a formato portrait
if (wWindow > hWindow) {
    var divGioco = document.querySelector(".gioco-container");
    wWindow = Math.round((hWindow * 3.8) / 7);
    divGioco.style.width = wWindow + "px";
}
rWindow = hWindow / wWindow;
// Adatta il banner top alla dimensione dello schermo
// se lo schermo è alto meno di 700px, l'altezza del banner top varia in proporzione tra 40 e 60px
logoH = Math.round(40 + ((rWindow - 1.4) * 20) / 0.4);
if (rWindow < 1.4) {
    logoH = 40;
}
if (rWindow > 1.8) {
    logoH = 60;
}
if (hWindow < 700) {
    document.getElementsByClassName("logo-container")[0].style.height =
        logoH + "px";
    document.getElementsByClassName("logo-image")[0].style.width = logoH + "px";
    document.getElementsByClassName("logo-image")[0].style.height =
        logoH + "px";
    logoI.style.width = logoH + "px";
    logoI.style.height = logoH + "px";
}
// Dimensiona l'area dello storico
const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
const divTop = storicoDiv.offsetTop;
const remainingHeight = hWindow - (divTop - scrollTop) - 2;
storicoDiv.style.height = `${remainingHeight}px`;
// storicoDiv.style.fontSize = Math.round(wWindow * 30 / 13 / 50) + "px";

// Quanti sono i test?
let nTests = listaTest.length;
// predisponi dropdown menu per la scelta del test
let listaSelTest = ['Scegli un test'];
for (let i = 0; i < nTests; i++) {
  test = listaTest[i];
  listaSelTest.push(test[idNomeTest]);
}
const scegliTest = document.getElementById("scegliTest");
listaSelTest.forEach(option => {
  const optionElement = document.createElement('option');
  optionElement.text = option;
  scegliTest.add(optionElement);
});
scegliTest.addEventListener("change", function() {
  let testSelezionato = this.value;
  idxTest = scegliTest.selectedIndex - 1;
// stampa i dettagli del test selezionato
  if (idxTest >= 0) {
    storicoDiv.innerHTML = "";
    storicoDiv.insertAdjacentHTML("beforeend", `Hai selezionato `+testSelezionato+`<br>`);
    test = listaTest[idxTest];
    nomeTest = test[idNomeTest];
    descrTest = test[idDescrTest];
    nDomande = test.length - 2;
    storicoDiv.insertAdjacentHTML("beforeend", `<br>` + sp2 + `Nome del test corrente: ` + nomeTest);
    storicoDiv.insertAdjacentHTML("beforeend", `<br>` + sp2 + `Descrizione del test: ` + descrTest + `<br>`);
    storicoDiv.insertAdjacentHTML("beforeend", sp2 + `Numero di domande: ` + nDomande + `<br>`);
    for (let i = 0; i < nDomande; i++) {
    usaDomande(test,i);
    }
  }
});
storicoDiv.insertAdjacentHTML("beforeend", `Scegli un test<br>`);
