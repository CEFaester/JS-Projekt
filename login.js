// Lavet ved hjælp af ChatGPT

// ==============================
// ARRAY + OBJEKTER
// ==============================

let users = [
    { username: "admin", password: "1234" },
    { username: "justine", password: "kodeord" },
    { username: "catemil", password: "abcd" }
];

// ==============================
// DOM
// ==============================

let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");
let guestBtn = document.getElementById("guestBtn");
let message = document.getElementById("message");

// ==============================
// LOGIN FUNKTION
// ==============================

function login() {

    let username = usernameInput.value;
    let password = passwordInput.value;
    let isLoggedIn = false;

    for (let i = 0; i < users.length; i++) {

        if (users[i].username === username && users[i].password === password) {

            isLoggedIn = true;

            // Gem bruger i localStorage
            localStorage.setItem("currentUser", JSON.stringify(users[i]));

            // Redirect
            window.location.href = "game.html";

            break;
        }
    }

    if (!isLoggedIn) {
        message.innerText = "Forkert brugernavn eller adgangskode!";
    }
};

// ==============================
// GÆST LOGIN
// ==============================

function playAsGuest() {

    let guestUser = {
        username: "Gæst",
        isGuest: true
    };

    localStorage.setItem("currentUser", JSON.stringify(guestUser));

    window.location.href = "game.html";
};

// ==============================
// EVENTS
// ==============================

loginBtn.addEventListener("click", login);
guestBtn.addEventListener("click", playAsGuest);