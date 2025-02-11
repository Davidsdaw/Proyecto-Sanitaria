
//Funcion crear cassete

const descripcionCassete = document.getElementById('id_descripcionCassete');
const fechaCassete = document.getElementById('id_fechaCassete');
const selectCassete = document.getElementById("organosCassete");
const caracteristicasCassete = document.getElementById('id_caracteristicasCassete');
const observacionesCassete = document.getElementById('id_observacionesCassete');


function crearCassete() {

    const id_user = sessionStorage.getItem("user_id");

    fetch("http://localhost:3000/sanitaria/cassette/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            descripcion: descripcionCassete.value,
            fecha: fechaCassete.value,
            organo: selectCassete.value,
            idOrgano: "3",
            caracteristicas: caracteristicasCassete.value,
            observaciones: observacionesCassete.value,
            qr_cassette: "http://localhost:3000/santiaria/cassette",
            usuario_id: id_user,

        }),
    })
}

const nuevo_cassete = document.getElementById("nuevo_cassete");

nuevo_cassete.addEventListener("click", crearCassete);