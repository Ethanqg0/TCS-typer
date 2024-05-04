"use strict";
function changeTheme(theme) {
    const body = document.querySelector("body");
    if (body) {
        body.className = ""; // remove all other themes
    }
    body === null || body === void 0 ? void 0 : body.classList.add(theme);
    localStorage.setItem("theme", theme);
}
window.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    let currentTheme = localStorage.getItem("theme");
    if (currentTheme === "matrix-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("matrix-theme");
    }
    else if (currentTheme === "pink-theme") {
        body === null || body === void 0 ? void 0 : body.classList.add("pink-theme");
    }
    else {
        // If currentTheme is "default-theme" or null/undefined, set to "default-theme"
        localStorage.setItem("theme", "default-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("default-theme");
    }
});
window.addEventListener("DOMContentLoaded", function () {
    const defaultTheme = document.querySelector("#default-theme");
    const matrixTheme = document.querySelector("#matrix-theme");
    const pinkTheme = document.querySelector("#pink-theme");
    defaultTheme.addEventListener("click", function () {
        changeTheme("default-theme");
    });
    pinkTheme.addEventListener("click", function () {
        changeTheme("pink-theme");
    });
    matrixTheme.addEventListener("click", function () {
        changeTheme("matrix-theme");
    });
});
