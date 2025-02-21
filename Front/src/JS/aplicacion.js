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
fechaCassete.min = new Date().toISOString().split('T')[0];
const selectCassete = document.getElementById("organosCassete");
const caracteristicasCassete = document.getElementById('id_caracteristicasCassete');
const observacionesCassete = document.getElementById('id_observacionesCassete');
const id_identificadorCassete = document.getElementById('id_identificadorCassete');

//Modificar cassette
const modificar_descripcion_cassette = document.getElementById("modificar_descripcion_cassette");
const modificar_fecha_cassette = document.getElementById("modificar_fecha_cassette");
modificar_fecha_cassette.min=fechaCassete.min = new Date().toISOString().split('T')[0];
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
const eliminarImagenGrande=document.getElementById("eliminarImagenGrande")

//filtros
const BoxFilters = document.getElementById("Boxfilters");
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
nuevaMuestra_fecha.min = new Date().toISOString().split('T')[0];
fechaMuestra.min = new Date().toISOString().split('T')[0];
const nuevaMuestra_tincion = document.getElementById("nuevaMuestra_tincion");
const nuevaMuestra_observ = document.getElementById("nuevaMuestra_observ");

//token
const token = localStorage.getItem('token')

//elementos del ordenar
const ordenarPorFecha = document.getElementById("ordenarPorFechaCassette");
const ordenarPorDescripcion = document.getElementById("ordenarPorDescripcionCassette");
const ordenarPorOrgano = document.getElementById("ordenarPorOrganoCassette");
const modificar_identificador_cassette = document.getElementById("modificar_identificador_cassette");


//funcion para cargar cassettes al cargar la página
const cargarCassettes = async () => {
    if(!sessionStorage.getItem("user_id")){
        location.href="../index.html"
    }
    try {
        const response = await fetch("http://localhost:3000/sanitaria/cassette", {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener dato");
        }

        dataCassettes = await response.json();

        mostrar_cassettes(dataCassettes);
        return dataCassettes;
    } catch (error) {
        console.error("Error al cargar cassettes:", error);
    }
};

let ascendenteFechaC = true;
let ascendenteDescripcionC = true;
let ascendenteOrganoC = true;

//funcion para ordenar cassettes
const ordenarCassettes = (campo, tipo) => {
    return () => {
        let ascendente = tipo === "fecha" ? ascendenteFechaC : tipo === "descripcion" ? ascendenteDescripcionC : ascendenteOrganoC;

        dataCassettes.sort((a, b) => {
            if (a[campo] < b[campo]) return ascendente ? -1 : 1;
            if (a[campo] > b[campo]) return ascendente ? 1 : -1;
            return 0;
        });

        if (tipo === "fecha") {
            ascendenteFechaC = !ascendenteFechaC;
        } else if (tipo === "descripcion") {
            ascendenteDescripcionC = !ascendenteDescripcionC;
        } else {
            ascendenteOrganoC = !ascendenteOrganoC;
        }

        const icono = document.getElementById(`ascendente${tipo === "fecha" ? "F" : tipo === "descripcion" ? "Desc" : "Org"}`);
        icono.innerHTML = ascendente ? "&#x25BE;" : "&#x25B4;"; 

        mostrar_cassettes(dataCassettes);
        mostrarMuestrasCassette(dataCassettes);
    };
};

document.getElementById("ordenarPorFechaCassette").addEventListener("click", ordenarCassettes("fecha", "fecha"));
document.getElementById("ordenarPorDescripcionCassette").addEventListener("click", ordenarCassettes("descripcion", "descripcion"));
document.getElementById("ordenarPorOrganoCassette").addEventListener("click", ordenarCassettes("organo", "organo"));


//funcion que usamos para mostrar los cassettes
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
        renderizarMuestras();

    });
}

let cassetteActual = null;

//funcion para mostrar los detalles de los cassettes
const mostrarDetallesCassettes = (cassette) => {
    cassetteActual = cassette;
    //Editamos la fecha para DD/MM/YYYY
    const fechaFormateada = new Date(cassette.fecha);
    const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');

    descripcion_cassette.textContent = cassette.descripcion;
    fecha_cassette.textContent = fechaTexto;
    id_cassette.textContent = cassette.idOrgano;
    organo_cassette.textContent = cassette.organo;
    caracteristicas_cassette.textContent = cassette.caracteristicas;
    observaciones_cassette.textContent = cassette.observaciones;
    mostrarMuestrasCassette(cassette);
}

let ascendenteFecha = true;
let ascendenteDescripcion = true;
let ascendenteTincion = true;
let muestrasFiltradas = [];

//funcion paea ordenar muestras
const ordenarMuestras = (campo, tipo) => {
    return () => {
        if (muestrasFiltradas.length === 0) return; 

        let ascendente = tipo === "fecha" ? ascendenteFecha : tipo === "descripcion" ? ascendenteDescripcion : ascendenteTincion;

        muestrasFiltradas.sort((a, b) => {
            if (a[campo] < b[campo]) return ascendente ? -1 : 1;
            if (a[campo] > b[campo]) return ascendente ? 1 : -1;
            return 0;
        });

        if (tipo === "fecha") {
            ascendenteFecha = !ascendenteFecha;
        } else if (tipo === "descripcion") {
            ascendenteDescripcion = !ascendenteDescripcion;
        } else {
            ascendenteTincion = !ascendenteTincion;
        }

        const icono = document.getElementById(`ascendente${tipo === "fecha" ? "M" : tipo === "descripcion" ? "DescM" : "Tincion"}`);
        icono.innerHTML = ascendente ? "&#x25B4;" : "&#x25BE;"; 

        renderizarMuestras();
    };
};

//funcion para mostrar las muestras de los cassettes
const mostrarMuestrasCassette = async (cassette) => {
    const response = await fetch("http://localhost:3000/sanitaria/muestra", {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
        }
    });
    const data = await response.json();
    tabla_muestras.innerHTML = "";

    muestrasFiltradas = data.filter(muestra => muestra.cassette_id == cassette.id);

    renderizarMuestras();
};

//funcion para renderizar las muestras
const renderizarMuestras = () => {
    tabla_muestras.innerHTML = "";

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
};

document.getElementById("ordenarPorFechaMuestra").addEventListener("click", ordenarMuestras("fecha", "fecha"));
document.getElementById("ordenarPorDescripcionMuestra").addEventListener("click", ordenarMuestras("descripcion", "descripcion"));
document.getElementById("ordenarPorTincionMuestra").addEventListener("click", ordenarMuestras("tincion", "tincion"));


//funcion para mostrar los detalles de la muestra
let muestraSeleccionada = null;
const mostrarDetallesMuestra = (muestra) => {
    muestraSeleccionada = muestra;
    //formateamos la fecha
    const fechaFormateada = new Date(muestra.fecha);
    const fechaTexto = fechaFormateada.toLocaleDateString('es-ES');

    descripcion_muestra.textContent = muestra.descripcion;
    fecha_muestra.textContent = fechaTexto;
    tincion_muestra.textContent = muestra.tincion;
    observaciones_muestra.textContent = muestra.observaciones;

    mostrarImagenesMuestra(muestra.id);

}
const imgBig = document.getElementById("imgBig")
//funcion para mostrar las imagenes de las muestras
const mostrarImagenesMuestra = async (idMuestra) => {
    sessionStorage.setItem("idMuestra",idMuestra)
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/imagen/all/${idMuestra}`, {
            method: "GET",
            headers: {
                "Authorization": `${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al cargar las imágenes");
        }

        const imagenes = await response.json(); // Obtener las imágenes en Base64

        // Seleccionamos el contenedor donde se mostrarán las imágenes
        const contenedorImagenes = document.querySelector(".border-t-2.mt-10.flex.pt-3.items-center");
        const imgBig = document.getElementById("imgBig"); // Seleccionar la imagen grande

        // Limpiamos las imágenes anteriores
        contenedorImagenes.innerHTML = '';

        // Agregar las imágenes retornadas al contenedor
        imagenes.forEach(img => {
            const imgElement = document.createElement("img");
            imgElement.src = img.imagen; // Base64 ya viene en el JSON
            imgElement.classList.add("w-24", "mr-5", "miniatura");
            imgElement.dataset.id = img.id; // Guardamos el ID en un atributo dataset

            // Evento para cambiar la imagen grande cuando se haga clic en una miniatura
            imgElement.addEventListener("click", () => {
                imgBig.src = img.imagen;
                imgBig.alt = img.id; // Guardar el ID en el alt de la imagen grande
            });

            contenedorImagenes.appendChild(imgElement);
        });

        // Mostrar la primera imagen como principal
        if (imagenes.length > 0) {
            imgBig.src = imagenes[0].imagen;
            imgBig.alt = imagenes[0].id; // Guardar el ID de la primera imagen en el alt
        }

        // Agregar el ícono de añadir imagen
        const iconElement = document.createElement("a");
        iconElement.id = "abrirModalAñadirImagen";
        iconElement.href = "#"; // Cambia href a "#" para evitar recargas de página
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-circle-plus", "fa-2xl", "text-blue-300");
        iconElement.appendChild(icon);
        contenedorImagenes.appendChild(iconElement);

        // Esperar a que el elemento exista en el DOM antes de agregar el evento
        setTimeout(() => {
            const abrirModalAñadirImagen = document.getElementById("abrirModalAñadirImagen");
            const modalAñadirImagen = document.getElementById("modalAñadirImagen");

            if (abrirModalAñadirImagen && modalAñadirImagen) {
                abrirModalAñadirImagen.addEventListener("click", (e) => {
                    e.preventDefault();
                    modalAñadirImagen.classList.remove("hidden");
                });
            } else {
                console.error("No se encontró el botón o el modal en el DOM.");
            }
        }, 100); // Espera un poco para asegurar que el botón está en el DOM

    } catch (error) {
        console.error("Error cargando las imágenes:", error);
    }
};


//funcion para eliminar la imagen de muestras actual
const eliminarImagenActual = async () => {
    try {
        const imgBig = document.getElementById("imgBig");
        const idImagen = imgBig.alt; // Obtener el ID desde el alt
        if (!idImagen) {
            console.error("No se encontró un ID en la imagen.");
            return;
        }

        // Contar cuántas imágenes hay en el contenedor
        const contenedorImagenes = document.querySelector(".border-t-2.mt-10.flex.pt-3.items-center");
        const totalImagenes = contenedorImagenes.querySelectorAll("img").length; // Contar las imágenes

        if (totalImagenes <= 1) {
            if (cerrarModalBasuraMuestra) {
                cerrarModalMuestrasImagenes.click();
            }
            mensaje.textContent = "Error: No puedes eliminar la única imagen disponible.";
            mensaje.className = ""; // Limpiar clases previas
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
            return;
        }

        // Hacer la petición DELETE al servidor
        const response = await fetch(`http://localhost:3000/sanitaria/imagen/delete/${idImagen}`, {
            method: "DELETE",
            headers: {
                "Authorization": `${token}`,
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error("Error al eliminar la imagen");
        }

        console.log("Imagen eliminada correctamente.");

        // 🔄 Volver a cargar las imágenes después de la eliminación
        mostrarImagenesMuestra(sessionStorage.getItem("idMuestra"));

    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
    }
};


// Asociar la función al botón de la papelera
document.getElementById("abrirModalBasuraMuestra").addEventListener("click", (e) => {
    e.preventDefault();
    eliminarImagenActual();
});


//funcion enable añadir muestra
document.getElementById("botonEliminarAñadirMuestra").addEventListener("click", async () => {
    const inputImagen = document.getElementById("imagenMuestra2");
    const file = inputImagen.files[0]; // Obtener el archivo seleccionado
    const modalAñadirImagen = document.getElementById("modalAñadirImagen");

    if (!file) {
        alert("Por favor, selecciona una imagen.");
        return;
    }

    // Obtener el ID de la muestra desde sessionStorage
    const idMuestra = sessionStorage.getItem("idMuestra");

    if (!idMuestra) {
        console.error("No se encontró un ID de muestra.");
        return;
    }

    await createImage(file, idMuestra);

    // Cerrar el modal
    modalAñadirImagen.classList.add("hidden");

    // Limpiar el input
    inputImagen.value = "";

    // Recargar imágenes para mostrar la nueva
    mostrarImagenesMuestra(idMuestra);
});


//funcion para verificar id del organo
const verificarIdOrgano = async (idOrgano) => {
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassette/idOrgano/${idOrgano}`, {
            method: "GET",
            headers: {
                'Authorization': `${token}`,
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            return true; // Si encuentra el cassette, significa que ya existe
        } else if (response.status === 404) {
            return false; // Si el cassette no existe, podemos crearlo
        }
    } catch (error) {
        console.error("Error al verificar idOrgano:", error);
    }
    return true; // En caso de error asumimos que existe
};

//funcion para crear cassette
const crearCassette = async () => {
    try {
        const id_user = sessionStorage.getItem("user_id");
        const idOrganoGenerado = selectCassete.value.slice(0, 3) + "-" + id_identificadorCassete.value;

        // Validar campos requeridos
        if (
            !descripcionCassete.value.trim() ||
            !fechaCassete.value.trim() ||
            !selectCassete.value.trim() ||
            !id_identificadorCassete.value.trim() ||
            !caracteristicasCassete.value.trim() ||
            !observacionesCassete.value.trim()
        ) {
            if (cerrarModalNuevoCassete) {
                cerrarModalNuevoCassete.click();
            }
            mensaje.textContent = "Por favor, completa todos los campos.";
            mensaje.className = ""; // Limpiar clases previas
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
            return; // No continuar si hay campos vacíos
        }

        // Verificar si idOrgano ya existe
        const existe = await verificarIdOrgano(idOrganoGenerado);
        if (existe) {
            if (cerrarModalNuevoCassete) {
                cerrarModalNuevoCassete.click();
            }
            mensaje.textContent = "Error: El ID del órgano ya existe.";
            mensaje.className = "";
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
            return;
        }

        // Crear cassette si pasa todas las validaciones
        const response = await fetch("http://localhost:3000/sanitaria/cassette/create", {
            method: "POST",
            headers: {
                'Authorization': `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                descripcion: descripcionCassete.value,
                fecha: fechaCassete.value,
                organo: selectCassete.value,
                idOrgano: idOrganoGenerado,
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
            mensaje.className = "";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 2000);

            cargarSelectID();
        } else {
            mensaje.textContent = "Error al crear el cassette: " + data.message;
            mensaje.className = "";
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        }
    } catch (error) {
        console.error("Error al crear el cassette:", error);
        mensaje.textContent = "Ocurrió un error al crear el cassette.";
        mensaje.className = "";
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


//funcion para eliminar el cassette
const eliminarCassette = async () => {
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/cassette/delete/${cassetteActual.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data.message);

        if (response.ok) {
            mensaje.textContent = "Cassette eliminado con éxito";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
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


//funcion para crear muestra
const crearMuestra = async (cassette) => {
    try {
        // Validar que todos los campos tengan valores
        if (
            !descripcionMuestra.value ||
            !fechaMuestra.value ||
            !tincionMuestra.value ||
            !observacionesMuestra.value ||
            !cassette?.id // Verificar que el cassette tenga ID válido
        ) {
            if (cerrarModalNuevaMuestra) {
                cerrarModalNuevaMuestra.click();
            }
            mensaje.textContent = "Todos los campos son obligatorios.";
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
            return; // Detener ejecución si hay valores vacíos
        }

        console.log("Enviando datos al servidor...");

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

        console.log("Respuesta recibida:", response);

        const data = await response.json();

        console.log("Datos del servidor:", data);

        if (cerrarModalNuevaMuestra) {
            cerrarModalNuevaMuestra.click();
        }

        if (response.ok) {
            console.log("Muestra creada con éxito:", data);

            if (imagenMuestra.files[0]) {
                console.log("Subiendo imagen de la muestra...");
                await createImage(imagenMuestra.files[0], data.createdMuestra.id);
            }

            mensaje.textContent = "Muestra creada con éxito";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 2000);
        } else {
            console.error("Error en la respuesta del servidor:", data.message);
            mensaje.textContent = "Error al crear la muestra: " + (data.message || "Error desconocido");
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        }
    } catch (error) {
        console.error("Error al crear la muestra:", error);
        mensaje.textContent = "Ocurrió un error al crear la muestra.";
        mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2000);
    }
};




//funcion para crear imagen
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

//funcion para crear imagen
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
const cargarSelectID = async () => {
    const data = await cargarCassettes();

    data.forEach(cassette => {
        const option = document.createElement('option');
        option.value = cassette.idOrgano;
        option.textContent = cassette.idOrgano;
        idOrganoSelect.appendChild(option);
    });


}

//funcion para cargar selects por id
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

//funcion para filtrar cassettes por fecha
const filtrarCassettesporFecha = async (event) => {
    const data = await cargarCassettes();
    let cassettesfilter = [];

    let fechaInicio = fecha_inicio.value;
    let fechaFin = fecha_fin.value;

    // convertir las fechas a formato Date si no están vacías
    if (fechaInicio !== '') {
        fechaInicio = new Date(fechaInicio);
    } else {
        fechaInicio = null;
    }

    if (fechaFin !== '') {
        fechaFin = new Date(fechaFin);
    } else {
        fechaFin = null;
    }

    // console.log("Fecha de inicio:", fechaInicio);
    // console.log("Fecha de fin:", fechaFin);

    data.forEach(cassette => {
        const fechaCassette = new Date(cassette.fecha);

        if (fechaInicio && !fechaFin) {
            // solo hay fecha de inicio
            if (fechaCassette >= fechaInicio) {
                cassettesfilter.push(cassette);
            }
        } else if (!fechaInicio && fechaFin) {
            // solo hay fecha de fin
            if (fechaCassette <= fechaFin) {
                cassettesfilter.push(cassette);
            }
        } else if (fechaInicio && fechaFin) {
            // hay ambas fechas
            if (fechaCassette >= fechaInicio && fechaCassette <= fechaFin) {
                cassettesfilter.push(cassette);
            }
        }
    });

    mostrar_cassettes(cassettesfilter);
};


fecha_inicio.addEventListener("change", filtrarCassettesporFecha);
fecha_fin.addEventListener("change", filtrarCassettesporFecha);


fecha_inicio.addEventListener("change", filtrarCassettesporFecha);
fecha_fin.addEventListener("change", filtrarCassettesporFecha);

//funcion para modificar cassette
const modificarCassette = async () => {
    try {
        // Validar que todos los campos tengan valor
        if (
            !modificar_descripcion_cassette.value ||
            !modificar_fecha_cassette.value ||
            !organos.value ||
            !modificar_caracteristicas_cassette.value ||
            !modificar_observaciones_cassette.value ||
            !modificar_identificador_cassette.value
        ) {
            if (cerrarModalModificarCassete) {
                cerrarModalModificarCassete.click();
            }
            mensaje.textContent = "Todos los campos son obligatorios.";
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload()
            }, 2000);
            return; // Detener la ejecución si hay campos vacíos
        }

        const response = await fetch(`http://localhost:3000/sanitaria/cassette/edit/${cassetteActual.id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                descripcion: modificar_descripcion_cassette.value,
                fecha: modificar_fecha_cassette.value,
                organo: organos.value,
                caracteristicas: modificar_caracteristicas_cassette.value,
                observaciones: modificar_observaciones_cassette.value,
                idOrgano: modificar_identificador_cassette.value,
            })
        });

        const data = await response.json();

        if (data.ok) {
            if (cerrarModalModificarCassete) {
                cerrarModalModificarCassete.click();
            }

            mensaje.textContent = "Cassette modificado con éxito";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 2000);
        } else {
            if (cerrarModalModificarCassete) {
                cerrarModalModificarCassete.click();
            }
            mensaje.textContent = "Cassette modificado con éxito";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 2000);
        }

    } catch (error) {
        console.error("Error al modificar el cassette:", error);
    }
};


//funcion para mostrar el boton admin a los admins
cargarBotonAdmin = async () => {
    const id_user = sessionStorage.getItem("user_id");

    const response = await fetch("http://localhost:3000/sanitaria/users", {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
        }
    });

    const data = await response.json();
    data.forEach(user => {
        if (id_user == user.id) {
            if (user.rol == "administrador") {
                console.log("es admin");
                let button = document.createElement("a");
                button.textContent = "Ir al panel de control";
                button.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded" , "text-center");

                button.href = "./admin.html";
                BoxFilters.appendChild(button);
                BoxFilters.classList.remove("md:grid-cols-5");
                BoxFilters.classList.add("md:grid-cols-6");
                
            }
        }
    });
};


organoSelect.addEventListener("change", filtrarCassettesporOrgano);
idOrganoSelect.addEventListener("change", filtrarCassettesporID);
nueva_muestra.addEventListener("click", () => {
crearMuestra(cassetteActual)
})
document.addEventListener("DOMContentLoaded", () => {
    cargarSelectID();
    cargarBotonAdmin();
});
const botonModificarCassette = document.getElementById("botonModificarCassette");
botonModificarCassette.addEventListener("click", modificarCassette)



//funcion para eliminar muestras
const EliminarMuestra = async () => {
    console.log(muestraSeleccionada.id);

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/muestra/delete/${muestraSeleccionada.id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `${token}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data.message);
        if (cerrarModalBasuraMuestra) {
            cerrarModalBasuraMuestra.click();
            cerrarModalMuestrasImagenes.click();
        }
        if (response.ok) {

            mensaje.textContent = "Muestra eliminado con éxito";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 2000);
        } else {
            mensaje.textContent = "Error al eliminar la muestra: " + data.message;
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        }
    } catch (error) {
        console.error("Error al eliminar la muestra:", error);
        mensaje.textContent = "Ocurrió un error al eliminar la muestra.";
        mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2000);
    }

};

const borrarMuestra = document.getElementById("borrarMuestra");
borrarMuestra.addEventListener("click", EliminarMuestra);



//funcion para modificar muestra
const modificarMuestra = async () => {
    try {
        // Validar que todos los campos tengan valores antes de hacer la petición
        if (
            !nuevaMuestra_desc.value ||
            !nuevaMuestra_fecha.value ||
            !nuevaMuestra_tincion.value ||
            !nuevaMuestra_observ.value ||
            !cassetteActual?.id ||
            !muestraSeleccionada?.id
        ) {
            if (cerrarModalModificarMuestra) {
                cerrarModalModificarMuestra.click();
            }
            if (cerrarModalMuestrasImagenes) {
                cerrarModalMuestrasImagenes.click();
            }
            mensaje.textContent = "Todos los campos son obligatorios.";
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
            return; // Detener ejecución si hay valores vacíos
        }

        console.log("Enviando datos al servidor...");

        const response = await fetch(`http://localhost:3000/sanitaria/muestra/edit/${muestraSeleccionada.id}`, {
            method: "PATCH",
            headers: {
                'Authorization': `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                descripcion: nuevaMuestra_desc.value,
                fecha: nuevaMuestra_fecha.value,
                tincion: nuevaMuestra_tincion.value,
                observaciones: nuevaMuestra_observ.value,
                cassette_id: cassetteActual.id,
            })
        });

        console.log("Respuesta recibida:", response);

        const data = await response.json();

        console.log("Datos del servidor:", data);

        if (response.ok) {
            console.log("Muestra modificada con éxito");

            if (cerrarModalModificarMuestra) {
                cerrarModalModificarMuestra.click();
            }
            if (cerrarModalMuestrasImagenes) {
                cerrarModalMuestrasImagenes.click();
            }

            mensaje.textContent = "Muestra modificada con éxito";
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
            }, 2000);
        } else {
            console.error("Error en la respuesta del servidor:", data.message);
            mensaje.textContent = "Error al modificar la muestra: " + (data.message || "Error desconocido");
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        }

    } catch (error) {
        console.error("Error al modificar la muestra:", error);
        mensaje.textContent = "Ocurrió un error al modificar la muestra.";
        mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
        mensaje.style.display = "block";

        setTimeout(() => {
            mensaje.style.display = "none";
        }, 2000);
    }
};


const botonModificarMuestra = document.getElementById("botonModificarMuestra");
botonModificarMuestra.addEventListener("click", modificarMuestra)


const btn_logout=document.getElementById("btn_logout");

//logout de la aplicación
const logout=(event)=>{
    console.log(event.target);
    location.href="/Front/src/index.html";
    sessionStorage.removeItem("user_id");
    localStorage.removeItem("token");
}


eliminarImagenGrande.addEventListener("click",eliminarImagenActual)
btn_logout.addEventListener("click", logout);
