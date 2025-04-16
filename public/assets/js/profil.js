document.addEventListener("DOMContentLoaded", async (e) => {
    const response = await fetch("/api/user/info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    });

    const result = await response.json();

    if (response.ok) {
        document.querySelectorAll("#username").forEach(username => {
            username.textContent = result.username;
        });

        document.getElementById("email").textContent = result.email;
    } else {
        window.location.href = "/index.html";
    }
});

document.getElementById("disconnect").addEventListener("click", e => {
    localStorage.clear();
    window.location.href = "/";
});

document.getElementById("deleteAccount").addEventListener("click", async (e) => {
    const response = await fetch("/api/user/account", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    });

    const result = await response.json();

    if (response.ok) {
        alert(result.message);
        window.location.href = "/";
    } else {
        alert(result.message);
    }
});