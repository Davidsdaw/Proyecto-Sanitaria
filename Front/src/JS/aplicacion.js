
const tabla_cassettes = document.getElementById("tabla_cassettes");
const boton_detalles_cassette = document.getElementById("boton_detalles_cassette");

//detalle cassette
const descripcion_cassette = document.getElementById("descripcion_cassette");
const fecha_cassette = document.getElementById("fecha_cassette");
const organo_cassette = document.getElementById("organo_cassette");
const caracteristicas_cassette = document.getElementById("caracteristicas_cassette");
const observaciones_cassette = document.getElementById("observaciones_cassette");


const cargarCassettes = async () => {
    const response = await fetch("http://localhost:3000/sanitaria/cassette");
    const data = await response.json();

    data.forEach(cassette => {
        console.log(cassette);
    });

    mostrar_cassettes(data);
}


const mostrar_cassettes = (data) => {
    tabla_cassettes.textContent = '';

    data.forEach(cassette => {
        let fragment = document.createDocumentFragment();

        let div_contenedor = document.createElement("div");
        div_contenedor.classList.add("flex", "border-b", "text-blue-500");

        let div_fecha = document.createElement("div");
        div_fecha.classList.add("flex-1", "p-2", "text-sm");
        div_fecha.textContent = cassette.fecha;

        let div_desc = document.createElement("div");
        div_desc.classList.add("flex-1", "p-2", "text-sm", "ml-7");
        div_desc.textContent = cassette.descripcion;

        let div_organo = document.createElement("div");
        div_organo.classList.add("flex-1", "p-2", "text-sm", "ml-8");
        div_organo.textContent = cassette.organo;


        let div_icono = document.createElement("div");
        div_icono.classList.add("mr-1", "p-2");
        let icono = document.createElement("i");
        icono.classList.add("fa-solid", "fa-file-invoice", "text-blue-300");
        div_icono.appendChild(icono);
        icono.id = `boton_detalles_cassette`;

        icono.addEventListener("click", () => {
            mostrarDetallesCassettes(cassette);  // pasamos el cassette actual
        });


        div_contenedor.appendChild(div_fecha);
        div_contenedor.appendChild(div_desc);
        div_contenedor.appendChild(div_organo);
        div_contenedor.appendChild(div_icono);

        fragment.appendChild(div_contenedor);
        tabla_cassettes.appendChild(fragment);


    });
}

const mostrarDetallesCassettes = (cassette) => {
    console.log("hola");
    console.log(cassette);

    
    descripcion_cassette.textContent = cassette.descripcion;
    const fechaFormateada = new Date(cassette.fecha);
    const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');

    fecha_cassette.textContent = fechaTexto;
    organo_cassette.textContent = cassette.organo;
    caracteristicas_cassette.textContent = cassette.caracteristicas;
    observaciones_cassette.textContent = cassette.observaciones;
}




document.addEventListener("DOMContentLoaded", cargarCassettes);


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

