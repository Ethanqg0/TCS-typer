// Timer
let timer: NodeJS.Timeout | null = null;
let isRunning: boolean = false;
let startTime: number = 0;
let elapsedTime: number = 0;
let wordsPerMinute: number = 0;

// Mode
let mode: string = "words";

// Quote Arrays
let chars: string[] = [""];
let originalChars: string[] = [""];

function startStopwatch(): void {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10); // Update time every 10 milliseconds
    setInterval(updateWordsPerMinute, 10);
  }
}

function updateWordsPerMinute(): void {
    // use elapsedTime variable
    const correctlyTypedChars = chars.filter((char) =>
    char.includes('<span style="color: green">')
    ).length;
    const wpm: number = correctlyTypedChars / 5 / (elapsedTime / 60000);

  wordsPerMinute = wpm;
  const wpmElement: HTMLElement | null = document.getElementById("words-per-minute");
    if (wpmElement) {
        wpmElement.textContent = Math.round(wpm).toString();
    }
}

function updateTime(): void {
  const now: number = Date.now();
  elapsedTime = now - startTime;
  displayTime(elapsedTime);
}

function displayTime(time: number): void {
  const minutes: number = Math.floor(time / 60000);
  const seconds: number = Math.floor((time % 60000) / 1000);
  const milliseconds: number = Math.floor((time % 1000) / 10);

  const formattedTime: string = `${pad2(minutes)}:${pad2(seconds)}:${pad2(
    milliseconds
  )}`;

  const stopwatchElement: HTMLElement | null =
    document.getElementById("stopwatch");
  if (stopwatchElement) {
    stopwatchElement.textContent = formattedTime;
  }
}

function pad2(number: number): string {
  return (number < 10 ? "0" : "") + number;
}

function stopStopwatch(): void {
  if (isRunning && timer) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetStopwatch(): void {
  if (timer) {
    clearInterval(timer);
  }
  isRunning = false;
  elapsedTime = 0;
  displayTime(elapsedTime);
}

// Load Random Quote from quotes.json

async function generateContent(): Promise<string> {
  if (mode === "words") {
    console.log("DEBUG: Generating words")
    return generateWords();
  } else if (mode === "quotes") {
    console.log("DEBUG: Generating quotes")
    return generateQuote();
  } else {
    throw new Error("Invalid mode");
  }
}

async function generateQuote(): Promise<string> {
  try {
    const response = await fetch("quotes.json");

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
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      console.error("CRITICAL ERROR: Processing quotes data threw TypeError:", error.message);
      throw new Error("CRITICAL ERROR: Processing quotes data threw TypeError.");
    } 
    else if (error instanceof SyntaxError) {
      console.error("CRITICAL ERROR: Processing quotes data threw SyntaxError. This typically means invalid JSON format in quotes data:", error);
      throw new Error(
        "CRITICAL ERROR: Processing quotes data threw SyntaxError. This typically means invalid JSON format in quotes data."
      );
    }
    else {
      console.error("CRITICAL ERROR: Unexpected/unknown error when fetching quotes. Try reconnecting your internet connection.", error);
      throw new Error(
        "CRITICAL ERROR: Unexpected/unknown error when fetching quotes. Try reconnecting your internet connection."
      );
    }
  }
}

async function generateWords(): Promise<string> {
  const response = await fetch("words.txt");

  try {
    let data = await response.text();

    // Split the data into an array of words (assuming words are separated by spaces or new lines)
    let wordsArray = data.split(/\s+/);

    // Shuffle the array of words
    wordsArray = shuffleArray(wordsArray);

    // Take the first 20 words from the shuffled array
    let first20Words = wordsArray.slice(0, 15);

    // Join the first 20 shuffled words back into a string
    let shuffledQuote = first20Words.join(" ");

    return shuffledQuote;
  } catch {
    throw new Error("Failed to parse data");
  }
}

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("DOMContentLoaded", async() => {
  const wordsButton: HTMLElement = document.querySelector("#words-settings") as HTMLElement;
  const quotesButton: HTMLElement = document.querySelector("#quotes-settings") as HTMLElement;

  wordsButton.addEventListener("click", () => {
    mode = "words";
    console.log("DEBUG: Mode set to words")
    resetStopwatch();
  });

  quotesButton.addEventListener("click", () => {
    mode = "quotes";
    console.log("DEBUG: Mode set to quotes")
    resetStopwatch();
  });
});

// Test Logic
window.addEventListener("DOMContentLoaded", async () => {
  const test: HTMLElement = document.querySelector("#test-1") as HTMLElement;
  const restartButton: HTMLElement = document.querySelector("#restart-button") as HTMLElement;
  let i: number = 0;

  if (test) {
    test.style.fontSize = "25px";

    try {
      const contentPromise = generateContent(); // Start fetching the content based on mode
      const content = await contentPromise; // Wait for the content to be fetched
      console.log(content);
      test.innerText = content;
      originalChars = test.innerText.split("");
      chars = [...originalChars];
      test.innerHTML = chars.join("");
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
  }

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
    if (event.key === "Shift") return;
    if (event.key === "Tab") { // shoudl restart the test
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
    if (
      event.key === "Backspace" &&
      chars[i].includes('<span style="color: red">')
    ) {
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
    } else if (
      test &&
      i < originalChars.length &&
      event.key !== originalChars[i]
    ) {
      chars[i] = '<span style="color: red">' + originalChars[i] + "</span>";
      test.innerHTML = chars.join("");
    }

    if (i === originalChars.length) {
        stopStopwatch();
    }
  });
});