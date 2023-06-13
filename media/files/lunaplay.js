/* ------------------------------------
   FUNZIONI
   ------------------------------------ */
function parla(messaggio, stampa) {
    let msg = new SpeechSynthesisUtterance();
    msg.voice = speechSynthesis.getVoices()[itaLang];
    msg.text = messaggio;
    msg.rate = 0.95;
    speechSynthesis.speak(msg);
    if (stampa.length > 0) {
        storicoDiv.insertAdjacentHTML("afterbegin", stampa + "<br>");
    }
}

function waitWhileSpeaking(prosegui) {
  var utterance = new SpeechSynthesisUtterance();
  utterance.text = '';
  utterance.addEventListener('end', function() {
    prosegui();
  });
  window.speechSynthesis.speak(utterance);
}

function setFocus() {
   vmsg.focus();
   vmsg.selectionStart = vmsg.value.length;
   vmsg.selectionEnd = vmsg.value.length;
}

const bottoneW = document.getElementById("benvenuto");
bottoneW.addEventListener("click", function () {
    attesaN = true;
    attesaP = false;
    parla("Ciaoh! Facciamo conoscenza, scrivi il tuo nome.", "");
    waitWhileSpeaking(setFocus);
});

const bottoneA = document.getElementById("giocoA");
bottoneA.addEventListener("click", function () {
    attesaN = false;
    attesaP = false;
    parla("Scrivi una parola qui sotto, e io la leggerò!", "");
    waitWhileSpeaking(setFocus);
});

const bottoneB = document.getElementById("giocoB");
var parolaV = "";
bottoneB.addEventListener("click", function () {
    attesaN = false;
    attesaP = true;
    let nParole = parola.length;
    parolaV = parola[Math.floor(Math.random() * nParole)];
    parla("Scrivi: " + parolaV, "");
    waitWhileSpeaking(setFocus);
});

const bottoneF = document.getElementById("favolaF");
bottoneF.addEventListener("click", function () {
    attesaN = false;
    attesaP = false;
    let nFavole = favola.length;
    do {
       favolaL = Math.floor(Math.random() * nFavole);
    } while (favolaL == favolaP);
    favolaP = favolaL; 
    parla(favola[favolaL][0], favola[favolaL][0].toUpperCase());
    parla(favola[favolaL][1], "");
});

const stopV = document.getElementById("stopVoce");
stopV.addEventListener("click", function () {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
       window.speechSynthesis.cancel();
       event.preventDefault();
    }
});

/* ------------------------------------
   PROGRAMMA
   ------------------------------------ */
var attesaN = false;
var attesaP = false;
var favolaP = -1;
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
// Rileva gli ID degli elementi HTML
let demo = document.getElementById("dialogo"),
    vmsg = document.getElementById("dialogo-msg"),
    vgo = document.getElementById("dialogo-go");
const storicoDiv = document.getElementById("storico");

itaLang = -1;
prefLang = -1;

if ("speechSynthesis" in window) {
    // Recupera le voci disponibili e scegli la migliore per l'italiano
    var voices = () => {
        if (itaLang == -1) {
            speechSynthesis.getVoices().forEach((v, i) => {
                if (
                    v.name.includes("talian") ||
                    v.lang == "it-IT" ||
                    v.lang == "it_IT"
                ) {
                    itaLang = i;
                    storicoDiv.insertAdjacentHTML("afterbegin", v.name + "<br>");
                    if (
                        v.name.includes("Alice") ||
                        v.name.includes("Elsa")
                    ) {
                        prefLang = i;
                    }
                }
            });
            if (itaLang != -1) {
                if (prefLang != -1) {
                    itaLang = prefLang;
                }
                storicoDiv.insertAdjacentHTML("afterbegin", "<br>Voci disponibili:<br>");
                storicoDiv.insertAdjacentHTML(
                    "afterbegin",
                    "<br>Ti parla " +
                        speechSynthesis.getVoices()[itaLang].name +
                        "<br>"
                );
            }
        }
    };

    voices();
    speechSynthesis.onvoiceschanged = voices;

    // Quando si invia l'input:
    var speak = () => {
        if (attesaN) {
            nome = vmsg.value;
            vmsg.value = '';
            parla("Ciaoh " + nome + "!", "Ciao " + nome + "!");
            parla(
                "Scegli a quale gioco giocare, premendo uno dei bottoni colorati, A, o B, oppure premi F, se vuoi ascoltare una breve favola",
                ""
            );
            attesaN = false;
        } else if (attesaP) {
            attesaP = false;
            parolaI = vmsg.value.replace(/^\s+|\s+$/gm,'').toLowerCase();
            if (parolaI == parolaV) {
               parla("Esatto!","");
               vmsg.value = '';
            } else {
               parla("Attenzione, hai scritto: " + parolaI,"");
            }
        } else {
            parla(vmsg.value, "");
            vmsg.value = '';
        }
        return false;
    };

    // Abilita il form
    demo.onsubmit = speak;
    vmsg.disabled = false;
    vgo.disabled = false;
}
