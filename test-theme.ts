function changeTheme(theme: string) {
  const body = document.querySelector("body");
  if (body) {
    body.className = ""; // remove all other themes
  }
  body?.classList.add(theme);
  localStorage.setItem("theme", theme);
}

window.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  let currentTheme = localStorage.getItem("theme");

  if (currentTheme === "matrix-theme") {
    body?.classList.add("matrix-theme");
  } else if (currentTheme === "pink-theme") {
    body?.classList.add("pink-theme");
  } else {
    // If currentTheme is "default-theme" or null/undefined, set to "default-theme"
    localStorage.setItem("theme", "default-theme");
    body?.classList.add("default-theme");
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const defaultTheme = document.querySelector("#default-theme") as HTMLElement;
  const matrixTheme = document.querySelector("#matrix-theme") as HTMLElement;
  const pinkTheme = document.querySelector("#pink-theme") as HTMLElement;

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
