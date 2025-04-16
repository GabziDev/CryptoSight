import { pushNotification } from './notifications.js';

(async function () {
    const [login, register] = await Promise.all([
        fetch("/components/login.html").then(res => res.text()),
        fetch("/components/register.html").then(res => res.text())
    ]);

    modals.innerHTML = `
        ${login}
        ${register}
    `;

    document.querySelectorAll("#modals > div").forEach(modal => {
        modal.style.display = "none";
    });

    registerModalBoxEvent();
    loginModalBoxEvent();
})();

const modals = document.getElementById("modals");
const modalboxs = document.querySelectorAll("#modals > div");

async function registerModalBoxEvent() {
    const registerModal = document.querySelector('[data-type="register"]');
    const loginModal = document.querySelector('[data-type="login"]');
    const haveAccount = document.getElementById('haveAccount');

    if (haveAccount) {
        haveAccount.addEventListener('click', (e) => {
            e.preventDefault();

            if (registerModal) {
                registerModal.style.display = 'none';
            }

            if (loginModal) {
                loginModal.style.display = 'flex';
            }
        });
    }

    document.querySelector('[data-type="register"] .box .head .closeBtn').addEventListener("click", e => {
        registerModal.style.display = 'none';
    });

    const registerButton = document.querySelector('[data-type="register"] .purpleNeonBtn');
    if (registerButton) {
        registerButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const username = document.querySelector('[data-type="register"] .box .groups .group #username').value;
            const email = document.querySelector('[data-type="register"] .box .groups .group #email').value;
            const password = document.querySelector('[data-type="register"] .box .groups .group #password').value;

            if (!username || !email || !password) {
                pushNotification("warning", "Veuillez remplir tout les champs !");
                return;
            }

            const data = {
                username: username,
                email: email,
                password: password
            };

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                registerModal.style.display = 'none';
                loginModal.style.display = 'flex';
                pushNotification("success", result.message);
            } else {
                pushNotification("alert", result.message || "Erreur");
            }
        });
    }
}

async function loginModalBoxEvent() {
    const registerModal = document.querySelector('[data-type="register"]');
    const loginModal = document.querySelector('[data-type="login"]');
    const noAccount = document.getElementById('noAccount');

    noAccount.addEventListener('click', (e) => {
        e.preventDefault();

        if (loginModal) {
            loginModal.style.display = 'none';
        }

        if (registerModal) {
            registerModal.style.display = 'flex';
        }
    });

    document.querySelector('[data-type="login"] .box .head .closeBtn').addEventListener("click", e => {
        loginModal.style.display = 'none';
    });

    const loginButton = document.querySelector('[data-type="login"] .purpleNeonBtn');
    if (loginButton) {
        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const email = document.querySelector('[data-type="login"] .box .groups .group #email').value;
            const password = document.querySelector('[data-type="login"] .box .groups .group #password').value;

            if (!email || !password) {
                pushNotification("warning", "Veuillez remplir tous les champs.");
                return;
            }

            const data = {
                email: email,
                password: password
            };

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                pushNotification("success", "Connexion réussie !");
                localStorage.setItem("token", result.token);
                window.location.reload();
            } else {
                pushNotification("alert", result.message || "Erreur");
            }
        });
    }
}