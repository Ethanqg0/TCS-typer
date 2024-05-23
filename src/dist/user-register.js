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
document.addEventListener("DOMContentLoaded", function () {
    form = document.querySelector(".register form") || null;
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const verifyPassword = document.getElementById("verify-password");
    if (form) {
        form.addEventListener("submit", function (event) {
            return __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                // Perform request to server here
                const response = yield fetch("http://localhost:3000/register", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "username": username.value,
                        "password": password.value
                    })
                });
                alert("User registered successfully!");
                const data = yield response.json();
                if (data.error) {
                    alert(data.error);
                    return;
                }
                alert("User registered successfully!");
            });
        });
    }
});
