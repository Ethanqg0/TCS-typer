"use strict";
let soundPath = "./click.mp3";
window.addEventListener("DOMContentLoaded", () => {
    const test = document.querySelector("#test-1");
    let i = 0;
    const standard = document.querySelector("#standard-click");
    const mechanical = document.querySelector("#mechanical-click");
    const pop = document.querySelector("#pop-click");
    standard.addEventListener("click", () => {
        soundPath = "./click.mp3";
    });
    mechanical.addEventListener("click", () => {
        soundPath = "./click-mechanical.wav";
    });
    pop.addEventListener("click", () => {
        soundPath = "./pop.wav";
    });
    document.addEventListener("keydown", (event) => {
        if (test && i < originalChars.length && event.key === originalChars[i]) {
            i++;
            new Audio(soundPath).play().catch((error) => console.log(error));
        }
    });
});
