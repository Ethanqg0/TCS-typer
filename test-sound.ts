let soundPath: string = "./click.mp3";

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

  standard.addEventListener("click", () => {
    soundPath = "./click.mp3";
  });

  mechanical.addEventListener("click", () => {
    soundPath = "./click-mechanical.wav";
  });

  pop.addEventListener("click", () => {
    soundPath = "./pop.wav";
  });

  document.addEventListener("keydown", (event) => {
    if (test && i < originalChars.length && event.key === originalChars[i]) {
      i++;
      new Audio(soundPath).play().catch((error) => console.log(error));
    }
    if (i === originalChars.length) {
      i = 0;
    }
  });
});
