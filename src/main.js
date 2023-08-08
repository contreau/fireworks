"use strict";

// *
// * page elements
// *

const root = document.querySelector(":root");
const fireworkColors = ["var(--red)", "var(--blue)", "var(--white)"];
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

// *
// * main function
// *

function fireworkPositionsAndColors() {
  // randomizes color order
  const colorset = [];
  while (colorset.length < 3) {
    let randomColorIndex = Math.floor(Math.random() * fireworkColors.length);
    if (!colorset.includes(fireworkColors[randomColorIndex])) {
      colorset.push(fireworkColors[randomColorIndex]);
    }
  }

  // spark coloring
  for (let i in fireworkSparks) {
    fireworkSparks[i].map((el) => {
      el.style.backgroundColor = colorset[i];
      el.style.filter = `drop-shadow(0 0 0.4em ${colorset[i]})`;
    });
  }

  // launcher coloring
  for (let i in launchers) {
    launchers[i].style.setProperty("--dropShadow-color", `${colorset[i]}`);
    launchers[i].style.setProperty("--boxShadow-color", `${colorset[i]}`);
  }

  // determines offsetTop value for root css variables
  for (let i = 0; i < fireworkContainers.length; i++) {
    root.style.setProperty(
      `--fw${i + 1}-offset`,
      `${fireworkContainers[i].offsetTop}px`
    );
  }
}

function startInterval() {
  setInterval(() => {
    console.log("swapping colors");
    fireworkPositionsAndColors();
  }, 2600);
}

// starts firework display on click
let initialClick = false;
startButton.addEventListener("click", () => {
  if (!initialClick) {
    initialClick = true;
    // initiates interval to randomize colors
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

fireworkPositionsAndColors();
// this laptop browser viewport is 787px high, for reference
