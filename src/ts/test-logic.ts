function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function pad2(number: number): string {
  return (number < 10 ? "0" : "") + number;
}

interface Stopwatch {
  timer: NodeJS.Timeout | null;
  isRunning: boolean;
  startTime: number;
  elapsedTime: number;
  wordsPerMinute: number;
}

interface Settings {
  mode: string;
}

interface QuoteData {
  chars: string[];
  originalChars: string[];
}

interface Test {
  stopwatch: Stopwatch;
  settings: Settings;
  quoteData: QuoteData;
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
class TypingTest implements Test {
  /**
   * The HTML element representing the text input box where the quote is displayed.
   * @type {HTMLElement}
   */
  textBox: HTMLElement;

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
   * @type {QuoteData}
   */
  quoteData: QuoteData;

  /**
   * Keeps track of the current character index.
   * @type {number}
   */
  i: number = 0;

  minutes: number = 0;
  seconds: number = 0;
  milliseconds: number = 0;

  /**
   * Constructs a new TypingTest instance.
   * @param {string} id - The ID of the text input box.
   * @param {string} stopwatchId - The ID of the stopwatch display element.
   */
  constructor(id: string, stopwatchId: string, restartButtonId: string) {
    this.textBox = document.querySelector(`#${id}`) as HTMLElement;
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

    this.quoteData = {
      chars: [""],
      originalChars: [""],
    };
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
  resetStopwatch(): void {
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
    let quotes = await this.generateWords();
    this.quoteData.chars = quotes.split("");
    this.quoteData.originalChars = quotes.split("");
    this.textBox.innerHTML = quotes;
    console.error("LOGGED: ", this.quoteData.chars);
  }

  async restartTest(): Promise<void> {
    this.resetStopwatch();
    this.i = 0;
    let quotes = await this.generateWords();
    this.quoteData.chars = quotes.split("");
    this.quoteData.originalChars = quotes.split("");
    this.textBox.innerHTML = quotes;
  }

  /**
   * Fetches a random quote from an external data source.
   * @returns {Promise<string>} A Promise that resolves with the fetched quote text.
   */
  async generateQuote(): Promise<string> {
    try {
      const response = await fetch("/assets/data/quotes.json");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch quotes. HTTP status: ${response.status}`
        );
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
    const response = await fetch("/assets/data/words.txt");

    try {
      let data = await response.text();

      // Split the data into an array of words (assuming words are separated by spaces or new lines)
      let wordsArray = data.split(/\s+/);

      // Shuffle the array of words
      wordsArray = shuffleArray(wordsArray);

      // Take the first 20 words from the shuffled array
      let first10Words = wordsArray.slice(0, 10);

      // Join the first 20 shuffled words back into a string
      let shuffledQuote = first10Words.join(" ");

      return shuffledQuote;
    } catch (error) {
      console.error("Error fetching or processing word data:", error);
      throw new Error("Failed to fetch or process word data");
    }
  }

  async generateContent(): Promise<string> {
    // TODO;

    return "";
  }
}

// Define a type for the test configuration
type TestConfig = {
  id: string;
  elementId: string;
  stopwatchId: string;
  restartButtonId: string;
};

// Define a mapping of pathname to test configuration
const pathToTestMap: Record<string, TestConfig> = {
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

let soundPath: string = "../assets/sounds/standard-click.wav";
let soundVolume: number = 1.0;

function updateSoundPath() {
  let click = localStorage.getItem("sound");

  if (click === "standard-click") {
    soundPath = "../../assets/sounds/standard-click.wav";
  } else if (click === "mechanical-click") {
    soundPath = "../../assets/sounds/typewriter.wav";
  } else if (click === "pop-click") {
    soundPath = "../../assets/sounds/pop.mp3";
  } else if (click === "clacky-click") {
    soundPath = "../../assets/sounds/clacky.mp3";
  } else if (click === "cap-click") {
    soundPath = "../../../assets/sounds/popcapoff.wav";
  } else {
    localStorage.setItem("sound", "standard-click");
    soundPath = "../../assets/sounds/standard-click.wav"; // Ensure soundPath is set correctly after updating localStorage
  }
}

window.addEventListener("DOMContentLoaded", () => {
  updateSoundPath();
});

let username = null;

async function sendResultsToDatabase(test: TypingTest) {
  username = localStorage.getItem("username");
  let wpm: number = test.calculateWPM(test.stopwatch.elapsedTime);
  let accuracy: number = test.calculateAccuracy();

  try {
    const response = await fetch(
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
    );
  } catch (error) {
    console.error("Failed to send test results to the database:", error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  username = localStorage.getItem("username");
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

  currentTest.restartButton.addEventListener("click", async () => {
    await currentTest.restartTest();
  });

  // Add event listener for keydown events
  document.addEventListener("keydown", function async(event) {
    if (currentTest.i === 0) {
      currentTest.startStopwatch();
    }

    if (event.key === "Shift" || event.key === "Control" || event.key === "Alt") {
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

    } else if (currentTest && currentTest.i < currentTest.quoteData.originalChars.length && event.key !== currentTest.quoteData.originalChars[currentTest.i]) {
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
      sendResultsToDatabase(currentTest);
      currentTest.textBox.innerHTML = currentTest.calculateWPM(currentTest.stopwatch.elapsedTime) + " words per minute with " + currentTest.calculateAccuracy() + "% accuracy!";
      console.log("BOOM WPM:", currentTest.calculateWPM(currentTest.stopwatch.elapsedTime));
    }
  });
});
