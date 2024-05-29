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
  const standardClick = document.querySelector("#standard-click") as HTMLElement;
  const mechanicalClick = document.querySelector("#mechanical-click") as HTMLElement;
  const popClick = document.querySelector("#pop-click") as HTMLElement;
  const clackyClick = document.querySelector("#clacky-click") as HTMLElement;
  const capClick = document.querySelector("#cap-click") as HTMLElement;

  standardClick.addEventListener("click", function () {
    changeClick("standard-click");
    let audio = new Audio("/assets/sounds/standard-click.wav");
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
  const body: HTMLElement | null = document.querySelector("body");
  let currentTheme: string | null = localStorage.getItem("theme");
  let currentSound: string | null = localStorage.getItem("sound");

  if (currentSound === "standard-click") {
    body?.classList.add("standard-click");
  } else if (currentSound === "mechanical-click") {
    body?.classList.add("mechanical-click");
  } else if (currentSound === "pop-click") {
    body?.classList.add("pop-click");
  } else if (currentSound === "clacky-click") {
    body?.classList.add("clacky-click");
  } else if (currentSound === "cap-click") {
    body?.classList.add("cap-click");
  } else {
    localStorage.setItem("sound", "standard-click");
    body?.classList.add("standard-click");
  }

  if (currentTheme === "matrix-theme") {
    body?.classList.add("matrix-theme");
  } else if (currentTheme === "pink-theme") {
    body?.classList.add("pink-theme");
  } else if (currentTheme === "discord-theme") {
    body?.classList.add("discord-theme");
  } else if (currentTheme === "blueberry-theme") {
    body?.classList.add("blueberry-theme");
  } else if (currentTheme === "dark-theme") {
    body?.classList.add("dark-theme");
  } else if (currentTheme === "lavendar-theme") {
    body?.classList.add("lavendar-theme");
  } else if (currentTheme === "forest-theme") {
    body?.classList.add("forest-theme");
  } else if (currentTheme === "cartoon-theme") {
    body?.classList.add("cartoon-theme");
  } else {
    // If currentTheme is "default-theme" or null/undefined, set to "default-theme"
    localStorage.setItem("theme", "default-theme");
    body?.classList.add("default-theme");
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const defaultTheme = document.querySelector("#default-theme") as HTMLElement;
  const darkTheme = document.querySelector("#dark-theme") as HTMLElement;
  const lavendarTheme = document.querySelector("#lavendar-theme") as HTMLElement;
  const forestTheme = document.querySelector("#forest-theme") as HTMLElement;
  const matrixTheme = document.querySelector("#matrix-theme") as HTMLElement;
  const pinkTheme = document.querySelector("#pink-theme") as HTMLElement;
  const discordTheme = document.querySelector("#discord-theme") as HTMLElement;
  const blueberryTheme = document.querySelector("#blueberry-theme") as HTMLElement;
  const cartoonTheme = document.querySelector("#cartoon-theme") as HTMLElement;

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
