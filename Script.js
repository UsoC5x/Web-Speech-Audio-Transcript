const speakBtn = document.getElementById("speakBtn");
const textInput = document.getElementById("text");
const languageSelect = document.getElementById("language");
const genderSelect = document.getElementById("gender");

let voices = [];

function loadVoices() {
  voices = speechSynthesis.getVoices();
}

window.speechSynthesis.onvoiceschanged = loadVoices;

speakBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  if (!text) {
    alert("Digite algum texto!");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const lang = languageSelect.value;
  const gender = genderSelect.value;

  // Filtrar vozes por idioma e gênero
  const matchingVoices = voices.filter(
    (v) =>
      v.lang.toLowerCase().startsWith(lang) &&
      (gender === "female"
        ? v.name.toLowerCase().includes("female")
        : v.name.toLowerCase().includes("male") ||
          !v.name.toLowerCase().includes("female"))
  );

  if (matchingVoices.length > 0) {
    utterance.voice = matchingVoices[0];
  } else {
    // fallback genérico
    utterance.lang = lang;
  }

  speechSynthesis.speak(utterance);
});
