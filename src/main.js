"use strict";

// *
// * page elements
// *

const root = document.querySelector(":root");
let fireworkColors = ["var(--red)", "var(--blue)", "var(--white)"];
const startButton = document.querySelector(".start-button");
const buttonText = document.querySelector(".button-text");
const uiModal = document.querySelector(".ui-modal");

// firework sparks
const fw1 = Array.from(document.querySelectorAll(".fw-1"));
const fw2 = Array.from(document.querySelectorAll(".fw-2"));
const fw3 = Array.from(document.querySelectorAll(".fw-3"));
const fireworkSparks = [fw1, fw2, fw3];

// firework containers
const fc1 = document.querySelector(".fc-1");
const fc2 = document.querySelector(".fc-2");
const fc3 = document.querySelector(".fc-3");
const fireworkContainers = [fc1, fc2, fc3];

// firework launchers
const lchr1 = document.querySelector(".lchr-1");
const lchr2 = document.querySelector(".lchr-2");
const lchr3 = document.querySelector(".lchr-3");
const launchers = [lchr1, lchr2, lchr3];

// randomizer boolean
let randomize = false;

// *
// * main functions
// *

function fireworkPositionsAndColors() {
  // spark coloring
  for (let i in fireworkSparks) {
    fireworkSparks[i].map((el) => {
      el.style.backgroundColor = fireworkColors[i];
      el.style.filter = `drop-shadow(0 0 0.4em ${fireworkColors[i]})`;
    });
  }

  // launcher coloring
  for (let i in launchers) {
    launchers[i].style.setProperty(
      "--dropShadow-color",
      `${fireworkColors[i]}`
    );
    launchers[i].style.setProperty("--boxShadow-color", `${fireworkColors[i]}`);
  }

  // determines offsetTop value for root css variables
  for (let i = 0; i < fireworkContainers.length; i++) {
    root.style.setProperty(
      `--fw${i + 1}-offset`,
      `${fireworkContainers[i].offsetTop}px`
    );
  }
}

// Shuffles fireworkColors array (Fisher-Yates algorithm)
function randomizeColors() {
  for (let i = 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fireworkColors[i], fireworkColors[j]] = [
      fireworkColors[j],
      fireworkColors[i],
    ];
  }
}

// Interval kicked off by initial click
function startInterval() {
  setInterval(() => {
    if (randomize) randomizeColors();
    fireworkPositionsAndColors();
  }, 2590);
}

// starts firework display on click
let initialClick = false;
startButton.addEventListener("click", () => {
  if (!initialClick) {
    initialClick = true;
    startInterval();
    // transitions button content + positioning
    buttonText.style.opacity = 0;
    startButton.classList.add("shift-down-animation");
    buttonText.classList.add("fadeIn");
    setTimeout(() => {
      buttonText.innerHTML = "<i class='fa-solid fa-caret-down'></i>";
    }, 200);
    // initiates firework animations
    setTimeout(() => {
      fireworkSparks.map((fw) => {
        fw.map((f) => f.classList.add("firework-animation"));
      });
      launchers.map((l) => l.classList.add("launch-animation"));
    }, 800);
  } else {
    // moves modal in and out
    const caret = document.querySelector(".fa-caret-down");
    caret.classList.toggle("rotateCaret");
    uiModal.classList.toggle("modal-reveal");
  }
});

// *
// * Display Settings
// *

// Radius Slider
const slider = document.querySelector(".slider");
const output = document.querySelector(".slider-value");
output.innerHTML = slider.defaultValue;
slider.value = slider.defaultValue;
slider.oninput = function () {
  output.innerHTML = this.value;
  root.style.setProperty("--explosion-radius", `${slider.value}px`);
};

// Colorpickers
const colorpicker = Array.from(document.querySelectorAll(".color-picker"));
colorpicker.map((el) => {
  el.onchange = function () {
    fireworkColors.splice(parseInt(this.id), 1, this.value);
  };
});

// Randomizer Checkbox
const checkbox = document.querySelector("#randomize");
checkbox.addEventListener("click", () => {
  if (checkbox.value === "false") {
    // initiates interval to randomize colors
    checkbox.value = "true";
    randomize = true;
  } else if (checkbox.value === "true") {
    checkbox.value = "false";
    randomize = false;
  }
});

fireworkPositionsAndColors();
startButton.style.opacity = 1;
