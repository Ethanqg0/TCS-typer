// Timer
let timer: NodeJS.Timeout | null = null;
let isRunning: boolean = false;
let startTime: number = 0;
let elapsedTime: number = 0;
let wordsPerMinute: number = 0;

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
async function generateQuote(): Promise<string> {
  try {
    const response = await fetch("quotes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

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
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error; // Propagate the error for proper handling
  }
}



// Test Logic
window.addEventListener("DOMContentLoaded", async () => {
  const test: HTMLElement = document.querySelector("#test-1") as HTMLElement;
  let i: number = 0;

  if (test) {
    test.style.fontSize = "25px";

    try {
      const quotePromise = generateQuote(); // Start fetching the quote
      const quote = await quotePromise; // Wait for the quote to be fetched
      console.log(quote);
      test.innerText = quote;
      originalChars = test.innerText.split("");
      chars = [...originalChars];
      test.innerHTML = chars.join("");
    } catch (error) {
       console.error("Failed to fetch quote:", error);
    }

  }

  document.addEventListener("keydown", (event) => {
    if (isRunning === false) {
        startStopwatch();  
    }
    if (event.key === "Shift") return;
    if (event.key === "Tab") { // shoudl restart the test
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