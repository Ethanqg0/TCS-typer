"use strict";
let colorThemes = ["default-theme", "dark-theme", "lavendar-theme", "forest-theme", "matrix-theme", "pink-theme", "discord-theme", "blueberry-theme", "cartoon-theme"];
let soundThemes = ["standard-click", "mechanical-click", "pop-click", "clacky-click", "cap-click"];
function changeTheme(theme) {
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
function changeClick(sound) {
    const body = document.querySelector("body");
    if (body) {
        body.classList.remove(...soundThemes.filter((t) => t !== sound));
        body.classList.add(sound);
        localStorage.setItem("sound", sound);
    }
}
window.addEventListener("DOMContentLoaded", function () {
    for (let sound of soundThemes) {
        const soundButton = document.querySelector("#" + sound);
        soundButton === null || soundButton === void 0 ? void 0 : soundButton.addEventListener("click", function () {
            changeClick(sound);
        });
    }
});
window.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    let currentSound = localStorage.getItem("sound");
    let currentTheme = localStorage.getItem("theme");
    if (!currentSound) {
        localStorage.setItem("sound", "standard-click");
        currentSound = "standard-click";
    }
    body === null || body === void 0 ? void 0 : body.classList.add(currentSound || "");
    if (!currentTheme) {
        localStorage.setItem("theme", "default-theme");
        currentTheme = "default-theme";
    }
    body === null || body === void 0 ? void 0 : body.classList.add(currentTheme || "");
});
window.addEventListener("DOMContentLoaded", function () {
    for (let theme of colorThemes) {
        const themeButton = document.querySelector("#" + theme);
        themeButton === null || themeButton === void 0 ? void 0 : themeButton.addEventListener("click", function () {
            changeTheme(theme);
        });
    }
});
