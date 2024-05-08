"use strict";
let soundPath = "./assets/sounds/standard-click.wav";
let soundVolume = 1.0;
window.addEventListener("DOMContentLoaded", () => {
    const test = document.querySelector("#test-1");
    let i = 0;
    const standard = document.querySelector("#standard-click");
    const mechanical = document.querySelector("#mechanical-click");
    const pop = document.querySelector("#pop-click");
    const clacky = document.querySelector("#clacky-click");
    const cap = document.querySelector("#cap-click");
    standard.addEventListener("click", () => {
        soundPath = "./assets/sounds/standard-click.wav";
    });
    mechanical.addEventListener("click", () => {
        soundPath = "./assets/sounds/typewriter.wav";
        soundVolume = 0.3;
    });
    pop.addEventListener("click", () => {
        soundPath = "./assets/sounds/pop.mp3";
        soundVolume = 0.3;
    });
    clacky.addEventListener("click", () => {
        soundPath = "./assets/sounds/clacky.mp3";
        soundVolume = 0.3;
    });
    cap.addEventListener("click", () => {
        soundPath = "./assets/sounds/popcapoff.wav";
        soundVolume = 0.3;
    });
    document.addEventListener("keydown", (event) => {
        if (test && i < originalChars.length && event.key === originalChars[i]) {
            i++;
            let audio = new Audio(soundPath);
            audio.volume = soundVolume;
            audio.play().catch((error) => console.log(error));
        }
        if (i === originalChars.length) {
            i = 0;
        }
        if (event.key === "tab") {
            i = 0;
        }
    });
});
