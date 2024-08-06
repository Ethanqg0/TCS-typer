interface User {
  full_name: string;
  coach?: boolean;
  best_test: TestRecord;
}

interface TestRecord {
  wpm: number;
  accuracy: number;
}

export interface BestTest {
  full_name?: string;
  wpm: number;
  accuracy: number;
  isCoach: boolean;
}

function rankByWPM(tests: Array<BestTest>) {
  return tests.sort((a, b) => b.wpm - a.wpm);
}

function filterTests(users: Array<User>) {
  const filteredTests: Array<BestTest> = [];

  for (const user of users) {
    const test: TestRecord = user.best_test;
    if (!test) continue;
    filteredTests.push({
      full_name: user.full_name,
      wpm: test.wpm,
      accuracy: test.accuracy,
      isCoach: user.coach ?? false,
    });
  }

  return filteredTests;
}

// Make coach, student, and all leaderboards that can be toggled
(window as any).fetchAndDisplayLeaderboard = async () => {
  try {
    const response = await fetch(
      "https://tcs-typer.netlify.app/api/leaderboard"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tests from backend server.");
    }

    let tests = await response.json();
    tests = filterTests(tests);

    const studentTests = rankByWPM(tests.filter((test) => !test.isCoach));
    const coachTests = rankByWPM(tests.filter((test) => test.isCoach));
    const allTests = rankByWPM(tests);

    const leaderboard = document.querySelector(
      ".flex-column"
    ) as HTMLDivElement;
    const studentsLeaderboard = document.getElementById(
      "leaderboard-toggle-students"
    ) as HTMLButtonElement;
    const coachesLeaderboard = document.getElementById(
      "leaderboard-toggle-coaches"
    ) as HTMLButtonElement;
    const allLeaderboard = document.getElementById(
      "leaderboard-toggle-all"
    ) as HTMLButtonElement;

    function displayLeaderboard(tests: Array<BestTest>) {
      leaderboard.innerHTML = "";

      for (let i = 0; i < tests.length; i++) {
        const player = leaderboard.appendChild(document.createElement("div"));
        player.classList.add("leaderboard-player");

        const name = player.appendChild(document.createElement("h3"));
        name.innerHTML = tests[i].full_name ?? "";
        if (i === 0) {
          name.innerHTML += " 🥇";
          name.style.fontWeight = "600";
        } else if (i === 1) {
          name.innerHTML += " 🥈";
        } else if (i === 2) {
          name.innerHTML += " 🥉";
        }

        const div = player.appendChild(document.createElement("div"));
        div.classList.add("wpm-accuracy");

        const wpm = div.appendChild(document.createElement("h4"));
        wpm.innerHTML = `${tests[i].wpm}`;

        const accuracy = div.appendChild(document.createElement("h4"));
        accuracy.innerHTML = `${tests[i].accuracy}%`;
      }
    }

    studentsLeaderboard.addEventListener("click", () =>
      displayLeaderboard(studentTests)
    );
    coachesLeaderboard.addEventListener("click", () =>
      displayLeaderboard(coachTests)
    );
    allLeaderboard.addEventListener("click", () =>
      displayLeaderboard(allTests)
    );

    // Display the all leaderboard by default
    displayLeaderboard(studentTests);
  } catch (error) {
    console.error("An error occurred while fetching the leaderboard: ", error);
  }
};

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
    if (e.target !== leaderboardModal) return;
    leaderboardModal.close();
  });
  closeModal?.addEventListener("click", () => {
    leaderboardModal.close();
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  const closeToastSuccess = document.querySelector(
    "#close-toast-success"
  ) as HTMLElement;
  closeToastSuccess.addEventListener("click", () => {
    const toast_success = document.querySelector(
      ".toast-success"
    ) as HTMLElement;
    toast_success.classList.remove("show");
    toast_success.classList.add("hide");
    setTimeout(() => {
      toast_success.classList.remove("hide");
    }, 250);
  });

  const closeToastWarning = document.querySelector(
    "#close-toast-warning"
  ) as HTMLElement;
  closeToastWarning.addEventListener("click", () => {
    const toast_success = document.querySelector(
      ".toast-warning"
    ) as HTMLElement;
    toast_success.classList.remove("show");
    toast_success.classList.add("hide");
    setTimeout(() => {
      toast_success.classList.remove("hide");
    }, 250);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const justRegistered = localStorage.getItem("justRegistered");
  const introductionModal = document.querySelector(
    "#introduction-modal"
  ) as HTMLDialogElement;
  const closeModal = document.querySelector(
    "#close-modal-introduction"
  ) as HTMLButtonElement;
  const startTyping = document.querySelector(
    "#start-typing"
  ) as HTMLButtonElement;

  if (justRegistered) {
    introductionModal.showModal();
    localStorage.removeItem("justRegistered");
  }

  closeModal.addEventListener("click", () => {
    introductionModal.close();
  });

  startTyping.addEventListener("click", () => {
    introductionModal.close();
  });
});