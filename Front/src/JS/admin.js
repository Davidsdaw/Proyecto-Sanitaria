// Obtener el token guardado
const token = localStorage.getItem("token");
const cerrarModalModificarUsuario=document.getElementById("cerrarModalModificarUsuario");
const cerrarModalEliminarUsuario=document.getElementById("cerrarModalEliminarUsuario");
const modalModificarUsuario=document.getElementById("modalModificarUsuario");
const modalEliminarUsuario=document.getElementById("modalEliminarUsuario");
const eliminar_usuario=document.getElementById("eliminar_usuario");
const volver_inicio=document.getElementById("volver_inicio")

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
    
    // try {
    //     const response = await fetch(`http://localhost:3000/sanitaria/users/${id}`, {
    //         method: "GET",
    //         headers: {
    //             Authorization: `${token}`,
    //         },
    //     });

    //     const usuarios = await response.json();
    //     if(usuarios.rol=="alumno"){
    //         window.location.href="aplicacion.html";
    //     }
    // } catch (error) {
    //     console.error("Error al cargar usuarios:", error);
    // }
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
// Función para modificar usuario
const modificarUsuarios = async () => {
    const userId = document.getElementById("id_usuario_modificar").textContent;

    try {
        await fetch(`http://localhost:3000/sanitaria/users/edit/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: document.getElementById("modificar_alumno_nombre").value,
                apellido: document.getElementById("modificar_alumno_apellidos").value,
                email: document.getElementById("modificar_alumno_gmail").value,
                password: document.getElementById("modificar_alumno_password").value,
                centro: document.getElementById("modificar_alumno_centro").value,
                rol: document.getElementById("modificar_alumno_rol").value,
            })
        });

        // Cerrar modal y recargar tabla
        document.getElementById("modalModificarUsuario").classList.add("hidden");
        cargarUsuarios();
    } catch (error) {
        console.error("Error al modificar usuario:", error);
    }
};

// Función para eliminar usuario
const eliminarUsuario = async (userId) => {
    // if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
    document.getElementById("modalEliminarUsuario").classList.remove("hidden");
    eliminar_usuario.addEventListener("click" , async() => {
        try {
            await fetch(`http://localhost:3000/sanitaria/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${token}`,
                },
            });
            document.getElementById("modalEliminarUsuario").classList.add("hidden");
            cargarUsuarios();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    })

};
volver_inicio.addEventListener("click", ()=>{
    window.location.href="aplicacion.html";
})
modificar_usuario.addEventListener("click",modificarUsuarios)
document.addEventListener("DOMContentLoaded", cargarUsuarios);