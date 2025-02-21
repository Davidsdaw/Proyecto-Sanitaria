
//MODAL ELIMINAR CASSETE
const modal = document.getElementById("modal");
const abrirModalBasura = document.getElementById("abrirModalBasura");
const cerrarModalBasura = document.getElementById("cerrarModalBasura");

// mostrar modal para eliminar cassette
abrirModalBasura.addEventListener("click", (e) => {
    e.preventDefault();
    if(cassetteActual){
        modal.classList.remove("hidden");
    }
});
// cerrar modal para eliminar cassette
cerrarModalBasura.addEventListener("click", () => {
    modal.classList.add("hidden");
});
// cerrar modal para eliminar cassette dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});


//MODAL MODIFICAR CASSETE
const modalModifiCass = document.getElementById("modalModificarCassete");
const abrirModalModificarCassete = document.getElementById("abrirModificarCassete");
const cerrarModalModificarCassete = document.getElementById("cerrarModalModificarCassete");

//mostrar modal para modificar cassette
abrirModalModificarCassete.addEventListener("click", (e) => {
    e.preventDefault();
    if(cassetteActual){
        console.log(cassetteActual);
        modalModifiCass.classList.remove("hidden");
        modificar_descripcion_cassette.value = cassetteActual.descripcion;
        modificar_fecha_cassette.value = cassetteActual.fecha;
        organos.value = cassetteActual.organo;
        modificar_identificador_cassette.value=id_cassette.textContent;
        modificar_caracteristicas_cassette.value = cassetteActual.caracteristicas;
        modificar_observaciones_cassette.value = cassetteActual.observaciones;
    }
});
// cerrar modal para modificar cassette
cerrarModalModificarCassete.addEventListener("click", () => {
    modalModifiCass.classList.add("hidden");
});
// cerrar modal para modificar cassette dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modalModifiCass) {
        modalModifiCass.classList.add("hidden");
    }
});




//MODAL NUEVA MUESTRA
const modalNuevaMuestra = document.getElementById("modalNuevaMuestra");
const abrirModalNuevaMuestra = document.getElementById("abrirModalNuevaMuestra");
const cerrarModalNuevaMuestra = document.getElementById("cerrarModalNuevaMuestra");

// mostrar modal para crear muestra
abrirModalNuevaMuestra.addEventListener("click", (e) => {
    e.preventDefault();
    if(cassetteActual){
        modalNuevaMuestra.classList.remove("hidden");
    }
});
// cerrar modal para crear muestra
cerrarModalNuevaMuestra.addEventListener("click", () => {
    modalNuevaMuestra.classList.add("hidden");
});
// cerrar modal para crear muestra dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modalNuevaMuestra) {
        modalNuevaMuestra.classList.add("hidden");
    }
});

//MODAL NUEVO CASSETE
const modalNuevoCassete = document.getElementById("modalNuevoCassete");
const abrirModalNuevoCassete = document.getElementById("abrirModalNuevoCassete");
const cerrarModalNuevoCassete = document.getElementById("cerrarModalNuevoCassete");

//  mostrar modal para crear cassette
abrirModalNuevoCassete.addEventListener("click", (e) => {
    e.preventDefault();
    modalNuevoCassete.classList.remove("hidden");
});
// cerrar modal para crear cassette
cerrarModalNuevoCassete.addEventListener("click", () => {
    modalNuevoCassete.classList.add("hidden");
});
// cerrar modal para crear cassette dando click en cualquier zona de la pantalla que no sea el modal
window.addEventListener("click", (e) => {
    if (e.target === modalNuevoCassete) {
        modalNuevoCassete.classList.add("hidden");
    }
});

//MODAL MODIFICAR MUESTRA
const abrirModalModificarMuestra= document.getElementById("abrirModalModificarMuestra");
const modalModificarMuestra = document.getElementById("modalModificarMuestra");
const cerrarModalModificarMuestra = document.getElementById("cerrarModalModificarMuestra");

abrirModalModificarMuestra.addEventListener("click", (e) => {
    e.preventDefault();
    modalModificarMuestra.classList.remove("hidden");
    nuevaMuestra_desc.value=descripcion_muestra.textContent
    nuevaMuestra_tincion.value = tincion_muestra.textContent
    nuevaMuestra_observ.value = observaciones_muestra.textContent

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



//MODAL ELIMINAR MUESTRA
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


//MODAL AÑADIR IMAGEN A LA MUESTRA
const abrirModalAñadirImagen = document.getElementById("abrirModalAñadirImagen");

const cerrarModalAñadirImagen = document.getElementById("cerrarModalAñadirImagen");


cerrarModalAñadirImagen.addEventListener("click", () => {
    modalAñadirImagen.classList.add("hidden");
});
window.addEventListener("click", (e) => {
    if (e.target === modalAñadirImagen) {
        modalAñadirImagen.classList.add("hidden");
    }
});