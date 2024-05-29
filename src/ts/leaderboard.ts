interface User {
  full_name: string;
  tests: Array<FilteredTest>;
}

interface FilteredTest {
  wpm: number;
  accuracy: number;
}

function rankByWPM(tests: Array<FilteredTest>) {
  const test = tests.sort((a, b) => b["wpm"] - a["wpm"]);
  return test;
}

function filterBestTests(users: Array<User>) {
  let filteredTests = [];

  for (const user of users) {
    let bestTest = null;
    const tests = user["tests"];
    for (const test of tests) {
      if (test["accuracy"] >= 90 && !(test["wpm"] >= 200) && !(test["accuracy"] > 100)) {
        if (bestTest === null || test["wpm"] > bestTest["wpm"]) {
          bestTest = {
            full_name: user["full_name"],
            wpm: test["wpm"],
            accuracy: test["accuracy"],
          }
        }
      }
    }
    if (bestTest !== null) {
      filteredTests.push(bestTest);
    }
  }

  return filteredTests;
}

(<any>window).fetchAndDisplayLeaderboard = async () => {
  console.log("Fetching and displaying leaderboard...")
  try {
    const response = await fetch(
      "https://tcs-typer.netlify.app/api/users"
    );
    if (!response) {
      throw new Error("Failed to fetch tests from backend server.");
    }

    let tests = await response.json();

    tests = filterBestTests(tests);
    tests = rankByWPM(tests);

    const leaderboard = document.querySelector(
      ".flex-column"
    ) as HTMLDivElement;
    leaderboard.innerHTML = ""
    for (let i: number = 0; i < tests.length; i++) {
      let player = leaderboard.appendChild(
        document.createElement("div") as HTMLDivElement
      );
      player.classList.add("leaderboard-player");

      let name = player.appendChild(
        document.createElement("h3") as HTMLHeadingElement
      );

      name.innerHTML = tests[i]["full_name"];
      if (i === 0) {
        name.innerHTML += " 🥇";
        name.style.fontWeight = "600";
      } else if (i === 1) {
        name.innerHTML += " 🥈";
      } else if (i === 2) {
        name.innerHTML += " 🥉";
      }

      let div = player.appendChild(
        document.createElement("div") as HTMLDivElement
      );
      div.classList.add("wpm-accuracy");
      let wpm = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      wpm.innerHTML = tests[i]["wpm"];
      let accuracy = div.appendChild(
        document.createElement("h4") as HTMLParagraphElement
      );
      accuracy.innerHTML = tests[i]["accuracy"] + "%";
    }
  } catch (error) {
    console.error("An error occurred while fetching the leaderboard: ", error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  // When the page is loaded, fetch and display the leaderboard
  if ((<any>window).fetchAndDisplayLeaderboard) {
    (<any>window).fetchAndDisplayLeaderboard();
  }

  const leaderboardModal = document.getElementById(
    "leaderboard-modal"
  ) as HTMLDialogElement;
  const openModal = document.getElementById("leaderboard-toggle");
  const closeModal = document.getElementById("close-modal");

  openModal?.addEventListener("click", () => {
    leaderboardModal.showModal();
  });
  leaderboardModal?.addEventListener("click", (e) => {
    if (e.target !== leaderboardModal) return
    leaderboardModal.close()
  })
  closeModal?.addEventListener("click", () => {
    leaderboardModal.close();
  });
});