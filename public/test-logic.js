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
// Mode
let mode = "words";
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
function generateContent() {
    return __awaiter(this, void 0, void 0, function* () {
        if (mode === "words") {
            return generateWords();
        }
        else if (mode === "quotes") {
            return generateQuote();
        }
        else {
            throw new Error("Invalid mode");
        }
    });
}
function generateQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("quotes.json");
            if (!response.ok) {
                throw new Error(`Failed to fetch quotes. HTTP status: ${response.status}`);
            }
            const data = yield response.json();
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Invalid quote data format: Quotes array is empty or not an array");
            }
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuote = data[randomIndex];
            if (!randomQuote || !randomQuote.text) {
                throw new Error("Invalid quote data: Missing text in the quote object");
            }
            return randomQuote.text;
        }
        catch (error) {
            if (error instanceof TypeError) {
                console.error("Processing quotes data threw TypeError:", error.message);
                throw new Error("Processing quotes data threw TypeError.");
            }
            else if (error instanceof SyntaxError) {
                console.error("Processing quotes data threw SyntaxError. This typically means invalid JSON format in quotes data:", error);
                throw new Error("Processing quotes data threw SyntaxError. This typically means invalid JSON format in quotes data.");
            }
            else {
                console.error("Unexpected/unknown error when fetching quotes. Try reconnecting your internet connection.", error);
                throw new Error("Unexpected/unknown error when fetching quotes. Try reconnecting your internet connection.");
            }
        }
    });
}
function generateWords() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("words.txt");
        try {
            let data = yield response.text();
            // Split the data into an array of words (assuming words are separated by spaces or new lines)
            let wordsArray = data.split(/\s+/);
            // Shuffle the array of words
            wordsArray = shuffleArray(wordsArray);
            // Take the first 20 words from the shuffled array
            let first20Words = wordsArray.slice(0, 15);
            // Join the first 20 shuffled words back into a string
            let shuffledQuote = first20Words.join(" ");
            return shuffledQuote;
        }
        catch (_a) {
            throw new Error("Failed to parse data");
        }
    });
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Test Logic
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const test = document.querySelector("#test-1");
    const restartButton = document.querySelector("#restart-button");
    let i = 0;
    if (test) {
        test.style.fontSize = "25px";
        try {
            const contentPromise = generateContent(); // Start fetching the content based on mode
            const content = yield contentPromise; // Wait for the content to be fetched
            console.log(content);
            test.innerText = content;
            originalChars = test.innerText.split("");
            chars = [...originalChars];
            test.innerHTML = chars.join("");
        }
        catch (error) {
            console.error("Failed to fetch content:", error);
        }
    }
    const wordsButton = document.querySelector("#words-settings");
    const quotesButton = document.querySelector("#quotes-settings");
    wordsButton.addEventListener("click", () => {
        mode = "words";
        console.log("DEBUG: Mode set to words");
        resetStopwatch();
        generateContent().then((quote) => {
            test.innerText = quote;
            originalChars = test.innerText.split("");
            resetStopwatch();
            i = 0;
            chars = [...originalChars];
            test.innerHTML = chars.join("");
        });
        resetStopwatch();
        i = 0;
        chars = [...originalChars];
        test.innerHTML = chars.join("");
    });
    quotesButton.addEventListener("click", () => {
        mode = "quotes";
        console.log("DEBUG: Mode set to quotes");
        resetStopwatch();
        generateContent().then((quote) => {
            test.innerText = quote;
            originalChars = test.innerText.split("");
            resetStopwatch();
            i = 0;
            chars = [...originalChars];
            test.innerHTML = chars.join("");
        });
        resetStopwatch();
        i = 0;
        chars = [...originalChars];
        test.innerHTML = chars.join("");
    });
    restartButton.addEventListener("click", () => {
        generateContent().then((content) => {
            test.innerText = content;
            originalChars = test.innerText.split("");
            resetStopwatch();
            i = 0;
            chars = [...originalChars];
            test.innerHTML = chars.join("");
        });
        resetStopwatch();
        i = 0;
        chars = [...originalChars];
        test.innerHTML = chars.join("");
    });
    document.addEventListener("keydown", (event) => {
        if (isRunning === false) {
            startStopwatch();
        }
        if (event.key === "Shift")
            return;
        if (event.key === "Tab") {
            //  Generate new quote
            generateContent().then((quote) => {
                test.innerText = quote;
                originalChars = test.innerText.split("");
                resetStopwatch();
                i = 0;
                chars = [...originalChars];
                test.innerHTML = chars.join("");
            });
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
