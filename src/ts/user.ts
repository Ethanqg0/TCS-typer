import { getUser, setUser, UserDetails } from "./common";
import { Chart } from "chart.js/auto";
import { BestTest } from "./leaderboard";

function validateForm(
  username: HTMLInputElement,
  password: HTMLInputElement,
  verifyPassword?: HTMLInputElement
): boolean {
  if (
    !username.value ||
    !password.value ||
    (verifyPassword && !verifyPassword.value)
  )
    return false;
  if (!username.value.startsWith("tcswc_")) {
    alert("Username must start with 'tcswc_', use your Scratch login!");
    return false;
  }

  if (verifyPassword && password.value !== verifyPassword.value) {
    alert("Passwords do not match!");
    return false;
  }
  return true;
}

function calculateAverageWpm(tests: Array<BestTest>): number {
  let totalWpm = 0;

  for (let i = 0; i < tests.length; i++) {
    totalWpm += tests[i].wpm;
  }

  return Math.round(totalWpm / tests.length);
}

function calculateAverageAccuracy(tests: Array<BestTest>): number {
  let totalAccuracy = 0;

  for (let i = 0; i < tests.length; i++) {
    totalAccuracy += tests[i].accuracy;
  }

  return Math.round(totalAccuracy / tests.length);
}

document.addEventListener("DOMContentLoaded", async function () {
  const username = getUser()?.username;

  //   --------------------------------  USERNAME DISPLAY --------------------------------
  const usernameDisplay = document.getElementById(
    "logged-username"
  ) as HTMLParagraphElement;
  usernameDisplay.textContent = username || "";

  //   --------------------------------  ACCOUNT PAGE SECTIONS --------------------------------
  const accountPage = document.querySelector("body#account") as HTMLElement;
  if (!accountPage) return;

  const loginSection = document.querySelector(".login-section") as HTMLElement;
  const userSection = document.querySelector(".user-section") as HTMLElement;


  if (loginSection && userSection) {
    if (!username || username === "" || username === "null") {
      loginSection.style.display = "flex";
      userSection.style.display = "none";
    } else {
      loginSection.style.display = "none";
      userSection.style.display = "flex";
    }
  }

  const localUserDetails: string | null = localStorage.getItem("userDetails");
  let userDetails: UserDetails | null = null;
  if (localUserDetails) {
    userDetails = JSON.parse(localUserDetails);
  }

  const usernamePageDisplay = document.getElementById(
    "user-username"
  ) as HTMLElement;
  usernamePageDisplay.style.fontSize = "3.0rem";
  usernamePageDisplay.style.fontWeight = "bold";
  if (usernamePageDisplay && userDetails && userDetails.full_name) {
    usernamePageDisplay.textContent = `Hi, ${userDetails.full_name} 👋`;
  }

  const userTestCount = document.getElementById(
    "user-test-count"
  ) as HTMLElement;
  if (userTestCount && userDetails && userDetails.tests) {
    const filteredTests = userDetails.tests.filter(
      (test: any) => test.wpm > 0
    );
    userTestCount.textContent = `Total tests completed: ${filteredTests.length}`;
  }

  const userAverageWpm = document.getElementById("user-wpm") as HTMLElement;
  if (userAverageWpm && userDetails && userDetails.tests) {
    userAverageWpm.textContent = `Average WPM: ${calculateAverageWpm(
      (userDetails.tests as Array<BestTest>).filter((test) => test.accuracy > 90)
    )}`;
  }

  const userAverageAccuracy = document.getElementById(
    "user-accuracy"
  ) as HTMLElement;
  if (userAverageAccuracy && userDetails && userDetails.tests) {
    userAverageAccuracy.textContent = `Average Accuracy: ${calculateAverageAccuracy(
      userDetails.tests as Array<BestTest>
    )}%`;
  }

  const userBest = document.getElementById("user-best") as HTMLElement;
  if (userBest && userDetails && userDetails.tests) {
    userBest.textContent = `Best WPM: ${Math.max(
      ...userDetails.tests
        .filter((test: any) => test.accuracy > 90)
        .map((test: any) => test.wpm)
    )}`;

    const ctx = (document.getElementById("user-graph") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
    const averageWpmData = Array(userDetails.tests.length).fill(
      calculateAverageWpm(
        userDetails.tests as Array<BestTest>
      )
    );

    const filteredTests = userDetails.tests.filter(
      (test: any) => test.wpm !== 0 && test.accuracy >= 90
    )

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(30,144,255,0.5)"); // Light dodgerblue
    gradient.addColorStop(1, "rgba(30,144,255,0)");  
    
new Chart(ctx, {
  type: "line",
  data: {
    labels: filteredTests.map((test: any, index: number) => index),
    datasets: [
      {
        label: "Tests",
        data: filteredTests.map((test: any) => test.wpm),
        borderColor: "dodgerblue",
        borderWidth: 2,
        backgroundColor: gradient,
        pointRadius: 3,
        fill: true,
      },
      {
        label: "Average WPM",
        data: averageWpmData,
        borderColor: "gray",
        borderWidth: 1,
        pointRadius: 0,
        borderDash: [5, 5],
        fill: false,
      },
    ],
  },
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Words Per Minute",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
      x: {
        display: true,
        title: {
          display: true,
          text: "Test Number",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (tooltipItem) {
            return `WPM: ${tooltipItem.raw}`;
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
  },
});
  }

  //   --------------------------------  LOGOUT BUTTON --------------------------------
  const logoutButton = document.getElementById(
    "logout-button"
  ) as HTMLButtonElement;

  logoutButton?.addEventListener("click", () => {
    setUser({ username: "" });
    window.location.reload();
  });

  //   --------------------------------  SIGNUP FORM --------------------------------
  const signupForm = document.querySelector("#signup-form") as HTMLFormElement;
  if (signupForm) {
    const signupUsername = document.getElementById(
      "username"
    ) as HTMLInputElement;
    const signupPassword = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const fullName = document.getElementById("full-name") as HTMLInputElement;

    const verifyPassword = document.getElementById(
      "verify-password"
    ) as HTMLInputElement;

    signupUsername.value = "tcswc_"
    let lastSignupUsername = signupUsername.value
    signupUsername.oninput = (e) => {
      if (!(e.target as HTMLInputElement)?.value.startsWith("tcswc_")) {
        console.log("edit", signupUsername.value)
        signupUsername.value = lastSignupUsername
        e.preventDefault();
        return false;
      } else {
        lastSignupUsername = signupUsername.value
      }
    }

    signupForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formResponse = validateForm(
        signupUsername,
        signupPassword,
        verifyPassword
      );

      if (formResponse === false) {
        return;
      }

      // Perform request to server here
      try {
        const response = await fetch(
          "https://tcs-typer.netlify.app/api/register",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            // credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: signupUsername.value,
              password: signupPassword.value,
              full_name: fullName.value,
              tests: [{ wpm: 0, accuracy: 0 }],
            }),
          }
        );

        if (response.ok) {
          setUser({ username: signupUsername.value });
          localStorage.setItem("justRegistered", "true")
          window.location.href = "/";
        } else {
          alert(
            "An error occurred while registering the user. Does this user already exist?"
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }

      return;
    });
  }

  //   --------------------------------  LOGIN FORM --------------------------------
  const loginForm = document.querySelector("#login-form") as HTMLFormElement;
  if (loginForm) {
    const loginUsername = document.querySelector(
      "#login-username"
    ) as HTMLInputElement;
    const loginPassword = document.querySelector(
      "#login-password"
    ) as HTMLInputElement;
    // console.log("Logging in with:", username.value, password.value);

    loginUsername.value = "tcswc_"
    let lastLoginUsername = loginUsername.value
    loginUsername.oninput = (e) => {
      if (!(e.target as HTMLInputElement)?.value.startsWith("tcswc_")) {
        console.log("edit", loginUsername.value)
        loginUsername.value = lastLoginUsername
        e.preventDefault();
        return false;
      } else {
        lastLoginUsername = loginUsername.value
      }
    }

    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const formResponse = validateForm(loginUsername, loginPassword);

      if (formResponse === false) {
        return;
      }

      try {
        const response = await fetch(
          "https://tcs-typer.netlify.app/api/login",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            // credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: loginUsername.value,
              password: loginPassword.value,
            }),
          }
        );

        if (response.ok) {
          setUser({ username: loginUsername.value });
          window.location.href = "/";
        } else {
          alert("An error occurred while logging in. Please try again.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  }
});