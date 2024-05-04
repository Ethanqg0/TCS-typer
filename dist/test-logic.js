"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Timer
let timer = null;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let wordsPerMinute = 0;
// Quote Arrays
let chars = [""];
let originalChars = [""];
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
// Load Random Quote from quotes.json
// Load Random Quote from quotes.json
function generateQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("quotes.json");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Invalid quote data format");
            }
            // Get a random quote from the array
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            if (!randomQuote || !randomQuote.text) {
                throw new Error("Invalid quote data");
            }
            return randomQuote.text;
        }
        catch (error) {
            console.error("Error fetching quote:", error);
            throw error; // Propagate the error for proper handling
        }
    });
}
// Test Logic
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const test = document.querySelector("#test-1");
    let i = 0;
    if (test) {
        test.style.fontSize = "25px";
        try {
            const quotePromise = generateQuote(); // Start fetching the quote
            const quote = yield quotePromise; // Wait for the quote to be fetched
            console.log(quote);
            test.innerText = quote;
            originalChars = test.innerText.split("");
            chars = [...originalChars];
            test.innerHTML = chars.join("");
        }
        catch (error) {
            console.error("Failed to fetch quote:", error);
        }
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
        }
        else if (test &&
            i < originalChars.length &&
            event.key !== originalChars[i]) {
            chars[i] = '<span style="color: red">' + originalChars[i] + "</span>";
            test.innerHTML = chars.join("");
        }
        if (i === originalChars.length) {
            stopStopwatch();
        }
    });
}));
