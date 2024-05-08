let soundPath: string = "./assets/sounds/standard-click.wav";
let soundVolume: number = 1.0;

window.addEventListener("DOMContentLoaded", () => {
  const test: HTMLElement = document.querySelector("#test-1") as HTMLElement;
  let i: number = 0;

  const standard: HTMLElement = document.querySelector(
    "#standard-click"
  ) as HTMLElement;
  const mechanical: HTMLElement = document.querySelector(
    "#mechanical-click"
  ) as HTMLElement;
  const pop: HTMLElement = document.querySelector("#pop-click") as HTMLElement;
  const clacky: HTMLElement = document.querySelector("#clacky-click") as HTMLElement;
  const cap: HTMLElement = document.querySelector("#cap-click") as HTMLElement;

  standard.addEventListener("click", () => {
    soundPath = "./assets/sounds/standard-click.wav";
  });

  mechanical.addEventListener("click", () => {
    soundPath = "./assets/sounds/typewriter.wav";
    soundVolume = 0.3;
  });

  pop.addEventListener("click", () => {
    soundPath = "./assets/sounds/pop.mp3";
    soundVolume = 0.3;
  });

  clacky.addEventListener("click", () => {
    soundPath = "./assets/sounds/clacky.mp3";
    soundVolume = 0.3;
  });

  cap.addEventListener("click", () => {
    soundPath = "./assets/sounds/popcapoff.wav";
    soundVolume = 0.3;
  });

  document.addEventListener("keydown", (event) => {
    if (test && i < originalChars.length && event.key === originalChars[i]) {
      i++;
      let audio = new Audio(soundPath);
      audio.volume = soundVolume;
      audio.play().catch((error) => console.log(error));
    }
    if (i === originalChars.length) {
      i = 0;
    }
    if (event.key === "tab") {
      i = 0;
    }
  });
});
