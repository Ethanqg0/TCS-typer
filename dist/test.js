"use strict";
/*
    Split() method divides a string into an an array of substring. If the parameter is empty, the array will contain each character of the string.

    We have our text as a string, split it into characters and store it in an array. Chars keeps track of the texts with the color added and originalChars keeps track of the original text.
*/
let timer = null; // To store the interval timer
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let wordsPerMinute = 0;
let chars = [""];
let originalChars = [""];
let soundPath = "./click.mp3";
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10); // Update time every 10 milliseconds
        setInterval(updateWordsPerMinute, 10);
    }
}
function updateWordsPerMinute() {
    // use elapsedTime variable
    const correctlyTypedChars = chars.filter((char) => char.includes('<span style="color: green">')).length;
    const wpm = correctlyTypedChars / 5 / (elapsedTime / 60000);
    wordsPerMinute = wpm;
    const wpmElement = document.getElementById("words-per-minute");
    if (wpmElement) {
        wpmElement.textContent = Math.round(wpm).toString();
    }
}
function updateTime() {
    const now = Date.now();
    elapsedTime = now - startTime;
    displayTime(elapsedTime);
}
function displayTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    const formattedTime = `${pad2(minutes)}:${pad2(seconds)}:${pad2(milliseconds)}`;
    const stopwatchElement = document.getElementById("stopwatch");
    if (stopwatchElement) {
        stopwatchElement.textContent = formattedTime;
    }
}
function pad2(number) {
    return (number < 10 ? "0" : "") + number;
}
function stopStopwatch() {
    if (isRunning && timer) {
        clearInterval(timer);
        isRunning = false;
    }
}
function resetStopwatch() {
    if (timer) {
        clearInterval(timer);
    }
    isRunning = false;
    elapsedTime = 0;
    displayTime(elapsedTime);
}
window.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const defaultTheme = document.querySelector("#default-theme");
    const matrixTheme = document.querySelector("#matrix-theme");
    const pinkTheme = document.querySelector("#pink-theme");
    defaultTheme.addEventListener("click", function () {
        body === null || body === void 0 ? void 0 : body.classList.remove("matrix-theme");
        body === null || body === void 0 ? void 0 : body.classList.remove("pink-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("default-theme");
    });
    pinkTheme.addEventListener("click", function () {
        body === null || body === void 0 ? void 0 : body.classList.remove("default-theme");
        body === null || body === void 0 ? void 0 : body.classList.remove("matrix-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("pink-theme");
    });
    matrixTheme.addEventListener("click", function () {
        body === null || body === void 0 ? void 0 : body.classList.remove("default-theme");
        body === null || body === void 0 ? void 0 : body.classList.remove("pink-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("matrix-theme");
    });
});
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
    if (test) {
        test.style.fontSize = "20px";
        test.innerText =
            "Bran thought about it. 'Can a man still be brave if he's afraid?' 'That is the only time a man can be brave,' his father told him.";
        originalChars = test.innerText.split("");
        chars = [...originalChars];
        test.innerHTML = chars.join("");
    }
    document.addEventListener("keydown", (event) => {
        if (isRunning === false) {
            startStopwatch();
        }
        if (event.key === "Shift")
            return;
        if (event.key === "Tab") { // shoudl restart the test
            resetStopwatch();
            i = 0;
            chars = [...originalChars];
            test.innerHTML = chars.join("");
        }
        if (event.key === "Backspace" &&
            chars[i].includes('<span style="color: red">')) {
            if (i > 0) {
                chars[i] = originalChars[i];
                test.innerHTML = chars.join("");
            }
            return;
        }
        if (test && i < originalChars.length && event.key === originalChars[i]) {
            chars[i] = '<span style="color: green">' + originalChars[i] + "</span>";
            test.innerHTML = chars.join("");
            i++;
            new Audio(soundPath)
                .play()
                .catch((error) => console.log(error));
        }
        else if (test &&
            i < originalChars.length &&
            event.key !== originalChars[i]) {
            chars[i] = '<span style="color: red">' + originalChars[i] + "</span>";
            test.innerHTML = chars.join("");
            new Audio(soundPath)
                .play()
                .catch((error) => console.log(error));
        }
        if (i === originalChars.length) {
            stopStopwatch();
        }
    });
});
