
    //MODAL ELIMINAR CASSETE

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


    //MODAL MODIFICAR CASSETE

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




    //MODAL NUEVA MUESTRA

    const modalNuevaMuestra = document.getElementById("modalNuevaMuestra");
    const abrirModalNuevaMuestra = document.getElementById("abrirModalNuevaMuestra");
    const cerrarModalNuevaMuestra = document.getElementById("cerrarModalNuevaMuestra");
    



    abrirModalNuevaMuestra.addEventListener("click", (e) => {
        e.preventDefault();
        modalNuevaMuestra.classList.remove("hidden");
    });

    cerrarModalNuevaMuestra.addEventListener("click", () => {
        modalNuevaMuestra.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modalNuevaMuestra) {
            modalNuevaMuestra.classList.add("hidden");
        }
    });



    //MODAL NUEVO CASSETE


    const modalNuevoCassete = document.getElementById("modalNuevoCassete");
    const abrirModalNuevoCassete = document.getElementById("abrirModalNuevoCassete");
    const cerrarModalNuevoCassete = document.getElementById("cerrarModalNuevoCassete");
    



    abrirModalNuevoCassete.addEventListener("click", (e) => {
        e.preventDefault();
        modalNuevoCassete.classList.remove("hidden");
    });

    cerrarModalNuevoCassete.addEventListener("click", () => {
        modalNuevoCassete.classList.add("hidden");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modalNuevoCassete) {
            modalNuevoCassete.classList.add("hidden");
        }
    });