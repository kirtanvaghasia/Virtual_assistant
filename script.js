let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  // text_speak.lang = "hi-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hrs = day.getHours();
  if (hrs >= 0 && hrs <= 12) {
    speak("Good Morning");
  } else if (hrs > 12 && hrs <= 16) {
    speak("Good Afternoon");
  } else {
    speak("Good Evening");
  }
}

window.addEventListener("load", () => {
  wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  
  let transcript = event.results[currentIndex][0].transcript;
  
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";

  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    speak("Hello, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I'm your virtual assistant, created by Kirtan Vaghasia");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com");
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.co.in/");
  } else if (message.includes("open calculator")) {
    speak("Opening calculator");
    window.open("calculator://");
  } else if (message.includes("open whatsapp")) {
    speak("Opening WhatsApp");
    window.open("whatsapp://");
  } else if (message.includes("time")) {
    let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    speak(time);
  } else if (message.includes("date")) {
    let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
    speak(date);
  } else {
    let finalText = "This is what I found on the internet regarding " + message;
    speak(finalText);
    window.open(`https://www.google.com/search?q=${message}`);
  }
}
