export function shuffleArray(array: Array<string>): Array<string> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function pad2(number: number): string {
  return (number < 10 ? "0" : "") + number;
}

export interface Stopwatch {
  timer: NodeJS.Timeout | null;
  isRunning: boolean;
  startTime: number;
  elapsedTime: number;
  wordsPerMinute: number;
}

export interface Settings {
  mode: string;
}

export type TypingDataChar = {
  char: string;
  correct?: boolean;
  space?: boolean;
  init?: boolean;
};

export function isBestTest(wpm: any, accuracy: any) {
  if (accuracy < 90) {
    return false;
  }

  let userTests: any = localStorage.getItem("userDetails");
  let tests = JSON.parse(userTests).tests;

  if (tests.length === 0) {
    return false;
  }

  for (const test of tests) {
    if (test.wpm > wpm && test.accuracy >= accuracy) {
      return false;
    }
  }

  const toast_success = document.querySelector(".toast-success") as HTMLElement;
  toast_success.classList.add("show");

  return true;
}

export function isLoggedIn() {
  let user: any = localStorage.getItem("TcsTyper_SavedUser");
  user = JSON.parse(user);
  if (user["username"] === "") {
    const toast_warning = document.querySelector(
      ".toast-warning"
    ) as HTMLElement;
    toast_warning.classList.add("show");
    return true;
  } else {
    return false;
  }
}