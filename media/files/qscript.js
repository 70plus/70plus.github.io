/* ------------------------------------
   DICHIARAZIONI
   ------------------------------------ */

let sp2 = `&nbsp;&nbsp;`;
let sp4 = sp2 + sp2;
let sp6 = sp4 + sp2;
let test, idxTest, nomeTest, nDomande, idxDomanda;
let testRunning = false;
const keyVai_1 = `Tocca "Vai" per cominciare<br><br>`
const keyVai_2 = `Tocca "Vai" per la prossima domanda<br><br>`;
const keyVai_3 = `Il test è terminato, per continuare scegli un altro test`;
const storicoDiv = document.getElementById("storicoDiv");
const infoG = document.querySelector("#infoGioco");
const infoT = document.querySelector("#infoTesto");
const closeButton = document.querySelector("#okB");
const vaiButton = document.querySelector("#Vai");
const formDomande = document.getElementById("formDomande");
const formQ = document.getElementById("formQ");
const cancelButton = document.querySelector("#cancelButton");
const okButton = document.querySelector("#okButton");
const scegliAzione = document.getElementById("scegliAzione");
const scegliTest = document.getElementById("scegliTest");

/* ------------------------------------
   FUNZIONI
   ------------------------------------ */
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
  rispEsatte.sort((a,b) => a-b);
  return
}
// scelta dell'azione da eseguire
scegliAzione.addEventListener("change", function() {
  let i = scegliAzione.selectedIndex;
  scegliAzione.selectedIndex = 0;

  switch(i) {
    case 1:
      let testoCopiato = document.getElementById("storicoDiv").innerHTML;
      testoCopiato = testoCopiato.replaceAll(keyVai_1, ``);
      testoCopiato = testoCopiato.replaceAll(keyVai_2, ``);
      testoCopiato = testoCopiato.replaceAll(keyVai_3, ``);
      testoCopiato = testoCopiato.replace(/<br\s*[\/]?>/gi, "\n").replace(/&nbsp;/g, " ");
      navigator.clipboard.writeText(testoCopiato).then(
        () => {
            /* clipboard successfully set */
        },
        () => {
            /* clipboard write failed */
        }
    );
    infoT.innerHTML = "Hai copiato il contenuto dell'area informativa!";
    infoG.showModal();
//    storicoDiv.insertAdjacentHTML("beforeend", "Hai copiato il contenuto dell'area informativa!<br>");
    break;
  }
});
// bottone ok di chiusura del box di dialogo
closeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    infoG.close();
//    scegliAzione.classList.remove("show");
});
// bottone ok di chiusura del form delle domande
okButton.addEventListener("click", () => {
  const checkboxes = formQ.querySelectorAll('input[type="checkbox"]:checked');
  const values = [];

  checkboxes.forEach((checkbox) => {
    values.push(parseInt(checkbox.value));
  });
  formDomande.close();

  let rispEsatte = test[idxDomanda+2][idListaRispEsatte];
// verifica se la/le risposte sono esatte
  storicoDiv.insertAdjacentHTML("beforeend", `Hai risposto:<br>`);
  for (let i = 0; i < values.length; i++) {
    storicoDiv.insertAdjacentHTML("beforeend", sp2 + test[idxDomanda+2][idListaRisp][values[i]] + `<br>`);
  }
  const isEqual = values.length === rispEsatte.length && values.every((value, index) => value === rispEsatte[index]);
  if (isEqual) {
    storicoDiv.insertAdjacentHTML("beforeend", `La tua risposta è esatta!<br>`);
  } else {
    storicoDiv.insertAdjacentHTML("beforeend", `La risposta esatta è:<br>`);
    for (let i = 0; i < rispEsatte.length; i++) {
      storicoDiv.insertAdjacentHTML("beforeend", sp2 + test[idxDomanda+2][idListaRisp][rispEsatte[i]] + `<br>`);
    }   
  }
  storicoDiv.insertAdjacentHTML("beforeend", `<br>` + test[idxDomanda+2][idSpiega] + `<br><br>`);
  if (++idxDomanda + 2 < test.length){
    storicoDiv.insertAdjacentHTML("beforeend", keyVai_2);
  } else {
    idxDomanda = 0;
    testRunning = false;
    storicoDiv.insertAdjacentHTML("beforeend", keyVai_3);
  }
  storicoDiv.scrollTop = storicoDiv.scrollHeight;
});
// bottone annulla di chiusura del form delle domande
cancelButton.addEventListener("click", () => {
    formDomande.close();
});
// Bottone Vai!
vaiButton.addEventListener("click", function () {
  if (testRunning) {
    usaRisposte(test[idxDomanda+2]);
// svuota  
    formQ.innerHTML = '';
// aggiungi le opzioni della domanda corrente
    document.getElementById("testQ").innerHTML = '<b>' + test[idxDomanda+2][idTestoDom] + '</b>';
    storicoDiv.insertAdjacentHTML("beforeend", `Domanda n.ro ` + (idxDomanda+1) + `: ` + test[idxDomanda+2][idTestoDom] + '<br><br>');
    let listaOpt = test[idxDomanda+2][idListaRisp];
      for (let i = 0; i < listaOpt.length; i++) {
        const div = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "checkbox" + i;
        checkbox.id = "checkbox" + i;
        checkbox.value = i;

        const label = document.createElement("label");
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(test[idxDomanda+2][idListaRisp][i]));

        div.appendChild(label);
        formQ.appendChild(div);
      }
// mostra il form
  formDomande.showModal();
  }
});

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
listaSelTest.forEach(option => {
  const optionElement = document.createElement('option');
  optionElement.text = option;
  scegliTest.add(optionElement);
});
// scelta del test da eseguire
scegliTest.addEventListener("change", function() {
  let testSelezionato = this.value;
  idxTest = scegliTest.selectedIndex - 1;
// stampa i dettagli del test selezionato
  if (idxTest >= 0) {
    test = listaTest[idxTest];
    nomeTest = test[idNomeTest];
    descrTest = test[idDescrTest];
    nDomande = test.length - 2;
    storicoDiv.innerHTML = "";
    storicoDiv.insertAdjacentHTML("beforeend", `Test: `+ nomeTest +`<br>`);
    storicoDiv.insertAdjacentHTML("beforeend", `<br>` + sp2 + `Descrizione del test:<br>` + descrTest + `<br>`);
    storicoDiv.insertAdjacentHTML("beforeend", sp2 + `Numero di domande: ` + nDomande + `<br><br>`);
    idxDomanda = 0;
    testRunning = true;
    storicoDiv.insertAdjacentHTML("beforeend", keyVai_1);
  }
});
storicoDiv.insertAdjacentHTML("beforeend", `Scegli un test<br>`);
