
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
const mensaje = document.getElementById("mensaje");
//mostrar muestras de ese cassette
// const fecha_muestra = document.getElementById("fecha_muestras");
// const descripcion_muestra = document.getElementById("descripcion_muestra");
// const tincion_muestra = document.getElementById("tincion_muestra");
const tabla_muestras = document.getElementById("tabla_muestras");

const nueva_muestra = document.getElementById("nueva_muestra");

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

let cassetteActual = null;

const mostrarDetallesCassettes = (cassette) => {
    cassetteActual = cassette;

    // console.log(cassette);
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



const crearCassette = async () => {
    try {
        const id_user = sessionStorage.getItem("user_id");

        const response = await fetch("http://localhost:3000/sanitaria/cassette/create", {
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
        });

        const data = await response.json();
        console.log(data);


        if (response.ok) {

            if (cerrarModalNuevoCassete) {
                cerrarModalNuevoCassete.click(); 
            } 

            mensaje.textContent = "Cassette creado con éxito"; 
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 2000);
        } else {
            mensaje.textContent = "Error al crear el cassette: " + data.message;
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        }
    } catch (error) {
        console.error("Error al crear el cassette:", error);
        const mensaje = document.getElementById("mensaje");
        mensaje.textContent = "Ocurrió un error al crear el cassette.";
        mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2000);
    }
};


const nuevo_cassete = document.getElementById("nuevo_cassete");
nuevo_cassete.addEventListener("click", crearCassette);
document.addEventListener("DOMContentLoaded", cargarCassettes); 



const eliminarCassette = async () => {
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassette/delete/${cassetteActual.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data.message);

        if (response.ok) {
            mensaje.textContent = "Cassette eliminado con éxito"; 
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            if (cerrarModalBasura) {
                cerrarModalBasura.click();  
            } 

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 1000);
        } else {
            mensaje.textContent = "Error al eliminar el cassette: " + data.message;
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        }
    } catch (error) {
        console.error("Error al eliminar el cassette:", error);
        mensaje.textContent = "Ocurrió un error al eliminar el cassette.";
        mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 1000);
    }
};



const botonEliminarCassette = document.getElementById("botonEliminarCassette");
botonEliminarCassette.addEventListener("click", eliminarCassette)

const crearMuestra = async(cassette) => {


    const response = await  fetch("http://localhost:3000/sanitaria/muestra/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            descripcion: descripcionMuestra.value,
            fecha: fechaMuestra.value,
            tincion: tincionMuestra.value,
            observaciones: observacionesMuestra.value,
            qr_muestra: "http://localhost:3000/sanitaria/muestra",
            cassette_id: cassette.id,
        }),
    })
    const data = await response.json()
    console.log(data.success)
}

nueva_muestra.addEventListener("click", () => {
    crearMuestra(cassetteActual)
})
document.addEventListener("DOMContentLoaded", mostrarMuestrasCassette);




