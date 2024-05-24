// TODO: rank by wpm, get the greatest wpm for each user, filter out tests lower than 90%

function rankByWPM(tests: Array<any>) {
   
}

window.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response) {
      throw new Error("Failed to fetch tests from backend server.");
    }
    
    let tests = await response.json();

    for (const test of tests) {
      const leaderboard = document.querySelector(
        ".flex-column"
      ) as HTMLDivElement;
      let player = leaderboard.appendChild(
        document.createElement("div") as HTMLDivElement
      );
      player.classList.add("leaderboard-player");

      let name = player.appendChild(
        document.createElement("h3") as HTMLHeadingElement
      );

      name.innerHTML = test["full_name"];

      let div = player.appendChild(
        document.createElement("div") as HTMLDivElement
      );
      div.classList.add("wpm-accuracy");
      let wpm = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      wpm.innerHTML = test["tests"][0]["wpm"];
      let accuracy = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      accuracy.innerHTML = test["tests"][0]["accuracy"] + "%";
    }
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener("testFinished", async function () {


  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response) {
      throw new Error("Failed to fetch tests from backend server.");
    }

    let tests = await response.json();

    for (const test of tests) {
      const leaderboard = document.querySelector(
        ".flex-column"
      ) as HTMLDivElement;
      let player = leaderboard.appendChild(
        document.createElement("div") as HTMLDivElement
      );
      player.classList.add("leaderboard-player");

      let name = player.appendChild(
        document.createElement("h3") as HTMLHeadingElement
      );

      name.innerHTML = test["full_name"];

      let div = player.appendChild(
        document.createElement("div") as HTMLDivElement
      );
      div.classList.add("wpm-accuracy");
      let wpm = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      wpm.innerHTML = test["tests"][0]["wpm"];
      let accuracy = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      accuracy.innerHTML = test["tests"][0]["accuracy"] + "%";
    }
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const leaderboardModal = document.getElementById(
    "leaderboard-modal"
  ) as HTMLDialogElement;
  const openModal = document.getElementById("leaderboard-toggle");
  const closeModal = document.getElementById("close-modal");

  openModal?.addEventListener("click", () => {
    leaderboardModal.showModal();
  });

  closeModal?.addEventListener("click", () => {
    leaderboardModal.close();
  });
});
