"use strict";

// *
// * page elements
// *

const root = document.querySelector(":root");
const fireworkColors = ["var(--red)", "var(--blue)", "var(--white)"];

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

fireworkPositionsAndColors();
// setInterval(() => {
//   fireworkPositionsAndColors();
//   console.log("changing color");
// }, 3400);
