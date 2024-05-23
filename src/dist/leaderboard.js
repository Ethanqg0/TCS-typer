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
const names = {
    "1": "Ethan Gutierrez",
    "2": "Keaton Freed",
    "7": "Jack Bacon"
};
function rankByWPM(tests) {
    return tests.sort((a, b) => b.wpm - a.wpm);
}
// keeps the test with the largest "wpm" data, then removes all other tests with the same user_id
function removeDuplicates(tests) {
    // TODO
}
window.addEventListener("DOMContentLoaded", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/tests");
            if (!response) {
                throw new Error("Failed to fetch tests from backend server.");
            }
            let tests = yield response.json();
            console.log("TESTS BEFORE:", tests);
            tests = rankByWPM(tests);
            console.log("TESTS AFTER:", tests);
            for (const test of tests) {
                const leaderboard = document.querySelector(".flex-column");
                let player = leaderboard.appendChild(document.createElement("div"));
                player.classList.add("leaderboard-player");
                let name = player.appendChild(document.createElement("h3"));
                name.innerHTML = names[test["user_id"]];
                let div = player.appendChild(document.createElement("div"));
                div.classList.add("wpm-accuracy");
                let wpm = div.appendChild(document.createElement("h4"));
                wpm.innerHTML = test["wpm"];
                let accuracy = div.appendChild(document.createElement("h4"));
                accuracy.innerHTML = test["accuracy"] + "%";
            }
        }
        catch (error) {
            console.error(error);
        }
    });
});
window.addEventListener("DOMContentLoaded", () => {
    const leaderboardModal = document.getElementById("leaderboard-modal");
    const openModal = document.getElementById("leaderboard-toggle");
    const closeModal = document.getElementById("close-modal");
    openModal === null || openModal === void 0 ? void 0 : openModal.addEventListener("click", () => {
        leaderboardModal.showModal();
    });
    closeModal === null || closeModal === void 0 ? void 0 : closeModal.addEventListener("click", () => {
        leaderboardModal.close();
    });
});
