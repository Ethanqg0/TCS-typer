function changeTheme(theme: string) {
  const body = document.querySelector("body");
  if (body) {
    body.className = ""; // remove all other themes
  }
  body?.classList.add(theme);
  localStorage.setItem("theme", theme);
}

window.addEventListener("DOMContentLoaded", function () {
  const body: HTMLElement | null = document.querySelector("body");
  let currentTheme: string | null = localStorage.getItem("theme");

  if (currentTheme === "matrix-theme") {
    body?.classList.add("matrix-theme");
  } else if (currentTheme === "pink-theme") {
    body?.classList.add("pink-theme");
  } else if (currentTheme === "discord-theme") {
    body?.classList.add("discord-theme");
  } else if (currentTheme === "blueberry-theme") {
    body?.classList.add("blueberry-theme");
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
  const discordTheme = document.querySelector("#discord-theme") as HTMLElement;
  const blueberryTheme = document.querySelector("#blueberry-theme") as HTMLElement;

  defaultTheme.addEventListener("click", function () {
    changeTheme("default-theme");
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
