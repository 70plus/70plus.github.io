if ("speechSynthesis" in window) {
  // (A) GET HTML ELEMENTS
  let demo = document.getElementById("demoB"),
      vlist = document.getElementById("demoB-voice"),
      vmsg = document.getElementById("demoB-msg"),
      vgo = document.getElementById("demoB-go");

  // (B) POPULATE AVAILABLE VOICES
  // CHROME LOADS VOICES ASYNCHRONOUSLY
  // THUS THIS "STUPID" WAY TO ATTACH AVAILABLE VOICES
  var voices = () => {
    speechSynthesis.getVoices().forEach((v, i) => {
      let opt = document.createElement("option");
      opt.value = i;
  		opt.innerHTML = v.name;
      vlist.appendChild(opt);
    });
  };
  voices();
  speechSynthesis.onvoiceschanged = voices;

  // (C) SPEAK
  var speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.voice = speechSynthesis.getVoices()[vlist.value];
    msg.text = vmsg.value;
    speechSynthesis.speak(msg);
    return false;
  };

  // (D) ENABLE FORM
  demo.onsubmit = speak;
  vlist.disabled = false;
  vmsg.disabled = false;
  vgo.disabled = false;
}