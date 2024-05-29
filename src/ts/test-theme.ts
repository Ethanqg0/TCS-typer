let colorThemes = ["default-theme", "dark-theme", "lavendar-theme", "forest-theme", "matrix-theme", "pink-theme", "discord-theme", "blueberry-theme", "cartoon-theme"];
let soundThemes = ["standard-click", "mechanical-click", "pop-click", "clacky-click", "cap-click"];

function changeTheme(theme: string) {
  const body = document.querySelector("body");
  if (body) {
    // Remove all other color themes from body's class list
    body.classList.remove(...colorThemes.filter((t) => t !== theme));
    // Add the new theme class to body
    body.classList.add(theme);
    // Save the selected theme to localStorage
    localStorage.setItem("theme", theme);
  }
}

function changeClick(sound: string) {
  const body = document.querySelector("body");
  if (body) {
    body.classList.remove(...soundThemes.filter((t) => t !== sound));
    body.classList.add(sound);
    localStorage.setItem("sound", sound);
  }
}


window.addEventListener("DOMContentLoaded", function () {
  const body: HTMLElement | null = document.querySelector("body");
  let currentSound: string | null = localStorage.getItem("sound");
  let currentTheme: string | null = localStorage.getItem("theme");

  if (!currentSound) {
    localStorage.setItem("sound", "standard-click");
    currentSound = "standard-click"
  }
  body?.classList.add(currentSound || "");


  if (!currentTheme) {
    localStorage.setItem("theme", "default-theme");
    currentTheme = "default-theme"
  }
  body?.classList.add(currentTheme || "");
});

window.addEventListener("DOMContentLoaded", function () {
  for (let sound of soundThemes) {
    const soundButton = document.querySelector("#" + sound) as HTMLElement;
    soundButton?.addEventListener("click", function () {
      changeClick(sound);
      let audio = new Audio(`/assets/sounds/${sound}.wav`);
      audio.volume = 0.8;
      audio.play();
    });
  }
});

window.addEventListener("DOMContentLoaded", function () {
  for (let theme of colorThemes) {
    const themeButton = document.querySelector("#" + theme) as HTMLElement;
    themeButton?.addEventListener("click", function () {
      changeTheme(theme);
    });
  }
});
