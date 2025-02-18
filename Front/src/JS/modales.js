
//MODAL ELIMINAR CASSETE
// Elementos principales para mostrar el modal para eliminar cassette
const modal = document.getElementById("modal");
const abrirModalBasura = document.getElementById("abrirModalBasura");
const cerrarModalBasura = document.getElementById("cerrarModalBasura");

// Funcion para mostrar modal para eliminar cassette
abrirModalBasura.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
});
// Funcion para cerrar modal para eliminar cassette
cerrarModalBasura.addEventListener("click", () => {
    modal.classList.add("hidden");
});
// Funcion para cerrar modal para eliminar cassette dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});


//MODAL MODIFICAR CASSETE
// Elementos principales para mostrar el modal para modificar cassette
const modalModifiCass = document.getElementById("modalModificarCassete");
const abrirModalModificarCassete = document.getElementById("abrirModificarCassete");
const cerrarModalModificarCassete = document.getElementById("cerrarModalModificarCassete");

// Funcion para mostrar modal para modificar cassette
abrirModalModificarCassete.addEventListener("click", (e) => {
    e.preventDefault();
    modalModifiCass.classList.remove("hidden");
});
// Funcion para cerrar modal para modificar cassette
cerrarModalModificarCassete.addEventListener("click", () => {
    modalModifiCass.classList.add("hidden");
});
// Funcion para cerrar modal para modificar cassette dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modalModifiCass) {
        modalModifiCass.classList.add("hidden");
    }
});




//MODAL NUEVA MUESTRA
// Elementos principales para mostrar el modal para crear muestra
const modalNuevaMuestra = document.getElementById("modalNuevaMuestra");
const abrirModalNuevaMuestra = document.getElementById("abrirModalNuevaMuestra");
const cerrarModalNuevaMuestra = document.getElementById("cerrarModalNuevaMuestra");

// Funcion para mostrar modal para crear muestra
abrirModalNuevaMuestra.addEventListener("click", (e) => {
    e.preventDefault();
    modalNuevaMuestra.classList.remove("hidden");
});
// Funcion para cerrar modal para crear muestra
cerrarModalNuevaMuestra.addEventListener("click", () => {
    modalNuevaMuestra.classList.add("hidden");
});
// Funcion para cerrar modal para crear muestra dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modalNuevaMuestra) {
        modalNuevaMuestra.classList.add("hidden");
    }
});

//MODAL NUEVO CASSETE
// Elementos principales para mostrar el modal para crear cassette
const modalNuevoCassete = document.getElementById("modalNuevoCassete");
const abrirModalNuevoCassete = document.getElementById("abrirModalNuevoCassete");
const cerrarModalNuevoCassete = document.getElementById("cerrarModalNuevoCassete");

// Funcion para mostrar modal para crear cassette
abrirModalNuevoCassete.addEventListener("click", (e) => {
    e.preventDefault();
    modalNuevoCassete.classList.remove("hidden");
});
// Funcion para cerrar modal para crear cassette
cerrarModalNuevoCassete.addEventListener("click", () => {
    modalNuevoCassete.classList.add("hidden");
});
// Funcion para cerrar modal para crear cassette dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modalNuevoCassete) {
        modalNuevoCassete.classList.add("hidden");
    }
});

//Modal modificar muestra
// Elementos principales para mostrar el modal para modificar muestra
const abrirModalModificarMuestra= document.getElementById("abrirModalModificarMuestra");
const modalModificarMuestra = document.getElementById("modalModificarMuestra");
const cerrarModalModificarMuestra = document.getElementById("cerrarModalModificarMuestra");

abrirModalModificarMuestra.addEventListener("click", (e) => {
    e.preventDefault();
    modalModificarMuestra.classList.remove("hidden");
});
cerrarModalModificarMuestra.addEventListener("click", () => {
    modalModificarMuestra.classList.add("hidden");
});
window.addEventListener("click", (e) => {
    if (e.target === modalModificarMuestra) {
        modalModificarMuestra.classList.add("hidden");
    }
});


const cerrarModalMuestrasImagenes = document.getElementById("cerrarModalMuestrasImagenes");

cerrarModalMuestrasImagenes.addEventListener("click", () => {
    modalMuestrasImagenes.classList.add("hidden");
});



const abrirModalBasuraMuestra = document.getElementById("abrirModalBasuraMuestra");
const modalEliminarMuestra = document.getElementById("modalEliminarMuestra");
const cerrarModalBasuraMuestra = document.getElementById("cerrarModalBasuraMuestra");


abrirModalBasuraMuestra.addEventListener("click", (e) => {
    e.preventDefault();
    modalEliminarMuestra.classList.remove("hidden");
});
cerrarModalBasuraMuestra.addEventListener("click", () => {
    modalEliminarMuestra.classList.add("hidden");
});
window.addEventListener("click", (e) => {
    if (e.target === modalEliminarMuestra) {
        modalEliminarMuestra.classList.add("hidden");
    }
});