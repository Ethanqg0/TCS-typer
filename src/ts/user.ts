let form: HTMLFormElement | null = null;

function validateForm(
  username: HTMLInputElement,
  password: HTMLInputElement,
  verifyPassword: HTMLInputElement
): boolean {
  if (!username.value.includes("tcswc")) {
    alert("Username must contain 'tcswc', use your Scratch login!");
    return false;
  }

  if (password.value !== verifyPassword.value) {
    alert("Passwords do not match!");
    return false;
  }
  return true;
}

function calculateAverageWpm(tests: Array<any>): number {
  let totalWpm = 0;

  for (let i = 0; i < tests.length; i++) {
    totalWpm += tests[i].wpm;
  }

  return Math.round(totalWpm / tests.length);
}

function calculateAverageAccuracy(tests: Array<any>): number {
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
  const loginSection = document.querySelector(".login-section") as HTMLElement;
  const userSection = document.querySelector(".user-section") as HTMLElement;

  console.log(userSection);

  if (!username || username === "" || username === "null") {
    loginSection.style.display = "flex";
    userSection.style.display = "none";
  } else {
    loginSection.style.display = "none";
    userSection.style.display = "flex";
  }

  let userDetails;
  if (username) {
    userDetails = await fetchUserDetails();
  }

  const usernamePageDisplay = document.getElementById("user-username") as HTMLElement;
  if (usernamePageDisplay && userDetails && userDetails.full_name) {
    usernamePageDisplay.textContent = `Hi, ${userDetails.full_name}👋`;
  }

  const userTestCount = document.getElementById("user-test-count") as HTMLElement;
  if (userTestCount && userDetails && userDetails.tests) {
    userTestCount.textContent = `Total tests completed: ${userDetails.tests.length}`;
  }

  const userAverageWpm = document.getElementById("user-wpm") as HTMLElement;
  if (userAverageWpm && userDetails && userDetails.tests) {
    userAverageWpm.textContent = `Average WPM: ${calculateAverageWpm(userDetails.tests)}`;
  }

  const userAverageAccuracy = document.getElementById("user-accuracy") as HTMLElement;
  if (userAverageAccuracy && userDetails && userDetails.tests) {
    userAverageAccuracy.textContent = `Average Accuracy: ${calculateAverageAccuracy(userDetails.tests)}%`;
  }


  //   --------------------------------  LOGOUT BUTTON --------------------------------
  const logoutButton = document.getElementById(
    "logout-button"
  ) as HTMLButtonElement;

  logoutButton?.addEventListener("click", () => {
    setUser({ username: "" })
    window.location.reload();
  });

  //   --------------------------------  SIGNUP FORM --------------------------------
  let signupForm = document.querySelector("#signup-form") as HTMLFormElement;
  if (signupForm) {
    const signupUsername = document.getElementById("username") as HTMLInputElement;
    const signupPassword = document.getElementById("password") as HTMLInputElement;
    const fullName = document.getElementById("full-name") as HTMLInputElement;

    const verifyPassword = document.getElementById(
      "verify-password"
    ) as HTMLInputElement;

    if (signupForm) {
      signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formResponse = validateForm(signupUsername, signupPassword, verifyPassword);

        console.log(formResponse);

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
              credentials: "same-origin",
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
  }

  //   --------------------------------  LOGIN FORM --------------------------------
  const loginForm = document.querySelector("#login-form") as HTMLFormElement;
  if (loginForm) {
    const username = document.querySelector(
      "#login-username"
    ) as HTMLInputElement;
    const password = document.querySelector(
      "#login-password"
    ) as HTMLInputElement;
    console.log("Logging in with:", username.value, password.value);

    if (!loginForm) {
      return;
    }

    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      try {
        const response = await fetch(
          "https://tcs-typer.netlify.app/api/login",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username.value,
              password: password.value,
            }),
          }
        );

        if (response.ok) {
          setUser({ username: username.value });
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
