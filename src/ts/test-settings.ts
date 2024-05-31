let colorThemes = ["default-theme", "dark-theme", "lavendar-theme", "forest-theme", "matrix-theme", "pink-theme", "discord-theme", "blueberry-theme", "cartoon-theme"];
let soundThemes = ["defualt-click", "mechanical-click", "pop-click", "clacky-click", "cap-click"];

function changeTheme(theme: string) {
  const body = document.querySelector("body");
  if (body) {
    // Remove all other color themes from body's class list
    body.classList.remove(...colorThemes.filter((t) => t !== theme));
    // Add the new theme class to body
    body.classList.add(theme);
    setSettings({ ...getSettings(), theme: theme })
  }
}

function changeClick(sound: string) {
  const body = document.querySelector("body");
  if (body) {
    body.classList.remove(...soundThemes.filter((t) => t !== sound));
    body.classList.add(sound);
    setSettings({ ...getSettings(), sound: sound })
  }
}


window.addEventListener("DOMContentLoaded", function () {
  const body: HTMLElement | null = document.querySelector("body");

  let currentSettings: TcsTyperSettings = getSettings();

  body?.classList.add(currentSettings.theme);
  body?.classList.add(currentSettings.sound);
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
