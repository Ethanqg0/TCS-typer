// Theme Event Listeners
window.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const defaultTheme = document.querySelector("#default-theme") as HTMLElement;
  const matrixTheme = document.querySelector("#matrix-theme") as HTMLElement;
  const pinkTheme = document.querySelector("#pink-theme") as HTMLElement;

  defaultTheme.addEventListener("click", function () {
    body?.classList.remove("matrix-theme");
    body?.classList.remove("pink-theme");
    body?.classList.add("default-theme");
  });

  pinkTheme.addEventListener("click", function () {
    body?.classList.remove("default-theme");
    body?.classList.remove("matrix-theme");
    body?.classList.add("pink-theme");
  });

  matrixTheme.addEventListener("click", function () {
    body?.classList.remove("default-theme");
    body?.classList.remove("pink-theme");
    body?.classList.add("matrix-theme");
  });
});
