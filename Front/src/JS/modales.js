const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.getElementById("closeModal");

   abrirModalBasura.addEventListener("click", (e) => {
        e.preventDefault();
        modal.classList.remove("hidden");
    });

    cerrarModalBasura.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });