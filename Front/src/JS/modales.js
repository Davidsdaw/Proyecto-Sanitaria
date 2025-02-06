const modal = document.getElementById("modal");
    const abrirModalBasura = document.getElementById("abrirModalBasura");
    const cerrarModalBasura = document.getElementById("cerrarModalBasura");

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


    const modalModifiCass = document.getElementById("modalModificarCassete");
    const abrirModalModificarCassete = document.getElementById("abrirModificarCassete");
    const cerrarModalModificarCassete = document.getElementById("cerrarModalModificarCassete");


    abrirModalModificarCassete.addEventListener("click", (e) => {
        e.preventDefault();
        modalModifiCass.classList.remove("hidden");
    });

    cerrarModalModificarCassete.addEventListener("click", () => {
        modalModifiCass.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modalModifiCass) {
            modalModifiCass.classList.add("hidden");
        }
    });