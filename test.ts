/*
    Split() method divides a string into an an array of substring. If the parameter is empty, the array will contain each character of the string.

    We have our text as a string, split it into characters and store it in an array. Chars keeps track of the texts with the color added and originalChars keeps track of the original text.
*/

let timer: NodeJS.Timeout | null = null; // To store the interval timer
let isRunning: boolean = false;
let startTime: number = 0;
let elapsedTime: number = 0;
let wordsPerMinute: number = 0;
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
    char.includes('<span style="color: blue">')
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


window.addEventListener("DOMContentLoaded", () => {
  let audio = new Audio("./click.mp3");
  const test: HTMLElement = document.querySelector("#test-1") as HTMLElement;
  let i: number = 0;

  if (test) {
    test.innerText =
      "The quick brown fox jumps over the lazy dog.";
    originalChars = test.innerText.split("");
    chars = [...originalChars];
    test.innerHTML = chars.join("");
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
      chars[i] = '<span style="color: blue">' + originalChars[i] + "</span>";
      test.innerHTML = chars.join("");
      i++;
        new Audio("./pop.wav")
          .play()
          .catch((error) => console.log(error));
    } else if (
      test &&
      i < originalChars.length &&
      event.key !== originalChars[i]
    ) {
      chars[i] = '<span style="color: red">' + originalChars[i] + "</span>";
      test.innerHTML = chars.join("");
        new Audio("./pop.wav")
          .play()
          .catch((error) => console.log(error));
    }

    if (i === originalChars.length) {
        stopStopwatch();
    }
  });
});