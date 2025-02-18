//mensajes de error/success
const mensaje = document.getElementById("mensaje");

const tabla_cassettes = document.getElementById("tabla_cassettes");
const boton_detalles_cassette = document.getElementById("boton_detalles_cassette");

//detalle cassette
const id_cassette = document.getElementById("id_cassette");
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
const id_identificadorCassete = document.getElementById('id_identificadorCassete');

//Modificar cassette
const modificar_descripcion_cassette = document.getElementById("modificar_descripcion_cassette");
const modificar_fecha_cassette = document.getElementById("modificar_fecha_cassette");
const modificar_caracteristicas_cassette = document.getElementById("modificar_caracteristicas_cassette");
const modificar_observaciones_cassette = document.getElementById("modificar_observaciones_cassette");

//mostrar detalles muestra 
const descripcion_muestra = document.getElementById("descripcion_muestra");
const fecha_muestra = document.getElementById("fecha_muestra");
const tincion_muestra = document.getElementById("tincion_muestra");
const observaciones_muestra = document.getElementById("observaciones_muestra");

//mostrar muestras de ese cassette
const tabla_muestras = document.getElementById("tabla_muestras");

const nueva_muestra = document.getElementById("nueva_muestra");
const imagenMuestra =document.getElementById("imagenMuestra")

//filtros
//select organo
const organoSelect = document.getElementById("organoSelect");
//select id
const idOrganoSelect = document.getElementById("idOrganoSelect");
//fechas
const fecha_inicio = document.getElementById("fecha_inicio");
const fecha_fin = document.getElementById("fecha_fin");

//modal muestra imagenes
const modalMuestrasImagenes = document.getElementById("modalMuestrasImagenes");

//editar muestras
const nuevaMuestra_desc = document.getElementById("nuevaMuestra_desc");
const nuevaMuestra_fecha = document.getElementById("nuevaMuestra_fecha");
const nuevaMuestra_tincion = document.getElementById("nuevaMuestra_tincion");
const nuevaMuestra_observ = document.getElementById("nuevaMuestra_observ");

const token = localStorage.getItem('token')




const cargarCassettes = async () => {
    const response = await fetch("http://localhost:3000/sanitaria/cassette",{
        method: 'GET',
    headers: {
        'Authorization': `${token}` ,
    }
    });
    const data = await response.json();
    console.log(token)
    // data.forEach(cassette => {
    //     console.log(cassette);
    // });
    mostrar_cassettes(data);
    return data;
}


const mostrar_cassettes = (data) => {
    tabla_cassettes.textContent = '';

    data.forEach(cassette => {
        let fragment = document.createDocumentFragment();

        let div_contenedor = document.createElement("div");
        div_contenedor.classList.add("flex", "border-b", "text-blue-400");

        let div_fecha = document.createElement("div");
        div_fecha.classList.add("flex-1", "p-2", "text-sm");

        //formateamos la fecha
        const fechaFormateada = new Date(cassette.fecha);
        const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');

        div_fecha.textContent = fechaTexto;

        let div_desc = document.createElement("div");
        div_desc.classList.add("flex-1", "p-2", "text-sm", "ml-7");
        div_desc.textContent = cassette.descripcion;

        let div_organo = document.createElement("div");
        div_organo.classList.add("flex-1", "p-2", "text-sm", "ml-8");
        div_organo.textContent = cassette.organo;


        let div_icono = document.createElement("div");
        div_icono.classList.add("mr-1", "p-2");
        let icono = document.createElement("i");
        icono.classList.add("fa-solid", "fa-file-invoice", "text-blue-400");
        div_icono.appendChild(icono);
        icono.id = `boton_detalles_cassette`;

        icono.addEventListener("click", () => {
            mostrarDetallesCassettes(cassette); 
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
    id_cassette.textContent = cassette.idOrgano;
    organo_cassette.textContent = cassette.organo;
    caracteristicas_cassette.textContent = cassette.caracteristicas;
    observaciones_cassette.textContent = cassette.observaciones;

}


const mostrarMuestrasCassette = async (cassette) => {
    const response = await fetch("http://localhost:3000/sanitaria/muestra", {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
        }
    });
    const data = await response.json();
    tabla_muestras.innerHTML = "";

    const muestrasFiltradas = data.filter(muestra => muestra.cassette_id == cassette.id);

    if (muestrasFiltradas.length > 0) {
        muestrasFiltradas.forEach(muestra => {
            const fila_muestra = document.createElement("tr");
            fila_muestra.classList.add("rounded", "flex", "w-full");

            const columna_fecha = document.createElement("td");
            columna_fecha.classList.add("p-2", "text-blue-400", "border-b", "border-blue-400", "w-1/3");
            const columna_descripcion = document.createElement("td");
            columna_descripcion.classList.add("p-2", "text-blue-400", "border-b", "border-blue-400", "w-1/3", "pl-7");
            const columna_tincion = document.createElement("td");
            columna_tincion.classList.add("p-2", "text-blue-400", "border-b", "border-blue-400", "w-1/3", "pl-10");

            let columna_icono = document.createElement("td");
            columna_icono.classList.add("border-b", "border-blue-400", "flex", "justify-center", "items-center", "pl-4"); 
            let icono = document.createElement("i");
            icono.classList.add("fa-solid", "fa-file-invoice", "text-blue-400", "mr-5");
            columna_icono.appendChild(icono);
            icono.id = `abrirModalMuestrasImagenes`;

            icono.addEventListener("click", (e) => {
                e.preventDefault();
                mostrarDetallesMuestra(muestra);
                modalMuestrasImagenes.classList.remove("hidden");
            });

            const fechaFormateada = new Date(muestra.fecha);
            const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');

            columna_fecha.textContent = fechaTexto;
            columna_descripcion.textContent = muestra.descripcion;
            columna_tincion.textContent = muestra.tincion;

            fila_muestra.appendChild(columna_fecha);
            fila_muestra.appendChild(columna_descripcion);
            fila_muestra.appendChild(columna_tincion);
            fila_muestra.appendChild(columna_icono);

            tabla_muestras.appendChild(fila_muestra);
        });
    } else {
        const fila_vacia = document.createElement("tr");
        fila_vacia.classList.add("rounded", "border", "border-blue-400", "w-full");

        const columna_vacia = document.createElement("td");
        columna_vacia.classList.add("p-2", "text-red-400");
        columna_vacia.textContent = "No se ha encontrado ninguna muestra";
        columna_vacia.colSpan = 4;

        fila_vacia.appendChild(columna_vacia);
        tabla_muestras.appendChild(fila_vacia);
    }
}


let muestraSeleccionada;
const mostrarDetallesMuestra = (muestra) => {
    muestraSeleccionada = muestra;
    //formateamos la fecha
    const fechaFormateada = new Date(muestra.fecha);
    const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');

    descripcion_muestra.textContent = muestra.descripcion;
    fecha_muestra.textContent = fechaTexto;
    tincion_muestra.textContent = muestra.tincion;
    observaciones_muestra.textContent = muestra.observaciones;

}

const crearCassette = async () => {
    try {
        const id_user = sessionStorage.getItem("user_id");

        const response = await fetch("http://localhost:3000/sanitaria/cassette/create", {
            method: "POST",
            headers: {
                'Authorization': `${token}` ,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                descripcion: descripcionCassete.value,
                fecha: fechaCassete.value,
                organo: selectCassete.value,
                idOrgano: id_identificadorCassete.value,
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

            cargarSelectID(); //recargamos el select de los ids, para que el nuevo entre en el select
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
                'Authorization': `${token}` ,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data.message);

        if (response.ok) {
            mensaje.textContent = "Cassette eliminado con éxito";
            mensaje.classList.add("bg-green-00", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            if (cerrarModalNuevaMuestra) {
                cerrarModalNuevaMuestra.click();
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



const crearMuestra = async (cassette) => {
    try {
        const response = await fetch("http://localhost:3000/sanitaria/muestra/create", {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
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
        });

        const data = await response.json();
        
        if (cerrarModalNuevaMuestra) {
            cerrarModalNuevaMuestra.click();
        }

        if (response.ok) {
            if (imagenMuestra.files[0]) {
                await createImage(imagenMuestra.files[0], data.createdMuestra.id);
            }

            mensaje.textContent = "Muestra creada con éxito";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 1000);
        } else {
            mensaje.textContent = "Error al crear la muestra: " + (data.message || "Error desconocido");
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 1000);
        }
    } catch (error) {
        console.error("Error al crear la muestra:", error);
        mensaje.textContent = "Ocurrió un error al crear la muestra.";
        mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 1000);
    }
};




const createImage = async (file, muestraID) => {
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('muestra_id', muestraID);

    const response = await fetch("http://localhost:3000/sanitaria/imagen/create", {
        method: "POST",
        headers: {
            'Authorization': `${token}` // No agregues 'Content-Type' manualmente
        },
        body: formData, // Enviar directamente formData
    });

    const data = await response.json();
    console.log(data);
};

const cargarImagen = async (imagenID) => {
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/imagen/${imagenID}`, {
            method: "GET",
            headers: {
                "Authorization": `${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al cargar la imagen");
        }

        const blob = await response.blob(); // Convertir la respuesta en un Blob
        const imgURL = URL.createObjectURL(blob); // Crear una URL temporal

        //AGREGAR <img> PARA PONER IMG

    } catch (error) {
        console.error("Error cargando la imagen:", error);
    }
};


//filtros js
const filtrarCassettesporOrgano = async () => {
    const data = await cargarCassettes();
    let cassttesfilter;

    if (organoSelect.value === 'Todos') {
        cassttesfilter = data;
    } else {
        cassttesfilter = data.filter(cassette => cassette.organo === organoSelect.value);
    }
    mostrar_cassettes(cassttesfilter);
}

//cargar select id
const cargarSelectID = async() => {
    const data = await cargarCassettes();

    data.forEach (cassette => {
        const option = document.createElement('option');
        option.value = cassette.idOrgano;
        option.textContent = cassette.idOrgano;
        idOrganoSelect.appendChild (option);
    });

    
}

const filtrarCassettesporID = async () => {
    const data = await cargarCassettes();
    let cassttesfilter;

    if (idOrganoSelect.value === 'Todos') {
        cassttesfilter = data;
    } else {
        cassttesfilter = data.filter(cassette => cassette.idOrgano === idOrganoSelect.value);
    }
    mostrar_cassettes(cassttesfilter);
}

const modificarCassette = async () => {
    try {
        console.log(descripcionCassete.value)
        const response = await fetch(`http://localhost:3000/sanitaria/cassette/edit/${cassetteActual.id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `${token}` ,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                descripcion: modificar_descripcion_cassette.value,
                fecha: modificar_fecha_cassette.value,
                organo: organos.value,
                caracteristicas: modificar_caracteristicas_cassette.value,
                observaciones: modificar_observaciones_cassette.value,
                idOrgano: "3",
            })
        });

        const data = await response.json(); 

        if(response.ok){
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
        console.error("Error al modificar el cassette:", error);
    }       
};


organoSelect.addEventListener("change", filtrarCassettesporOrgano);
idOrganoSelect.addEventListener("change", filtrarCassettesporID);
nueva_muestra.addEventListener("click", () => {
    crearMuestra(cassetteActual)
})
document.addEventListener("DOMContentLoaded", () => {
    mostrarMuestrasCassette();
    cargarSelectID();
});
const botonModificarCassette = document.getElementById("botonModificarCassette");
botonModificarCassette.addEventListener("click", modificarCassette)




const EliminarMuestra= async () => {
    console.log(muestraSeleccionada.id);

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/muestra/delete/${muestraSeleccionada.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `${token}` ,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data.message);

        if (response.ok) {
            mensaje.textContent = "Muestra eliminado con éxito";
            mensaje.classList.add("bg-green-00", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            if (cerrarModalNuevaMuestra) {
                cerrarModalNuevaMuestra.click();
            }

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 1000);
        } else {
            mensaje.textContent = "Error al eliminar la muestra: " + data.message;
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 1000);
        }
    } catch (error) {
        console.error("Error al eliminar la muestra:", error);
        mensaje.textContent = "Ocurrió un error al eliminar la muestra.";
        mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 1000);
    }

};

const borrarMuestra = document.getElementById("borrarMuestra");
borrarMuestra.addEventListener("click", EliminarMuestra);