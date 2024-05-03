let timer: NodeJS.Timeout | null = null; // To store the interval timer
let isRunning: boolean = false;
let startTime: number = 0;
let elapsedTime: number = 0;
let wordsPerMinute: number = 0;
let chars: string[] = [""];
let originalChars: string[] = [""];
let soundPath: string = "./click.mp3";

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

window.addEventListener("DOMContentLoaded", function() {
  const body = document.querySelector("body")
  const defaultTheme = document.querySelector("#default-theme") as HTMLElement;
  const matrixTheme = document.querySelector("#matrix-theme") as HTMLElement;
  const pinkTheme = document.querySelector("#pink-theme") as HTMLElement;

  defaultTheme.addEventListener("click", function () {
    body?.classList.remove("matrix-theme");
    body?.classList.remove("pink-theme");
    body?.classList.add("default-theme");
  });
  
  pinkTheme.addEventListener("click", function() {
    body?.classList.remove("default-theme");
    body?.classList.remove("matrix-theme");
    body?.classList.add("pink-theme");
  })

  matrixTheme.addEventListener("click", function () {
    body?.classList.remove("default-theme");
    body?.classList.remove("pink-theme");
    body?.classList.add("matrix-theme");
  }); 


})


window.addEventListener("DOMContentLoaded", () => {
  const test: HTMLElement = document.querySelector("#test-1") as HTMLElement;
  let i: number = 0;

  const standard: HTMLElement = document.querySelector("#standard-click") as HTMLElement;
  const mechanical: HTMLElement = document.querySelector("#mechanical-click") as HTMLElement;
  const pop: HTMLElement = document.querySelector("#pop-click") as HTMLElement;  

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
        new Audio(soundPath)
          .play()
          .catch((error) => console.log(error));
    } else if (
      test &&
      i < originalChars.length &&
      event.key !== originalChars[i]
    ) {
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