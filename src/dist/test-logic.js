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
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function pad2(number) {
    return (number < 10 ? "0" : "") + number;
}
/**
 * Represents a typing test implementation.
 * @implements {Test}
 * Propeties:
 * - textBox: HTMLElement
 * - stopwatchDisplay: HTMLElement
 * - stopwatch: Stopwatch
 * - settings: Settings
 * - quoteData: QuoteData
 * - i: number
 *
 * Methods:
 * - startStopwatch(): void
 * - updateTime(): void
 * - displayTime(time: number): void
 * - resetStopwatch(): void
 * - stopStopwatch(): void
 * - calculateWPM(time: number): number
 * - calculateAccuracy(): number
 * - initializeTest(): Promise<void>
 * - generateQuote(): Promise<string>
 */
class TypingTest {
    /**
     * Constructs a new TypingTest instance.
     * @param {string} id - The ID of the text input box.
     * @param {string} stopwatchId - The ID of the stopwatch display element.
     */
    constructor(id, stopwatchId, restartButtonId) {
        /**
         * Keeps track of the current character index.
         * @type {number}
         */
        this.i = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.textBox = document.querySelector(`#${id}`);
        this.stopwatchDisplay = document.querySelector(`#${stopwatchId}`);
        this.restartButton = document.querySelector(`#${restartButtonId}`);
        this.stopwatch = {
            timer: null,
            isRunning: false,
            startTime: 0,
            elapsedTime: 0,
            wordsPerMinute: 0,
        };
        this.settings = {
            mode: "words",
        };
        this.quoteData = {
            chars: [""],
            originalChars: [""],
        };
    }
    /**
     * Starts the stopwatch timer.
     */
    startStopwatch() {
        if (!this.stopwatch.isRunning) {
            this.stopwatch.startTime = Date.now() - this.stopwatch.elapsedTime;
            this.stopwatch.timer = setInterval(() => {
                this.updateTime();
            }, 10);
            this.stopwatch.isRunning = true;
        }
    }
    /**
     * Updates the elapsed time on the stopwatch display.
     */
    updateTime() {
        if (this.stopwatch.isRunning) {
            const now = Date.now();
            this.stopwatch.elapsedTime = now - this.stopwatch.startTime;
            this.displayTime(this.stopwatch.elapsedTime);
        }
    }
    /**
     * Displays the formatted time on the stopwatch display element.
     * @param {number} time - The elapsed time in milliseconds.
     */
    displayTime(time) {
        this.minutes = Math.floor(time / 60000);
        this.seconds = Math.floor((time % 60000) / 1000);
        this.milliseconds = Math.floor(time % 1000);
        const formattedTime = `${pad2(this.minutes)}:${pad2(this.seconds)}:${pad2(this.milliseconds)}`;
        this.stopwatchDisplay.textContent = formattedTime;
    }
    calculateWPM(time) {
        this.minutes = Math.floor(time / 60000);
        this.seconds = Math.floor((time % 60000) / 1000);
        this.milliseconds = Math.floor(time % 1000);
        const totalSeconds = this.minutes * 60 + this.seconds + this.milliseconds / 1000;
        const wpm = totalSeconds !== 0 ? Math.round((60 / totalSeconds) * 10) : 0;
        return wpm;
    }
    calculateAccuracy() {
        let incorrectChars = 0;
        for (let i = 0; i < this.quoteData.chars.length; i++) {
            if (this.quoteData.chars[i].includes('<span style="color: red">')) {
                incorrectChars++;
            }
        }
        const totalChars = this.quoteData.originalChars.length;
        const correctChars = totalChars - incorrectChars;
        return Math.round((correctChars / totalChars) * 100);
    }
    /**
     * Resets the stopwatch timer.
     */
    resetStopwatch() {
        if (this.stopwatch.timer) {
            clearInterval(this.stopwatch.timer);
        }
        this.stopwatch.isRunning = false;
        this.stopwatch.elapsedTime = 0;
        this.displayTime(this.stopwatch.elapsedTime);
    }
    /**
     * Stops the stopwatch and displays the elapsed time.
     */
    stopStopwatch() {
        if (this.stopwatch.timer) {
            clearInterval(this.stopwatch.timer);
        }
        this.stopwatch.isRunning = false;
        this.displayTime(this.stopwatch.elapsedTime);
    }
    /**
     * Initializes the typing test by fetching and setting up the test text.
     * @returns {Promise<void>} A Promise that resolves when the test is initialized.
     */
    initializeTest() {
        return __awaiter(this, void 0, void 0, function* () {
            let quotes = yield this.generateWords();
            this.quoteData.chars = quotes.split("");
            this.quoteData.originalChars = quotes.split("");
            this.textBox.innerHTML = quotes;
            console.error("LOGGED: ", this.quoteData.chars);
        });
    }
    restartTest() {
        return __awaiter(this, void 0, void 0, function* () {
            this.resetStopwatch();
            this.i = 0;
            let quotes = yield this.generateWords();
            this.quoteData.chars = quotes.split("");
            this.quoteData.originalChars = quotes.split("");
            this.textBox.innerHTML = quotes;
        });
    }
    /**
     * Fetches a random quote from an external data source.
     * @returns {Promise<string>} A Promise that resolves with the fetched quote text.
     */
    generateQuote() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("../../data/quotes.json");
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
                console.error("Error fetching or processing quote data:", error);
                throw new Error("Failed to fetch or process quote data");
            }
        });
    }
    /**
     * Generates a shuffled quote by fetching words from a text file and shuffling them.
     * @returns A promise that resolves to a string representing the shuffled quote.
     * @throws An error if there is an issue fetching or processing the word data.
     */
    generateWords() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch("../../data/words.txt");
            try {
                let data = yield response.text();
                // Split the data into an array of words (assuming words are separated by spaces or new lines)
                let wordsArray = data.split(/\s+/);
                // Shuffle the array of words
                wordsArray = shuffleArray(wordsArray);
                // Take the first 20 words from the shuffled array
                let first10Words = wordsArray.slice(0, 10);
                // Join the first 20 shuffled words back into a string
                let shuffledQuote = first10Words.join(" ");
                return shuffledQuote;
            }
            catch (error) {
                console.error("Error fetching or processing word data:", error);
                throw new Error("Failed to fetch or process word data");
            }
        });
    }
    generateContent() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO;
            return "";
        });
    }
}
// Define a mapping of pathname to test configuration
const pathToTestMap = {
    "/": {
        id: "test1",
        elementId: "test-1",
        stopwatchId: "stopwatch-1",
        restartButtonId: "restart-button-1",
    },
    "/index.html": {
        id: "test1",
        elementId: "test-1",
        stopwatchId: "stopwatch-1",
        restartButtonId: "restart-button-1",
    },
    "/src/index.html": {
        id: "test1",
        elementId: "test-1",
        stopwatchId: "stopwatch-1",
        restartButtonId: "restart-button-1",
    }
};
let soundPath = "../assets/sounds/standard-click.wav";
let soundVolume = 1.0;
function updateSoundPath() {
    let click = localStorage.getItem("sound");
    if (click === "standard-click") {
        soundPath = "../../assets/sounds/standard-click.wav";
    }
    else if (click === "mechanical-click") {
        soundPath = "../../assets/sounds/typewriter.wav";
    }
    else if (click === "pop-click") {
        soundPath = "../../assets/sounds/pop.mp3";
    }
    else if (click === "clacky-click") {
        soundPath = "../../assets/sounds/clacky.mp3";
    }
    else if (click === "cap-click") {
        soundPath = "../../../assets/sounds/popcapoff.wav";
    }
    else {
        localStorage.setItem("sound", "standard-click");
        soundPath = "../../assets/sounds/standard-click.wav"; // Ensure soundPath is set correctly after updating localStorage
    }
}
window.addEventListener("DOMContentLoaded", () => {
    updateSoundPath();
});
window.addEventListener("DOMContentLoaded", () => {
    // Get the test configuration based on the current pathname
    const currentTestConfig = pathToTestMap[window.location.pathname];
    if (!currentTestConfig) {
        console.error("Test not found for current pathname");
        return;
    }
    // Destructure the test configuration
    const { id, elementId, stopwatchId, restartButtonId } = currentTestConfig;
    // Create a TypingTest instance for the current test
    const currentTest = new TypingTest(elementId, stopwatchId, restartButtonId);
    currentTest.initializeTest();
    currentTest.restartButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        yield currentTest.restartTest();
    }));
    // Add event listener for keydown events
    document.addEventListener("keydown", function async(event) {
        if (currentTest.i === 0) {
            currentTest.startStopwatch();
        }
        if (event.key === "Shift") {
            return;
        }
        if (event.key === "Backspace" || event.key === "Delete") {
            if (currentTest.i > 0) {
                currentTest.i--;
                // Remove styling from the last character
                currentTest.quoteData.chars[currentTest.i] =
                    currentTest.quoteData.originalChars[currentTest.i];
                // Update the display
                currentTest.textBox.innerHTML = currentTest.quoteData.chars.join("");
            }
            return; // Prevent further processing for backspace/delete
        }
        if (currentTest && currentTest.i < currentTest.quoteData.originalChars.length && event.key === currentTest.quoteData.originalChars[currentTest.i]) {
            currentTest.quoteData.chars[currentTest.i] =
                '<span style="color: green">' + currentTest.quoteData.originalChars[currentTest.i] + "</span>";
            currentTest.textBox.innerHTML = currentTest.quoteData.chars.join("");
            currentTest.i++;
            updateSoundPath();
            let audio = new Audio(soundPath);
            audio.volume = soundVolume;
            audio.play().catch((error) => console.log(error));
        }
        else if (currentTest && currentTest.i < currentTest.quoteData.originalChars.length && event.key !== currentTest.quoteData.originalChars[currentTest.i]) {
            currentTest.quoteData.chars[currentTest.i] =
                '<span style="color: red">' + currentTest.quoteData.originalChars[currentTest.i] + "</span>";
            currentTest.textBox.innerHTML = currentTest.quoteData.chars.join("");
            updateSoundPath();
            currentTest.i++;
            let audio = new Audio(soundPath);
            audio.volume = soundVolume;
            audio.play().catch((error) => console.log(error));
        }
        if (currentTest.i === currentTest.quoteData.originalChars.length) {
            currentTest.stopStopwatch();
            currentTest.textBox.innerHTML = currentTest.calculateWPM(currentTest.stopwatch.elapsedTime) + " words per minute with " + currentTest.calculateAccuracy() + "% accuracy!";
            console.log("BOOM WPM:", currentTest.calculateWPM(currentTest.stopwatch.elapsedTime));
        }
    });
});
