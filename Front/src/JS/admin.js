// Obtener el token guardado
const token = localStorage.getItem("token");
const cerrarModalModificarUsuario=document.getElementById("cerrarModalModificarUsuario");
const cerrarModalEliminarUsuario=document.getElementById("cerrarModalEliminarUsuario");
const modalModificarUsuario=document.getElementById("modalModificarUsuario");
const modalEliminarUsuario=document.getElementById("modalEliminarUsuario");
const eliminar_usuario=document.getElementById("eliminar_usuario");
const volver_inicio=document.getElementById("volver_inicio")
const eliminar_usuarios=document.getElementById("eliminar_usuarios")

cerrarModalModificarUsuario.addEventListener("click", ()=>{
    modalModificarUsuario.classList.add("hidden");
})
cerrarModalEliminarUsuario.addEventListener("click", ()=>{
    modalEliminarUsuario.classList.add("hidden");
})
const id = sessionStorage.getItem("user_id");
// Cargar usuarios al iniciar


// Función para cargar usuarios y mostrarlos en la tabla
const cargarUsuarios = async () => {
    if(!sessionStorage.getItem("user_id")){
        location.href="../index.html"
    }
    
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/users/${id}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
        });

        const usuarios = await response.json();
        if(usuarios.rol=="alumno"){
            window.location.href="aplicacion.html";
        }
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
    try {
        const response = await fetch("http://localhost:3000/sanitaria/users/", {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
        });

        const usuarios = await response.json();
        console.log(usuarios)
        mostrarUsuarios(usuarios);
    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
};

// Mostrar usuarios en la tabla
const mostrarUsuarios = (usuarios) => {
    const tabla = document.getElementById("tabla_usuarios");
    tabla.innerHTML = "";

    if (usuarios.length <= 1) {
        tabla.innerHTML = `
            <tr>
                <td colspan="8" class="text-red-500 border border-blue-300 px-4 py-2 text-center">
                    No se ha encontrado ningún usuario
                </td>
            </tr>
        `;
        return;
    }

    usuarios.forEach((usuario) => {
        if(usuario.id != id){
            const fila = document.createElement("tr");
            fila.classList.add("hover:bg-gray-100");
    
            fila.innerHTML = `
                <td class="border border-blue-300 px-4 py-2 text-blue-500">${usuario.id}</td>
                <td class="border border-blue-300 px-4 py-2 text-blue-500">${usuario.nombre}</td>
                <td class="border border-blue-300 px-4 py-2 text-blue-500">${usuario.apellido}</td>
                <td class="border border-blue-300 px-4 py-2 text-blue-500">${usuario.email}</td>
                <td class="border border-blue-300 px-4 py-2 text-blue-500">${usuario.centro}</td>
                <td class="border border-blue-300 px-4 py-2 text-blue-500">${usuario.rol}</td>
                <td class="px-4 py-2 flex items-center justify-center space-x-2">
                    <button class="btn_modificar bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition" data-id="${usuario.id}">Modificar</button>
                    <button class="btn_eliminar bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;
    
            tabla.appendChild(fila);
        }

    });

    // Añadir eventos a los botones
    document.querySelectorAll(".btn_modificar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const userId = e.target.getAttribute("data-id");
            abrirModalModificar(userId);
        });
    });

    document.querySelectorAll(".btn_eliminar").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const userId = e.target.getAttribute("data-id");
            eliminarUsuario(userId);
        });
    });
};

// Función para abrir el modal y cargar datos del usuario
const abrirModalModificar = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/sanitaria/users/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `${token}`,
            },
        });

        const usuario = await response.json();

        // Cargar datos al modal
        document.getElementById("modificar_alumno_nombre").value = usuario.nombre;
        document.getElementById("modificar_alumno_apellidos").value = usuario.apellido;
        document.getElementById("modificar_alumno_gmail").value = usuario.email;
        document.getElementById("modificar_alumno_centro").value = usuario.centro;
        document.getElementById("modificar_alumno_rol").value = usuario.rol;
        document.getElementById("id_usuario_modificar").textContent = usuario.id;

        // Mostrar modal
        document.getElementById("modalModificarUsuario").classList.remove("hidden");
    } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
    }
};

const modificar_usuario = document.getElementById("modificar_usuario")
const modificar_alumno_nombre= document.getElementById("modificar_alumno_nombre")
const modificar_alumno_apellidos= document.getElementById("modificar_alumno_apellidos")
const modificar_alumno_gmail=document.getElementById("modificar_alumno_gmail")
const modificar_alumno_password=document.getElementById("modificar_alumno_password")
const modificar_alumno_centro=document.getElementById("modificar_alumno_centro")
const modificar_alumno_rol=document.getElementById("modificar_alumno_rol")

// Función para modificar usuario
const modificarUsuarios = async () => {
    const userId = document.getElementById("id_usuario_modificar").textContent;
    const token = localStorage.getItem("token"); // Asegúrate de tener un token válido

    // Crear el objeto de actualización sin incluir la contraseña si el input está vacío
    const datosActualizar = {
        nombre: modificar_alumno_nombre?.value || "",
        apellido: modificar_alumno_apellidos?.value || "",
        email: modificar_alumno_gmail?.value || "",
        centro: modificar_alumno_centro?.value || "",
        rol: modificar_alumno_rol?.value || ""
    };

    // Solo agregar la contraseña si el input tiene un valor
    if (modificar_alumno_password?.value) {
        datosActualizar.password = modificar_alumno_password.value;
    }

    try {
        const response = await fetch(`http://localhost:3000/sanitaria/users/edit/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(datosActualizar),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || "Error desconocido"}`);
        }

        console.log("Usuario modificado correctamente");
        
        // Cerrar modal y recargar tabla
        document.getElementById("modalModificarUsuario").classList.add("hidden");
        cargarUsuarios();
    } catch (error) {
        console.error("Error al modificar usuario:", error);
        alert(`Error al modificar usuario: ${error.message}`);
    }
};


// Función para eliminar usuario
const eliminarUsuario = async (userId) => {
    document.getElementById("modalEliminarUsuario").classList.remove("hidden");

    eliminar_usuario.addEventListener("click", async () => {
        try {
            await fetch(`http://localhost:3000/sanitaria/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`, 
                },
            });

            
            if (cerrarModalEliminarUsuario) {
                cerrarModalEliminarUsuario.click();
            }

            const mensaje = document.getElementById("mensaje");
            mensaje.textContent = "Usuario eliminado con éxito.";
            mensaje.classList.remove("bg-red-500");
            mensaje.classList.add("bg-green-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                location.reload();
                cargarUsuarios();
            }, 2000);

        } catch (error) {
            console.error("Error al eliminar usuario:", error);

            const mensaje = document.getElementById("mensaje");
            mensaje.textContent = "Hubo un problema al intentar eliminar el usuario.";
            mensaje.classList.remove("bg-green-500");
            mensaje.classList.add("bg-red-500", "text-white", "p-2", "rounded", "text-center");
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
            }, 2000);
        }
    });
};

const eliminarTodos = async() => {
    if(confirm("¿ Deseas borrar todos los usuarios ?")){
        console.log(token)
        try {
            await fetch(`http://localhost:3000/sanitaria/users/delete`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                },
            });
    } catch (error) {
        console.error("Error al eliminar :", error);
    }
    window.location.href="../index.html";
}
}

eliminar_usuarios.addEventListener("click",eliminarTodos)
volver_inicio.addEventListener("click", ()=>{
    window.location.href="aplicacion.html";
})
modificar_usuario.addEventListener("click",modificarUsuarios)
document.addEventListener("DOMContentLoaded", cargarUsuarios);
