"use strict";
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
