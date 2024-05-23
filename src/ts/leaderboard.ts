const names: { [key: string]: string } = {
  "1": "Ethan Gutierrez",
  "2": "Keaton Freed",
};

function rankByWPM(tests: Array<any>) {
    return tests.sort((a, b) => b.wpm - a.wpm);
}

// keeps the test with the largest "wpm" data, then removes all other tests with the same user_id
function removeDuplicates(tests: Array<any>) {
    // TODO
}

window.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("http://localhost:3000/tests");
    if (!response) {
      throw new Error("Failed to fetch tests from backend server.");
    }
    let tests = await response.json();
    console.log("TESTS BEFORE:", tests);
    tests = rankByWPM(tests);
    console.log("TESTS AFTER:", tests);
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

      name.innerHTML = names[test["user_id"]];

      let div = player.appendChild(
        document.createElement("div") as HTMLDivElement
      );
      div.classList.add("wpm-accuracy");
      let wpm = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      wpm.innerHTML = test["wpm"];
      let accuracy = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      accuracy.innerHTML = test["accuracy"] + "%";
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
