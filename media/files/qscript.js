/* ------------------------------------
   DICHIARAZIONI
   ------------------------------------ */

let sp2 = `&nbsp;&nbsp;`;
let sp4 = sp2 + sp2;
let sp6 = sp4 + sp2;
let test, idxTest, nomeTest, nDomande, idxDomanda, flag;
let testRunning = false;
let optionElement;
let nRispEsatte, strRisp;
const keyVai = [`Scegli dal menu un test da eseguire<br>`,
      `<b>Tocca "Vai" per cominciare</b><br><br>`,
      `<b>Tocca "Vai" per la prossima domanda</b><br><br>`,
      `<b>Il test è terminato, per continuare scegli un altro test</b><br>`,
      `Hai copiato il contenuto dell'area informativa<br>`,
      `Devi prima scegliere un test!<br>`,
      `La copia non è riuscita<br>`];
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
// bottone "copia"
document.getElementById("copia").addEventListener("click", function () {
  let testoCopiato = document.getElementById("storicoDiv").innerHTML;
    for (i = 0; i < keyVai.length;i++) {
      testoCopiato = testoCopiato.replaceAll(keyVai[i], ``);
    }
    testoCopiato = testoCopiato.replaceAll(`<b>`, `**`);
    testoCopiato = testoCopiato.replaceAll(`</b>`, `**`);
    testoCopiato = testoCopiato.replace(/<br\s*[\/]?>/gi, "\n").replace(/&nbsp;/g, " ");
    navigator.clipboard.writeText(testoCopiato)
    .then(() => {})
    .catch(() => {});
    infoT.innerHTML = keyVai[4];
    infoG.showModal();
//    storicoDiv.insertAdjacentHTML("beforeend", keyVai[4]);
//    storicoDiv.scrollTop = storicoDiv.scrollHeight;
});

// bottone ok di chiusura del box di dialogo
closeButton.addEventListener("click", () => {
    infoG.close();
});
// bottone ok di chiusura del form delle domande
okButton.addEventListener("click", () => {
  const checkboxes = formQ.querySelectorAll('input[type="checkbox"]:checked');
  const values = [];

  checkboxes.forEach((checkbox) => {
    values.push(parseInt(checkbox.value));
  });
  formDomande.close();

  let rispEsatte = test[idxDomanda][idListaRispEsatte];
// verifica se la/le risposte sono esatte
  storicoDiv.insertAdjacentHTML("beforeend", `Hai risposto:<br>`);
  for (let i = 0; i < values.length; i++) {
    storicoDiv.insertAdjacentHTML("beforeend", sp2 + test[idxDomanda][idListaRisp][values[i]] + `<br>`);
  }
  const isEqual = values.length === rispEsatte.length && values.every((value, index) => value === rispEsatte[index]);
  if (isEqual) {
    storicoDiv.insertAdjacentHTML("beforeend", `La tua risposta è esatta!<br>`);
    nRispEsatte++;
  } else {
    storicoDiv.insertAdjacentHTML("beforeend", `La risposta esatta è:<br>`);
    for (let i = 0; i < rispEsatte.length; i++) {
      storicoDiv.insertAdjacentHTML("beforeend", sp2 + test[idxDomanda][idListaRisp][rispEsatte[i]] + `<br>`);
    }   
  }
  storicoDiv.insertAdjacentHTML("beforeend", `<br>` + test[idxDomanda][idSpiega] + `<br><br>`);
  if (++idxDomanda < test.length){
    storicoDiv.insertAdjacentHTML("beforeend", keyVai[2]);
  } else {
    idxDomanda = idDomande;
    testRunning = false;
    strRisp = ` domande su `;
    if (nRispEsatte == 1) {strRisp = ` domanda su `;}
    storicoDiv.insertAdjacentHTML("beforeend", `Hai risposto esattamente a ` + nRispEsatte + strRisp + (test.length - idDomande) + `<br>`);
    if (!localStorage.getItem(test[idTest]) || localStorage.getItem(test[idTest]) < nRispEsatte) {
      localStorage.setItem(test[idTest], nRispEsatte);
    }
    storicoDiv.insertAdjacentHTML("beforeend", keyVai[3]);
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
    usaRisposte(test[idxDomanda]);
// svuota  
    formQ.innerHTML = '';
// aggiungi le opzioni della domanda corrente
    document.getElementById("testQ").innerHTML = '<b>' + test[idxDomanda][idTestoDom] + '</b>';
    storicoDiv.insertAdjacentHTML("beforeend", `<b>Domanda n.ro ` + (idxDomanda - idDomande + 1) + `: ` + test[idxDomanda][idTestoDom] + '</b><br><br>');
    let listaOpt = test[idxDomanda][idListaRisp];
      for (let i = 0; i < listaOpt.length; i++) {
        const div = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "checkbox" + i;
        checkbox.id = "checkbox" + i;
        checkbox.value = i;

        const label = document.createElement("label");
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(test[idxDomanda][idListaRisp][i]));

        div.appendChild(label);
        formQ.appendChild(div);
      }
// mostra il form
  formDomande.showModal();
  } else {
        storicoDiv.insertAdjacentHTML("beforeend", keyVai[5]);
        storicoDiv.scrollTop = storicoDiv.scrollHeight;
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
// preparazione del dropdown menu per la selezione del test
listaSelTest.forEach(option => {
  optionElement = document.createElement('option');
  optionElement.text = option;
  scegliTest.add(optionElement);
});
// scelta del test da eseguire
scegliTest.addEventListener("change", function() {
  let testSelezionato = this.value;
  idxTest = scegliTest.selectedIndex - 1;
  scegliTest.selectedIndex = 0;
// stampa i dettagli del test selezionato
  if (idxTest >= 0) {
    test = listaTest[idxTest];
    nomeTest = test[idNomeTest];
    descrTest = test[idDescrTest];
    nDomande = test.length - idDomande;
    storicoDiv.innerHTML = "";
    storicoDiv.insertAdjacentHTML("beforeend", `<b>Test: `+ nomeTest +`</b><br>`);
    storicoDiv.insertAdjacentHTML("beforeend", `<br>` + sp2 + `<b>Descrizione del test:</b><br>` + descrTest + `<br>`);
    storicoDiv.insertAdjacentHTML("beforeend", sp2 + `Numero di domande: ` + nDomande + `<br><br>`);
    idxDomanda = idDomande;
    testRunning = true;
    nRispEsatte = 0;
    storicoDiv.insertAdjacentHTML("beforeend", keyVai[1]);
  }
});
// preparazione del dropdown menu per la selezione dell'azione da eseguire sulle statistiche
listaSelAzione = [`Scegli un'azione`, `Mostra le statistiche`, `Azzera le statistiche`];
listaSelAzione.forEach(option => {
  optionElement = document.createElement('option');
  optionElement.text = option;
  scegliAzione.add(optionElement);
});
// azione da eseguire sulle statistiche
scegliAzione.addEventListener("change", function() {
  let azioneSelezionata = this.value;
  scegliAzione.selectedIndex = 0;
  if (azioneSelezionata == `Mostra le statistiche`) {
    storicoDiv.innerHTML = "<b>Ecco i tuoi migliori risultati nei test:</b><br><br>";
    for (let i = 0; i < nTests; i++) {
    storicoDiv.insertAdjacentHTML("beforeend", listaTest[i][idNomeTest] + `<br>`);
      if (!localStorage.getItem(listaTest[i][idTest])) {
        storicoDiv.insertAdjacentHTML("beforeend", sp2 + `non hai ancora eseguito il test` + `<br>`);
      } else {
        nRispEsatte = localStorage.getItem(listaTest[i][idTest]);
        strRisp = ` risposte esatte su `;
        if (nRispEsatte == 1) {strRisp = ` risposta esatta su `;}
        storicoDiv.insertAdjacentHTML("beforeend", sp2 + nRispEsatte + strRisp + (listaTest[i].length - idDomande) + `<br>`);
      }
    }
  storicoDiv.insertAdjacentHTML("beforeend", `<br>` + keyVai[0]);
  }
  if (azioneSelezionata == `Azzera le statistiche`) {
    localStorage.clear();
    storicoDiv.innerHTML = "Hai cancellato le tue statistiche<br>";
    storicoDiv.insertAdjacentHTML("beforeend", `<br>` + keyVai[0]);
  }
});

storicoDiv.insertAdjacentHTML("beforeend", keyVai[0]);
