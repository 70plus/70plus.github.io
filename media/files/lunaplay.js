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

const bottoneW = document.getElementById("benvenuto");
bottoneW.addEventListener("click", function () {
    parla("Ciaoh! Facciamo conoscenza, scrivi il tuo nome.", "");
    attesaN = true;
});

const bottoneA = document.getElementById("giocoA");
bottoneA.addEventListener("click", function () {
    parla("Scrivi una parola qui sotto, e io la leggerò!", "");
});

const bottoneB = document.getElementById("giocoB");
var parolaV = "";
bottoneB.addEventListener("click", function () {
    let nParole = parola.length;
    parolaV = parola[Math.floor(Math.random() * nParole)];
    parla("Scrivi: " + parolaV, "");
    attesaP = true;
});

const bottoneF = document.getElementById("favolaF");
bottoneF.addEventListener("click", function () {
    let nFavole = favola.length;
    daLeggere = favola[Math.floor(Math.random() * nFavole)];
    console.log(nFavole);
    parla(daLeggere, "");
});

/* ------------------------------------
   PROGRAMMA
   ------------------------------------ */
var attesaN = false;
var attesaG = false;
var attesaP = false;
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
                    if (
                        v.name.includes("Alice") ||
                        v.name.includes("Isabella")
                    ) {
                        prefLang = i;
                    }
                }
            });
            if (itaLang != -1) {
                if (prefLang != -1) {
                    itaLang = prefLang;
                }
                storicoDiv.insertAdjacentHTML(
                    "afterbegin",
                    "Ti parla " +
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
                "Scegli a quale gioco giocare, premendo uno dei bottoni colorati, A, o B, oppure premi F, se vuoi ascoltare una favola",
                ""
            );
            attesaN = false;
            attesaG = true;
        } else if (attesaP) {
            attesaP = false;
            parolaI = vmsg.value.replace(/^\s+|\s+$/gm,'').toLowerCase();
            if (parolaI == parolaV) {
               parla("Esatto!","");
               vmsg.value = '';
            } else {
               parla("Attenzione, hai scritto" + parolaI,"");
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
