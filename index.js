const corAtual = document.querySelector(".cor-alvo");
const divBotoes = document.querySelector(".buttons");
const timer = document.getElementById("timer");
const pointsText = document.querySelector(".pontos");
const title = document.getElementsByTagName("h1")[0];
const exit = document.getElementById("sair");
const popAudio = new Audio("res\\sounds\\pop-39222.mp3");
const pop2Audio = new Audio("res\\sounds\\pop2-84862.mp3");

let points = 0;
let difficulty = 1;
let colorChoice;
let choice;
const colorsText = [
  "vermelho",
  "marrom",
  "roxo",
  "laranja",
  "verde",
  "azul",
  "amarelo",
  "rosa",
  "preto",
  "cinza",
];
let isPlaying = false;

const playSound = (audio) => {
  const clonedAudio = new Audio(audio.src); // Clona o objeto Audio
  clonedAudio.play();
};

const changeColor = () => {
  choice = colorsText[Math.floor(Math.random() * colorsText.length)];
  const possibleColors = colorsText.filter((s) => s !== choice);
  corAtual.classList.remove(colorChoice);

  corAtual.textContent = choice.toUpperCase();

  colorChoice =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  corAtual.classList.add(colorChoice);
};

const loadButtons = () => {
  timer.style.visibility = "visible";
  document.getElementsByTagName("main")[0].removeChild(title);
  divBotoes.innerHTML = "";
  divBotoes.classList.add("colored");
  colorsText.forEach((cor) => {
    const btn = document.createElement("button");
    //btn.innerHTML = cor.toUpperCase();
    btn.classList.add(cor);
    btn.addEventListener("click", buttonClick);
    divBotoes.appendChild(btn);
  });
};

const getDifficultyInSeconds = () => {
  switch (difficulty) {
    case 0:
      return 5;
    case 1:
      return 3;
    case 2:
      return 2;
    default:
      return 5;
  }
};

let seconds = getDifficultyInSeconds();
let intervalId;

const formatTime = (time) => {
  return time.toString().padStart(2, "0");
};

const updateTimer = () => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    formatTime(hours) +
    ":" +
    formatTime(minutes) +
    ":" +
    formatTime(remainingSeconds);

  timer.textContent = formattedTime;
  seconds--;
  if (seconds < 0) {
    changeColor();
    seconds = getDifficultyInSeconds();
  }
};

const loadTimer = () => {
  intervalId = setInterval(updateTimer, 1000);
};

const loadGame = () => {
  playSound(popAudio);
  changeColor();
  loadButtons();
  loadTimer();
};

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.createElement("button");
  timer.style.visibility = "hidden";
  startButton.innerHTML = "Iniciar";
  startButton.classList.add("play");

  startButton.addEventListener("click", loadGame);
  divBotoes.appendChild(startButton);
  pointsText.innerHTML = "Highscore: " + localStorage.getItem("highscore");
});

const buttonClick = (e) => {
  console.log(colorChoice);
  const colorButton = e.target.classList[0];
  if (colorButton === colorChoice) {
    points++;
    playSound(popAudio);

    if (localStorage.getItem("highscore") != null) {
      if (points > localStorage.getItem("highscore")) {
        localStorage.setItem("highscore", points);
      }
    } else {
      localStorage.setItem("highscore", points);
    }
    pointsText.textContent = points + " ponto(s)";
    seconds = getDifficultyInSeconds();
    updateTimer();
  } else {
    playSound(pop2Audio);
  }
  changeColor();
};
