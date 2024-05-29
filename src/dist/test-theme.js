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
    const standardClick = document.querySelector("#standard-click");
    const mechanicalClick = document.querySelector("#mechanical-click");
    const popClick = document.querySelector("#pop-click");
    const clackyClick = document.querySelector("#clacky-click");
    const capClick = document.querySelector("#cap-click");
    standardClick.addEventListener("click", function () {
        changeClick("standard-click");
        let audio = new Audio("src/assets/sounds/standard-click.wav");
        audio.play();
    });
    mechanicalClick.addEventListener("click", function () {
        changeClick("mechanical-click");
        let audio = new Audio("/assets/sounds/typewriter.wav");
        audio.volume = 0.8;
        audio.play();
    });
    popClick.addEventListener("click", function () {
        changeClick("pop-click");
        let audio = new Audio("/assets/sounds/pop.mp3");
        audio.volume = 0.8;
        audio.play();
    });
    clackyClick.addEventListener("click", function () {
        changeClick("clacky-click");
        let audio = new Audio("/assets/sounds/clacky.mp3");
        audio.volume = 0.8;
        audio.play();
    });
    capClick.addEventListener("click", function () {
        changeClick("cap-click");
        let audio = new Audio("/assets/sounds/popcapoff.wav");
        audio.volume = 0.8;
        audio.play();
    });
});
window.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    let currentTheme = localStorage.getItem("theme");
    let currentSound = localStorage.getItem("sound");
    if (currentSound === "standard-click") {
        body === null || body === void 0 ? void 0 : body.classList.add("standard-click");
    }
    else if (currentSound === "mechanical-click") {
        body === null || body === void 0 ? void 0 : body.classList.add("mechanical-click");
    }
    else if (currentSound === "pop-click") {
        body === null || body === void 0 ? void 0 : body.classList.add("pop-click");
    }
    else if (currentSound === "clacky-click") {
        body === null || body === void 0 ? void 0 : body.classList.add("clacky-click");
    }
    else if (currentSound === "cap-click") {
        body === null || body === void 0 ? void 0 : body.classList.add("cap-click");
    }
    else {
        localStorage.setItem("sound", "standard-click");
        body === null || body === void 0 ? void 0 : body.classList.add("standard-click");
    }
    if (currentTheme === "matrix-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("matrix-theme");
    }
    else if (currentTheme === "pink-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("pink-theme");
    }
    else if (currentTheme === "discord-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("discord-theme");
    }
    else if (currentTheme === "blueberry-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("blueberry-theme");
    }
    else if (currentTheme === "dark-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("dark-theme");
    }
    else if (currentTheme === "lavendar-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("lavendar-theme");
    }
    else if (currentTheme === "forest-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("forest-theme");
    }
    else if (currentTheme === "cartoon-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("cartoon-theme");
    }
    else {
        // If currentTheme is "default-theme" or null/undefined, set to "default-theme"
        localStorage.setItem("theme", "default-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("default-theme");
    }
});
window.addEventListener("DOMContentLoaded", function () {
    const defaultTheme = document.querySelector("#default-theme");
    const darkTheme = document.querySelector("#dark-theme");
    const lavendarTheme = document.querySelector("#lavendar-theme");
    const forestTheme = document.querySelector("#forest-theme");
    const matrixTheme = document.querySelector("#matrix-theme");
    const pinkTheme = document.querySelector("#pink-theme");
    const discordTheme = document.querySelector("#discord-theme");
    const blueberryTheme = document.querySelector("#blueberry-theme");
    const cartoonTheme = document.querySelector("#cartoon-theme");
    defaultTheme.addEventListener("click", function () {
        changeTheme("default-theme");
    });
    darkTheme.addEventListener("click", function () {
        changeTheme("dark-theme");
    });
    lavendarTheme.addEventListener("click", function () {
        changeTheme("lavendar-theme");
    });
    forestTheme.addEventListener("click", function () {
        changeTheme("forest-theme");
    });
    cartoonTheme.addEventListener("click", function () {
        changeTheme("cartoon-theme");
    });
    pinkTheme.addEventListener("click", function () {
        changeTheme("pink-theme");
    });
    matrixTheme.addEventListener("click", function () {
        changeTheme("matrix-theme");
    });
    discordTheme.addEventListener("click", function () {
        changeTheme("discord-theme");
    });
    blueberryTheme.addEventListener("click", function () {
        changeTheme("blueberry-theme");
    });
});
