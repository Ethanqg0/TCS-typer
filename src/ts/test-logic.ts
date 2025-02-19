import { getSettings, getUser, fetchUserDetails } from "./common";
import { UserDetails } from "./common";
import { Chart } from "chart.js/auto";
import { shuffleArray, pad2, Stopwatch, Settings, TypingDataChar, isBestTest, isLoggedIn } from "./utils/util-test-logic";

let userGraphChart: any | null = null;
let soundPath: string = "/assets/sounds/standard-click.wav";
const soundVolume: number = 1.0;
const soundVolumeVariation: number = 0.8;
const soundPitchVariation: number = 0.2;

type TypingData = TypingDataChar[][];

interface TypedData {
  words: TypingData;
  originalWords: TypingData;
  originalChars: string[];
}

interface TestContent {
  stopwatch: Stopwatch;
  settings: Settings;
  typingData: TypedData;
}

/**
 * Represents a typing test implementation.
 * @implements {Test}
 * Propeties:
 * - textBox: HTMLElement
 * - stopwatchDisplay: HTMLElement
 * - stopwatch: Stopwatch
 * - settings: Settings
 * - typingData: QuoteData
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
class TypingTest implements TestContent {
  /**
   * The HTML element representing the text input box where the quote is displayed.
   * @type {HTMLElement}
   */
  testContainer: HTMLElement;
  textBox: HTMLElement;
  testCaret: HTMLElement;

  restartButton: HTMLElement;

  /**
   * The HTML element displaying the stopwatch time.
   * @type {HTMLElement}
   */
  stopwatchDisplay: HTMLElement;

  /**
   * The stopwatch object used for timing the test.
   * @type {Stopwatch}
   */
  stopwatch: Stopwatch;

  /**
   * The settings object defining test configurations.
   * @type {Settings}
   */
  settings: Settings;

  /**
   * The quote data object containing test text information.
   * @type {TypedData}
   */
  typingData: TypedData;

  /**
   * Keeps track of the current character index.
   * @type {number}
   */
  wordIndex: number = 0;
  /**
   * Keeps track of the current character index.
   * @type {number}
   */
  charIndex: number = 0;

  minutes: number = 0;
  seconds: number = 0;
  milliseconds: number = 0;

  /**
   * Constructs a new TypingTest instance.
   * @param {string} id - The ID of the text input box.
   * @param {string} stopwatchId - The ID of the stopwatch display element.
   */
  constructor(id: string, stopwatchId: string, restartButtonId: string) {
    this.testContainer = document.querySelector(`#${id}`) as HTMLDivElement;

    this.textBox = document.createElement("div") as HTMLDivElement;
    this.testContainer.appendChild(this.textBox);
    this.textBox.className = "test-textbox"

    this.testCaret = document.createElement("div") as HTMLDivElement;
    this.testContainer.appendChild(this.testCaret);
    this.testCaret.className = "test-caret"

    window.addEventListener("resize", () => {
      this.moveCaret()
    })

    this.stopwatchDisplay = document.querySelector(
      `#${stopwatchId}`
    ) as HTMLElement;
    this.restartButton = document.querySelector(
      `#${restartButtonId}`
    ) as HTMLElement;

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

    this.typingData = {
      words: [],
      originalWords: [],
      originalChars: [""],
    };
  }

  clickAudio = new Audio(soundPath);

  playClick(): void {
    updateSoundPath();
    if (soundPath !== this.clickAudio.src) {
      this.clickAudio = new Audio(soundPath);
    }
    this.clickAudio.volume = soundVolume - (Math.random() * soundVolumeVariation);
    // console.log(this.clickAudio.volume)
    this.clickAudio.playbackRate = 1.0 + (Math.random() * 2 - 1) * soundPitchVariation;

    this.clickAudio.currentTime = 0;
    this.clickAudio.play().catch((error) => console.error(error));
  }

  /**
   * Starts the stopwatch timer.
   */
  startStopwatch(): void {
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
  updateTime(): void {
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
  displayTime(time: number): void {
    this.minutes = Math.floor(time / 60000);
    this.seconds = Math.floor((time % 60000) / 1000);
    this.milliseconds = Math.floor(time % 1000);

    const formattedTime = `${pad2(this.minutes)}:${pad2(this.seconds)}:${pad2(
      this.milliseconds
    )}`;

    this.stopwatchDisplay.textContent = formattedTime;
  }

  calculateWPM(time: number): number {
    this.minutes = Math.floor(time / 60000);
    this.seconds = Math.floor((time % 60000) / 1000);
    this.milliseconds = Math.floor(time % 1000);

    const totalSeconds =
      this.minutes * 60 + this.seconds + this.milliseconds / 1000;
    const wpm = totalSeconds !== 0 ? Math.round((60 / totalSeconds) * 10) : 0;

    return wpm;
  }

  calculateAccuracy(): number {
    // console.log(this.typingData);
    let correctChars = 0;
    let totalTypedChars = 0;
    let missingChars = 0;

    for (let i = 0; i < this.typingData.originalWords.length; i++) {
      const originalWordLength = this.typingData.originalWords[i].length;
      const typedWord = this.typingData.words[i] || [];

      for (let j = 0; j < originalWordLength; j++) {
        const originalLetter = this.typingData.originalWords[i][j];
        const typedLetter = typedWord[j];

        if (!typedLetter) {
          if (!originalLetter.space && !originalLetter.init) {
            missingChars++;
          }
          continue;
        }

        if (typedLetter.space || typedLetter.init) {
          continue;
        }

        totalTypedChars++;

        if (typedLetter.correct) {
          correctChars++;
        }
      }

      if (typedWord.length > originalWordLength) {
        totalTypedChars += (typedWord.length - originalWordLength);
      }
    }

    // const totalErrors = totalTypedChars + missingChars - correctChars;
    const totalChars = totalTypedChars + missingChars;

    return totalChars === 0 ? 0 : Math.round((correctChars / totalChars) * 100);
  }

  /**
   * Resets the stopwatch timer.
   */
  resetStopwatch(): void {
    this.stopwatch.elapsedTime = 0;
    this.stopStopwatch()
  }

  /**
   * Stops the stopwatch and displays the elapsed time.
   */
  stopStopwatch(): void {
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
  async initializeTest(): Promise<void> {
    const quotes = await this.generateWords();
    this.typingData.originalChars = quotes.split("");
    this.typingData.originalWords = (quotes.split(" ").map((word: string, wordInd: number) => {
      let out: TypingDataChar[] = word.split("").map((character: string) => { return { char: character } })
      out = [...(wordInd > 0 ? [{ char: " ", space: true }] : [{ char: "", init: true }]), ...out];
      return out
    }) as TypingData);
    this.typingData.words = new Array(this.typingData.originalWords.length);
    for (let i = 0; i < this.typingData.originalWords.length; this.typingData.words[i++] = []);
    this.typingData.words[0][0] = { char: "", init: true }
    this.updateTextBox()
    this.moveCaret()
    // console.error("Test chars: ", this.typingData.originalWords);
  }

  async restartTest(): Promise<void> {
    this.resetStopwatch();
    this.charIndex = 0;
    this.wordIndex = 0;
    this.initializeTest()
  }

  async updateTextBox(): Promise<void> {
    // console.log("FOR:", this.wordIndex, this.charIndex)
    // console.dir(this.typingData.words)
    // console.dir(this.typingData.originalWords)
    let newTextBoxHTML = ""

    for (let i = 0; i < this.typingData.originalWords.length; i++) {
      for (let j = 0; j < this.typingData.originalWords[i].length; j++) {
        const originalLetter = this.typingData.originalWords[i][j];
        const typedLetter = this.typingData.words[i]?.[j];

        if (typedLetter) {
          newTextBoxHTML += `<span class="test-char test-char-${typedLetter.space ? "space" : typedLetter.correct ? "correct" : "incorrect"} test-char-${i}-${j}">${originalLetter.char}</span>`;
        } else if (originalLetter) {
          newTextBoxHTML += `<span class="test-char test-char-placeholder test-char-${originalLetter.space ? "space" : ""}">${originalLetter.char}</span>`;
        }
      }

      // If the typed word is longer than the original word
      if (this.typingData.words[i] && this.typingData.words[i].length > this.typingData.originalWords[i].length) {
        for (let k = this.typingData.originalWords[i].length; k < this.typingData.words[i].length; k++) {
          const typedLetter = this.typingData.words[i][k];
          newTextBoxHTML += `<span class="test-char test-char-${typedLetter.space ? "space" : typedLetter.correct ? "correct" : "incorrect"} test-char-${i}-${k}">${typedLetter.char}</span>`;
        }
      }
    }

    // Add the original characters at the end
    // newTextBoxHTML += "<br>" + this.typingData.originalChars.join("");
    this.textBox.innerHTML = newTextBoxHTML
    // this.textBox.innerHTML = this.typingData.words.map((word, wordInd) => { return word.map((letter, letterInd) => { return `<span class="test-char test-char-${letter.space ? "space" : letter.correct ? "correct" : "incorrect"} test-char-${wordInd}-${letterInd}">${letter.char}</span>` }).join("") }).join("") + "<br>" + this.typingData.originalChars.join("");
  }

  /**
   * Fetches a random quote from an external data source.
   * @returns {Promise<string>} A Promise that resolves with the fetched quote text.
   */
  async generateQuote(): Promise<string> {
    const cacheName = "quote-cache";
    const url = "/assets/data/quotes.json";

    try {
      let response;
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(url);

      if (cachedResponse) {
        response = cachedResponse;
      } else {
        response = await fetch(url);
        if (response.ok) {
          cache.put(url, response.clone());
        } else {
          throw new Error("Failed to fetch quote data. HTTP Status: " + response.status);
        }
      }

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error(
          "Invalid quote data format: Quotes array is empty or not an array"
        );
      }

      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuote = data[randomIndex];

      if (!randomQuote || !randomQuote.text) {
        throw new Error("Invalid quote data: Missing text in the quote object");
      }

      return randomQuote.text;
    } catch (error) {
      console.error("Error fetching or processing quote data:", error);
      throw new Error("Failed to fetch or process quote data");
    }
  }

  /**
   * Generates a shuffled quote by fetching words from a text file and shuffling them.
   * @returns A promise that resolves to a string representing the shuffled quote.
   * @throws An error if there is an issue fetching or processing the word data.
   */
  async generateWords(): Promise<string> {
    const cacheName = "words-cache";
    const url = "/assets/data/words.txt";

    try {
      let response;
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(url);

      if (cachedResponse) {
        response = cachedResponse;
      } else {
        response = await fetch(url);
        if (response.ok) {
          cache.put(url, response.clone());
        } else {
          throw new Error(
            "Failed to fetch quote data. HTTP Status: " + response.status
          );
        }
      }
      const data = await response.text();

      // Split the data into an array of words (assuming words are separated by spaces or new lines)
      let wordsArray = data.split(/\s+/);

      // Shuffle the array of words
      wordsArray = shuffleArray(wordsArray);

      // Take the first 20 words from the shuffled array
      const first10Words = wordsArray.slice(0, 10);

      // Join the first 20 shuffled words back into a string
      const shuffledQuote = first10Words.join(" ");

      return shuffledQuote;
    } catch (error) {
      console.error("Error fetching or processing word data:", error);
      throw new Error("Failed to fetch or process word data");
    }
  }

  moveCaret(): void {
    this.testCaret.style.display = "block"
    const lastTypedRect = (this.textBox.querySelector(`.test-char-${this.wordIndex}-${this.charIndex}`) as HTMLSpanElement)?.getBoundingClientRect()
    const testContainerComputedStyles = window.getComputedStyle(this.testContainer, null);
    const testContainerPaddingLeft = parseInt(testContainerComputedStyles.getPropertyValue("padding-left"), 10);
    const testContainerPaddingTop = parseInt(testContainerComputedStyles.getPropertyValue("padding-top"), 10);

    if (lastTypedRect) {
      this.testCaret.style.left = lastTypedRect.x - this.textBox.getBoundingClientRect().x + testContainerPaddingLeft + lastTypedRect.width + "px"
      this.testCaret.style.top = lastTypedRect.y - this.textBox.getBoundingClientRect().y + testContainerPaddingTop + "px"
    } else {
      this.testCaret.style.left = testContainerPaddingLeft + "px"
      this.testCaret.style.top = testContainerPaddingTop + "px"
    }
    this.testCaret.style.animationName = this.wordIndex === 0 && this.charIndex === 0 ? "caretAnim" : "none"
    // console.log(lastTypedRect.x, this.textBox.getBoundingClientRect().x, testContainerPaddingLeft, lastTypedRect.width, lastTypedRect.x - this.textBox.getBoundingClientRect().x + testContainerPaddingLeft + lastTypedRect.width)
  }

  hideCaret(): void {
    this.testCaret.style.display = "none"
  }
}

// Define a type for the test configuration
type TestConfig = {
  id: string;
  elementId: string;
  stopwatchId: string;
  restartButtonId: string;
};

// Define a mapping of pathname to test configuration, Note: Used for the future when we scale the project to have multiple tests
const pathToTestMap: Record<string, TestConfig> = {
  "/": {
    id: "test1",
    elementId: "test-1",
    stopwatchId: "stopwatch-1",
    restartButtonId: "restart-button-1",
  }
};

function updateSoundPath() {
  const currentSound = getSettings().sound;

  soundPath = `/assets/sounds/${currentSound}.wav`;
}

async function sendResultsToDatabase(test: TypingTest) {
  const username = getUser()?.username
  const wpm: number = test.calculateWPM(test.stopwatch.elapsedTime);
  const accuracy: number = test.calculateAccuracy();

  if (!username || username === "") {
    console.log("User is not logged in, skipping sending test results to the database.");
    return;
  }

  await fetch(
    "https://tcs-typer.netlify.app/api/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        wpm: wpm,
        accuracy: accuracy,
      }),
    }
  ).then(() => {
    if ((<any>window).fetchAndDisplayLeaderboard) {
      (<any>window).fetchAndDisplayLeaderboard()
    }
  }).catch((e) => {
    console.error("Failed to send test results to the database:", e);
  });
}

// Fetch Request: Via database fetch; should only be used when the page is initially loaded
async function storeUserDetails() {
  const userDetails: UserDetails = await fetchUserDetails(getUser()?.username);
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

// Not Fetch Request: Via localStorage, avoids unnecessary fetch requests
function updateUserDetails(test: TypingTest) {
  const localUserDetails: string | null = localStorage.getItem("userDetails");
  if (!localUserDetails) {
    console.error("User details not found in localStorage");
    return;
  }
  const userDetails: UserDetails = JSON.parse(localUserDetails);
  const wpm: number = test.calculateWPM(test.stopwatch.elapsedTime);
  const accuracy: number = test.calculateAccuracy();
  userDetails?.tests.push({ "wpm": wpm, "accuracy": accuracy });
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  return;
}

async function displayStats(test: TypingTest, sum_words: number, sum_accuracy: number, all_sum_words: number, all_sum_accuracy: number) {
  const graph = document.getElementById("stats-modal") as HTMLDialogElement;
  const wpm = document.getElementById("stats-wpm") as HTMLParagraphElement;
  const accuracy = document.getElementById("stats-accuracy") as HTMLParagraphElement;
  const wpm_last_ten = document.getElementById("stats-wpm-last-ten") as HTMLParagraphElement;
  const accuracy_last_ten = document.getElementById("stats-accuracy-last-ten") as HTMLParagraphElement;

  wpm_last_ten.innerText = sum_words.toString()
  accuracy_last_ten.innerText = sum_accuracy.toString() + "%"

  const ctx = document.getElementById("user-graph") as HTMLCanvasElement;

  if (userGraphChart) {
    userGraphChart.destroy()
    userGraphChart = null
  }

  const currentWPM = test.calculateWPM(test.stopwatch.elapsedTime).toString();

  userGraphChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Current WPM", "Last 10 WPM", "All-Time WPM"],
      datasets: [
        {
          label: "Words Per Minute",
          data: [currentWPM, sum_words, all_sum_words],
          backgroundColor: [
            "skyblue",
            "dodgerblue",
            "blue",
          ],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  if (graph) {
    graph.showModal();
    wpm.innerText = test.calculateWPM(test.stopwatch.elapsedTime).toString();
    accuracy.innerText = test.calculateAccuracy().toString() + "%"
  }

  const image = document.getElementById(
    "stats-wpm-image"
  ) as HTMLImageElement;
  if (Number(currentWPM) > sum_words) {
    image.src = "/assets/images/up-arrow.png";
  } else {
    image.src = "/assets/images/down-arrow.png";
  }

  const image_accuracy = document.getElementById(
    "stats-accuracy-image"
  ) as HTMLImageElement;
  if (test.calculateAccuracy() > sum_accuracy) {
    image_accuracy.src = "/assets/images/up-arrow.png";
  } else {
    image_accuracy.src = "/assets/images/down-arrow.png";
  }

  graph.addEventListener("click", () => {
    graph.close();
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  let sum_words: number = 0;
  let sum_accuracy: number = 0;
  let all_sum_words: number = 0;
  let all_sum_accuracy: number = 0;

  (async function () {
    storeUserDetails();
    // TODO: Move this to test initialization
    const user = getUser();
    let tests = await (await fetchUserDetails(user.username))
      .tests as unknown as Array<{ wpm: number; accuracy: number }>;

    tests = tests.filter((test) => test.accuracy > 90);

    const last_10_tests = tests.slice(-10);

    sum_words = 0;
    sum_accuracy = 0;

    for (const test of last_10_tests) {
      sum_words += test.wpm / 10;
      sum_accuracy += test.accuracy / 10;
    }

    all_sum_words = 0;
    all_sum_accuracy = 0;

    for (const test of tests) {
      all_sum_words += test.wpm / tests.length;
      all_sum_accuracy += test.accuracy / tests.length;
    }

    sum_words = Math.round(sum_words);
    sum_accuracy = Math.round(sum_accuracy);
  })();

  console.log("Why are you in the console? Are you trying to cheat?")

  updateSoundPath();
  const testBody = document.querySelector("body#test")

  if (!testBody) return
  // Get the test configuration based on the current pathname
  const currentTestConfig = pathToTestMap[window.location.pathname];

  if (!currentTestConfig) {
    console.error("Test not found for current pathname");
    return;
  }

  // Destructure the test configuration
  const { elementId, stopwatchId, restartButtonId } = currentTestConfig;

  // Create a TypingTest instance for the current test
  const currentTest = new TypingTest(elementId, stopwatchId, restartButtonId);
  currentTest.initializeTest();

  currentTest.restartButton.addEventListener("click", async () => {
    await currentTest.restartTest();
  });

  // Add event listener for keydown events
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      currentTest.restartTest()
      return
    }
    if (currentTest.wordIndex >= currentTest.typingData.originalWords.length) {
      return
    }
    if (event.getModifierState("CapsLock")) {
      alert("Caps Lock is on. This may affect your typing accuracy.");
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      if (currentTest.wordIndex > 0 || currentTest.charIndex > 0) {
        // console.log(currentTest.typingData.words[currentTest.wordIndex][currentTest.typingData.words[currentTest.wordIndex].length - 1])
        currentTest.charIndex--;
        if (currentTest.charIndex < 0) {
          currentTest.wordIndex--;
          currentTest.charIndex = currentTest.typingData.words[currentTest.wordIndex].length - 1
        } else {

          currentTest.typingData.words[currentTest.wordIndex].splice(currentTest.charIndex + 1, 1)
        }
        // Update the display
        currentTest.updateTextBox()
        currentTest.moveCaret()
        currentTest.playClick()
      }
      return; // Prevent further processing for backspace/delete
    }

    if (event.ctrlKey || event.altKey || event.metaKey || !/^[a-zA-Z.,' ]$/.test(event.key)) {
      return;
    }

    if (event.key === " ") {
      if (currentTest.charIndex > 0) {
        currentTest.wordIndex++;
        currentTest.charIndex = 0;
        if (currentTest.wordIndex < currentTest.typingData.originalWords.length) {
          currentTest.typingData.words[currentTest.wordIndex][currentTest.charIndex] = { char: event.key, space: true };
        }
      } else {
        return
      }
    } else {
      if (currentTest.wordIndex === 0 && currentTest.charIndex === 0) {
        currentTest.startStopwatch();
      }
      if (currentTest.charIndex > currentTest.typingData.originalWords[currentTest.wordIndex].length + 10) {
        return
      }
      currentTest.charIndex++;
      // console.log(currentTest.typingData.originalWords[currentTest.wordIndex][currentTest.charIndex], currentTest.typingData.originalWords[currentTest.wordIndex])
      currentTest.typingData.words[currentTest.wordIndex][currentTest.charIndex] = { char: event.key, correct: event.key === currentTest.typingData.originalWords[currentTest.wordIndex][currentTest.charIndex]?.char };
      // `<span class="test-char ${event.key === currentTest.typingData.originalChars[currentTest.i] ? "test-char-correct" : "test-char-incorrect"}" style="color: ${event.key === currentTest.typingData.originalChars[currentTest.i] ? "green" : "red"};">` + currentTest.typingData.originalChars[currentTest.i] + "</span>";
    }
    currentTest.updateTextBox()

    currentTest.moveCaret()

    currentTest.playClick()

    // End of test
    if (currentTest.wordIndex > currentTest.typingData.originalWords.length - 1 || (currentTest.wordIndex === currentTest.typingData.originalWords.length - 1 && currentTest.charIndex >= currentTest.typingData.originalWords[currentTest.wordIndex].length - 1)) {
      currentTest.wordIndex++;
      currentTest.stopStopwatch();
      let wpm = currentTest.calculateWPM(currentTest.stopwatch.elapsedTime);
      let accuracy = currentTest.calculateAccuracy();
      displayStats(currentTest, sum_words, sum_accuracy, all_sum_words, all_sum_accuracy);
      currentTest.textBox.innerHTML = wpm + " words per minute with " + accuracy + "% accuracy!";
      currentTest.hideCaret()
      isLoggedIn();
      sendResultsToDatabase(currentTest); // async
      updateUserDetails(currentTest); // sync, does not rely on sendResultsDatabase
      isBestTest(wpm, accuracy);
    }
  });
});