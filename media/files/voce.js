if ("speechSynthesis" in window) {
  // (A) GET HTML ELEMENTS
  let demo = document.getElementById("demoB"),
//      vlist = document.getElementById("demoB-voice"),
      vmsg = document.getElementById("demoB-msg"),
      vgo = document.getElementById("demoB-go");

  // (B) POPULATE AVAILABLE VOICES
  // CHROME LOADS VOICES ASYNCHRONOUSLY
  // THUS THIS "STUPID" WAY TO ATTACH AVAILABLE VOICES
  var voices = () => {
    speechSynthesis.getVoices().forEach((v, i) => {
//    if (v.name.includes('italian') || v.name == 'Alice' || v.name == 'Elsa') {itaLang = i};
    if (v.name.includes('talian') || v.lang == 'it-IT') {itaLang = i};
//   if (v.lang == 'it-IT') {itaLang = i};
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