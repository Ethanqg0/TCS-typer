"use strict";
// Theme Event Listeners
window.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const defaultTheme = document.querySelector("#default-theme");
    const matrixTheme = document.querySelector("#matrix-theme");
    const pinkTheme = document.querySelector("#pink-theme");
    defaultTheme.addEventListener("click", function () {
        body === null || body === void 0 ? void 0 : body.classList.remove("matrix-theme");
        body === null || body === void 0 ? void 0 : body.classList.remove("pink-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("default-theme");
    });
    pinkTheme.addEventListener("click", function () {
        body === null || body === void 0 ? void 0 : body.classList.remove("default-theme");
        body === null || body === void 0 ? void 0 : body.classList.remove("matrix-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("pink-theme");
    });
    matrixTheme.addEventListener("click", function () {
        body === null || body === void 0 ? void 0 : body.classList.remove("default-theme");
        body === null || body === void 0 ? void 0 : body.classList.remove("pink-theme");
        body === null || body === void 0 ? void 0 : body.classList.add("matrix-theme");
    });
});
