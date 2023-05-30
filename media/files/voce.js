if ("speechSynthesis" in window) {
  // (A) GET HTML ELEMENTS
  let demo = document.getElementById("demoB"),
//      vlist = document.getElementById("demoB-voice"),
      vmsg = document.getElementById("demoB-msg"),
      vgo = document.getElementById("demoB-go");
      const storicoDiv = document.getElementById("storico");

  // (B) POPULATE AVAILABLE VOICES
  // CHROME LOADS VOICES ASYNCHRONOUSLY
  // THUS THIS "STUPID" WAY TO ATTACH AVAILABLE VOICES
  var voices = () => {
    speechSynthesis.getVoices().forEach((v, i) => {
    storicoDiv.insertAdjacentHTML("afterbegin", "name = " + v.name + " lang = " + v.lang + "<br>");
    if (v.name.includes('talian') || v.lang == 'it-IT' || v.lang == 'it_IT') {itaLang = i};
    });
  };
  voices();
  speechSynthesis.onvoiceschanged = voices;

  // (C) SPEAK
  var speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.voice = speechSynthesis.getVoices()[itaLang];
    msg.text = vmsg.value;
    speechSynthesis.speak(msg);
    console.log(itaLang);
    return false;
  };

  // (D) ENABLE FORM
  demo.onsubmit = speak;
  vmsg.disabled = false;
  vgo.disabled = false;
}