const myAccountBtn = document.querySelectorAll("#myAccount");
const menuToggleBtn = document.getElementById("menuToggle");
const mobileMenu = document.querySelector(".mobilemenu");

(function () {
    myAccountBtn.forEach(btn => {
        btn.addEventListener("click", async (e) => {
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
    });
})();

menuToggleBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
    menuToggleBtn.classList.toggle("open");
});