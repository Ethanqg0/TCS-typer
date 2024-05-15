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