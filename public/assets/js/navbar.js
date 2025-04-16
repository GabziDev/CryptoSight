document.getElementById("myAccount").addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user/favorites", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    });
    if (response.status === 401) {
        const registerModal = document.querySelector('[data-type="register"]');
        if (registerModal) {
            document.querySelectorAll('#modals > [data-type]').forEach(modal => {
                modal.style.display = "none";
            });

            registerModal.style.display = "flex";
        }
    } else {
        window.location.href = "/profil.html";
    }
});