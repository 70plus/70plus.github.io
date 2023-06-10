function parla(messaggio,stampa) {
    let msg = new SpeechSynthesisUtterance();
    msg.voice = speechSynthesis.getVoices()[itaLang];
    msg.text = messaggio;
    speechSynthesis.speak(msg);
    if (stampa) {storicoDiv.insertAdjacentHTML("afterbegin", messaggio + '<br>')};
}

const bottoneW = document.getElementById("benvenuto");
bottoneW.addEventListener("click", function() {
   parla('Ciao! Facciamo conoscenza, scrivi il tuo nome.', false);
   attesaN = true;
});
var attesaN = false;
var attesaG = false;

// dimensioni dello schermo
hWindow = window.innerHeight;
wWindow = window.innerWidth;
//
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
  // (A) GET HTML ELEMENTS
  let demo = document.getElementById("dialogo"),
      vmsg = document.getElementById("dialogo-msg"),
      vgo = document.getElementById("dialogo-go");
      const storicoDiv = document.getElementById("storico");

if ("speechSynthesis" in window) {
  // (B) POPULATE AVAILABLE VOICES
  var voices = () => {
    if (itaLang == -1) {
        speechSynthesis.getVoices().forEach((v, i) => {
        if (v.name.includes('talian') || v.lang == 'it-IT' || v.lang == 'it_IT') {
            itaLang = i;
            if (v.name.includes('Alice') || v.name.includes('Isabella')) {prefLang = i};
            };
        });
      if (itaLang != -1) {
          if (prefLang != -1) {itaLang = prefLang};
          storicoDiv.insertAdjacentHTML("afterbegin", 'Ti parla ' + speechSynthesis.getVoices()[itaLang].name + '<br>');
          };
    };
  };

  itaLang = -1;
  prefLang = -1;
  voices();
  speechSynthesis.onvoiceschanged = voices;

  // (C) SPEAK
  var speak = () => {
    if (attesaN) {
       nome = vmsg.value;
       parla('Ciao ' + nome + '!',true);
       parla('Scegli a quale gioco giocare, premendo uno dei tre bottoni colorati, A, B, o C',false);
       attesaN = false;
       attesaG = true;
    } else {
       parla(vmsg.value,false);
    }
    return false;
  };

  // (D) ENABLE FORM
  demo.onsubmit = speak;
  vmsg.disabled = false;
  vgo.disabled = false;
}