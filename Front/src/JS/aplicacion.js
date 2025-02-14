
const tabla_cassettes = document.getElementById("tabla_cassettes");
const boton_detalles_cassette = document.getElementById("boton_detalles_cassette");

//detalle cassette
const descripcion_cassette = document.getElementById("descripcion_cassette");
const fecha_cassette = document.getElementById("fecha_cassette");
const organo_cassette = document.getElementById("organo_cassette");
const caracteristicas_cassette = document.getElementById("caracteristicas_cassette");
const observaciones_cassette = document.getElementById("observaciones_cassette");

//Funcion crear cassete
const descripcionCassete = document.getElementById('id_descripcionCassete');
const fechaCassete = document.getElementById('id_fechaCassete');
const selectCassete = document.getElementById("organosCassete");
const caracteristicasCassete = document.getElementById('id_caracteristicasCassete');
const observacionesCassete = document.getElementById('id_observacionesCassete');


//Funcion crear muestra
const descripcionMuestra = document.getElementById('descripcionMuestra');
const fechaMuestra = document.getElementById('fechaMuestra');
const tincionMuestra = document.getElementById('tincionMuestra');
const observacionesMuestra = document.getElementById('observacionesMuestra');
const imagenMuestra = document.getElementById('imagenMuestra');


//mostrar muestras de ese cassette
// const fecha_muestra = document.getElementById("fecha_muestras");
// const descripcion_muestra = document.getElementById("descripcion_muestra");
// const tincion_muestra = document.getElementById("tincion_muestra");
const tabla_muestras = document.getElementById("tabla_muestras");


//boton eliminar cassette
const botonEliminarCassette = document.getElementById("botonEliminarCassette");

//cassette actual
let cassetteActual;

const cargarCassettes = async () => {
    const response = await fetch("http://localhost:3000/sanitaria/cassette");
    const data = await response.json();

    // data.forEach(cassette => {
    //     console.log(cassette);
    // });

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
            mostrarMuestrasCassette(cassette);
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

    // console.log(cassette);
    cassetteActual = cassette;

    //editamos la fecha para DD/MM/YYYY
    const fechaFormateada = new Date(cassette.fecha);
    const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');

    descripcion_cassette.textContent = cassette.descripcion;
    fecha_cassette.textContent = fechaTexto;
    organo_cassette.textContent = cassette.organo;
    caracteristicas_cassette.textContent = cassette.caracteristicas;
    observaciones_cassette.textContent = cassette.observaciones;
}


const mostrarMuestrasCassette = async(cassette) => {
    const response = await fetch("http://localhost:3000/sanitaria/muestra");
    const data = await response.json();
    tabla_muestras.innerHTML = "";

    data.forEach(muestra => {
        if (muestra.cassette_id == cassette.id) {
            console.log(muestra);
            //    fecha_muestra.textContent = muestra.fecha.split('T')[0];
            // descripcion_muestra.textContent = muestra.descripcion;
            // tincion_muestra.textContent = muestra.tincion;
            const fila_muestra = document.createElement("tr");
            fila_muestra.classList.add("rounded", "border-blue-400", "border");
            const columna_fecha = document.createElement("td");
            const columna_descripcion = document.createElement("td");
            const columna_tincion = document.createElement("td");
            const fechaFormateada = new Date(muestra.fecha);

            const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');
            columna_fecha.textContent = fechaTexto;
            columna_fecha.classList.add("p-2", "text-blue-400");
            columna_descripcion.textContent = muestra.descripcion;
            columna_descripcion.classList.add("p-2", "text-blue-400");
            columna_tincion.textContent = muestra.tincion;
            columna_tincion.classList.add("p-2", "text-blue-400");

            fila_muestra.appendChild(columna_fecha);
            fila_muestra.appendChild(columna_descripcion);
            fila_muestra.appendChild(columna_tincion);

            tabla_muestras.appendChild(fila_muestra);
        }
    });
}



const crearCassete = async() => {

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
            qr_cassette: "http://localhost:3000/sanitaria/cassette",
            usuario_id: id_user,

        }),
    })
}

const nuevo_cassete = document.getElementById("nuevo_cassete");
nuevo_cassete.addEventListener("click", crearCassete);
document.addEventListener("DOMContentLoaded", cargarCassettes);
