import { getSettings, setSettings, TcsTyperSettings } from "./common";

const colorThemes = { "default-theme": "Light Theme", "dark-theme": "Dark Theme", "lavendar-theme": "Lavendar Theme", "forest-theme": "Forest Theme", "matrix-theme": "Matrix Theme", "pink-theme": "Pink Theme", "discord-theme": "Discord Theme", "blueberry-theme": "Blueberry Theme", "cartoon-theme": "Cartoon Theme" };
const soundThemes = { "default-click": "Standard Click", "mechanical-click": "Mechanical Click", "pop-click": "Pop Click", "clacky-click": "Clacky Click", "cap-click": "Cap Click" };

function changeTheme(theme: string) {
  const body = document.querySelector("body");
  if (body) {
    // Remove all other color themes from body's class list
    body.classList.remove(...Object.keys(colorThemes).filter((t) => t !== theme));
    // Add the new theme class to body
    body.classList.add(theme);
    setSettings({ ...getSettings(), theme: theme })
  }
}

function changeClick(sound: string) {
  const body = document.querySelector("body");
  if (body) {
    body.classList.remove(...Object.keys(soundThemes).filter((t) => t !== sound));
    body.classList.add(sound);
    setSettings({ ...getSettings(), sound: sound })
  }
}


window.addEventListener("DOMContentLoaded", function () {
  const body: HTMLBodyElement | null = document.querySelector("body");

  //   --------------------------------  SAVED SETTINGS LOAD --------------------------------
  const currentSettings: TcsTyperSettings = getSettings();

  body?.classList.add(currentSettings.theme);
  body?.classList.add(currentSettings.sound);

  if (!document.querySelector("body#settings")) return

  //   --------------------------------  THEME BUTTONS --------------------------------
  const themeButtonsSection = document.getElementById("theme-buttons") as HTMLDivElement
  if (themeButtonsSection) {
    for (const [theme, themeName] of Object.entries(colorThemes)) {
      const themeButton = document.createElement("button") as HTMLButtonElement;
      themeButton.textContent = themeName
      themeButton.id = theme
      themeButtonsSection.appendChild(themeButton)
      themeButton?.addEventListener("click", function () {
        changeTheme(theme);
      });
    }
  }

  //   --------------------------------  SOUND BUTTONS --------------------------------
  const soundButtonsSection = document.getElementById("sound-buttons") as HTMLDivElement
  if (soundButtonsSection) {
    for (const [sound, soundName] of Object.entries(soundThemes)) {
      const soundButton = document.createElement("button") as HTMLButtonElement;
      soundButton.textContent = soundName
      soundButton.id = sound
      soundButtonsSection.appendChild(soundButton)
      soundButton?.addEventListener("click", function () {
        changeClick(sound);
        const audio = new Audio(`/assets/sounds/${sound}.wav`);
        audio.volume = 0.8;
        audio.play();
      });
    }
  }
});
