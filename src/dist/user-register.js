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
let form = null;
function validateForm(form) {
    //TODO
    return true;
}
document.addEventListener("DOMContentLoaded", function () {
    form = document.querySelector("#signup-form") || null;
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const fullName = document.getElementById("full-name");
    const verifyPassword = document.getElementById("verify-password");
    const formResponse = validateForm(form);
    if (form) {
        form.addEventListener("submit", function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                // Add register validation here
                // Perform request to server here
                try {
                    const response = yield fetch("http://localhost:3000/register", {
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
                            full_name: fullName.value,
                        }),
                    });
                    if (response.ok) {
                        localStorage.setItem("username", username.value);
                        alert("User registered successfully!");
                        window.location.href = "/src/index.html";
                    }
                    else {
                        alert("An error occurred while registering the user. Does this user already exist?");
                    }
                }
                catch (error) {
                    console.error("An error occurred:", error);
                }
                return;
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('#login-form');
    const username = document.querySelector("#login-username");
    const password = document.querySelector("#login-password");
    if (!form) {
        return;
    }
    form.addEventListener('submit', function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                const response = yield fetch('http://localhost:3000/login', {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value,
                    })
                });
                if (response.ok) {
                    localStorage.setItem("username", username.value);
                    alert('User logged in successfully!');
                    window.location.href = '/src/index.html';
                }
                else {
                    alert('An error occurred while logging in. Please try again.');
                }
            }
            catch (error) {
                console.error('An error occurred:', error);
            }
        });
    });
});
