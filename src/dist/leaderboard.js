"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function rankByWPM(tests) {
    const test = tests.sort((a, b) => b["wpm"] - a["wpm"]);
    return test;
}
function filterBestTests(users) {
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
                    };
                }
            }
        }
        if (bestTest !== null) {
            filteredTests.push(bestTest);
        }
    }
    return filteredTests;
}
window.fetchAndDisplayLeaderboard = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Fetching and displaying leaderboard...");
    try {
        const response = yield fetch("https://tcs-typer.netlify.app/api/users");
        if (!response) {
            throw new Error("Failed to fetch tests from backend server.");
        }
        let tests = yield response.json();
        console.log("TESTS:", tests);
        tests = filterBestTests(tests);
        tests = rankByWPM(tests);
        const leaderboard = document.querySelector(".flex-column");
        leaderboard.innerHTML = "";
        for (let i = 0; i < tests.length; i++) {
            let player = leaderboard.appendChild(document.createElement("div"));
            player.classList.add("leaderboard-player");
            let name = player.appendChild(document.createElement("h3"));
            name.innerHTML = tests[i]["full_name"];
            if (i === 0) {
                name.innerHTML += " 🥇";
                name.style.fontWeight = "600";
            }
            else if (i === 1) {
                name.innerHTML += " 🥈";
            }
            else if (i === 2) {
                name.innerHTML += " 🥉";
            }
            let div = player.appendChild(document.createElement("div"));
            div.classList.add("wpm-accuracy");
            let wpm = div.appendChild(document.createElement("h4"));
            wpm.innerHTML = tests[i]["wpm"];
            let accuracy = div.appendChild(document.createElement("h4"));
            accuracy.innerHTML = tests[i]["accuracy"] + "%";
        }
    }
    catch (error) {
        console.error(error);
    }
});
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    // When the page is loaded, fetch and display the leaderboard
    if (window.fetchAndDisplayLeaderboard) {
        window.fetchAndDisplayLeaderboard();
    }
    const leaderboardModal = document.getElementById("leaderboard-modal");
    const openModal = document.getElementById("leaderboard-toggle");
    const closeModal = document.getElementById("close-modal");
    openModal === null || openModal === void 0 ? void 0 : openModal.addEventListener("click", () => {
        leaderboardModal.showModal();
    });
    leaderboardModal === null || leaderboardModal === void 0 ? void 0 : leaderboardModal.addEventListener("click", (e) => {
        if (e.target !== leaderboardModal)
            return;
        leaderboardModal.close();
    });
    closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener("click", () => {
        leaderboardModal.close();
    });
}));
