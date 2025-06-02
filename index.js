const SpeechRecognition      = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList      = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const words = [
    
];

const grammar = `#JSGF V1.0; grammar words; public <word> = ${words.join(" | ",)};`;

const recognition           = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars        = speechRecognitionList;
recognition.continuous      = true;
recognition.lang            = "en-US";
recognition.interimResults  = true;
recognition.maxAlternatives = 1;

const diagnostic = document.querySelector(".output");
const bg         = document.querySelector("html");

document.querySelector(".record").addEventListener("click", () => {
    recognition.start();
});

document.querySelector(".stop-recording").addEventListener("click", () => {
    recognition.stop();
});

recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
    }
    diagnostic.textContent = transcript;
};

recognition.onnomatch = (event) => {
    diagnostic.textContent = "I didn't recognize the speech.";
};

recognition.onerror = (event) => {
    diagnostic.textContent = "";
};