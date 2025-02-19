const btn_modificar=document.getElementById("btn_modificar");
const btn_eliminar=document.getElementById("btn_eliminar");
const btn_eliminar_todos=document.getElementById("btn_eliminar_todos");

const modalModificarUsuario=document.getElementById("modalModificarUsuario");
const cerrarModalModificarUsuario=document.getElementById("cerrarModalModificarUsuario");

const modalEliminarUsuario=document.getElementById("modalEliminarUsuario");
const cerrarModalEliminarUsuario=document.getElementById("cerrarModalEliminarUsuario");

const id_usuario_modificar=document.getElementById("id_usuario_modificar");

const modificar_alumno_nombre=document.getElementById("modificar_alumno_nombre");
const modificar_alumno_apellidos=document.getElementById("modificar_alumno_apellidos");
const modificar_alumno_gmail=document.getElementById("modificar_alumno_gmail");
const modificar_alumno_password=document.getElementById("modificar_alumno_password");
const modificar_alumno_centro=document.getElementById("modificar_alumno_centro");
const modificar_alumno_rol=document.getElementById("modificar_alumno_rol");

btn_modificar.addEventListener("click", (event)=>{
    modalModificarUsuario.classList.remove("hidden");
    mostrarDatosUsuario();
})
cerrarModalModificarUsuario.addEventListener("click", ()=>{
    modalModificarUsuario.classList.add("hidden");
})

btn_eliminar.addEventListener("click", ()=>{
    modalEliminarUsuario.classList.remove("hidden");
})
cerrarModalEliminarUsuario.addEventListener("click", ()=>{
    modalEliminarUsuario.classList.add("hidden");
})

const volver_inicio=document.getElementById("volver_inicio");
volver_inicio.addEventListener("click", ()=>{
    window.location.href="aplicacion.html";
})


const token = localStorage.getItem('token')

const mostrarDatosUsuario=async()=>{
    const response = await fetch(`http://localhost:3000/sanitaria/users/${user.id}`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
        }
    });
    const user = await response.json();
    console.log(user);

    modificar_alumno_nombre.value=user.nombre;
    modificar_alumno_apellidos.value=user.apellido;
    modificar_alumno_gmail.value=user.email;
    modificar_alumno_centro.value=user.centro;
    modificar_alumno_rol.value=user.rol;
}

const eliminar_usuarios = document.getElementById("eliminar_usuarios");

const eliminarUsuarios = async()=>{
    const response = await fetch(`http://localhost:3000/sanitaria/users/delete`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
        }
    });
    const user = await response.json();
    
}


const modificar_usuario = document.getElementById("modificar_usuario");

const modificarUsuarios = async()=>{
    const response = await fetch(`http://localhost:3000/sanitaria/users/edit/${usuario.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: modificar_alumno_nombre.value,
            apellido: modificar_alumno_apellidos.value,
            email: modificar_alumno_gmail.value,
            password: modificar_alumno_password.value,
            centro: modificar_alumno_centro.value,
        })
    });
    const user = await response.json();
    
}


const eliminar_usuario = document.getElementById("eliminar_usuario");

const eliminarUsuario = async()=>{
    const response = await fetch(`http://localhost:3000/sanitaria/users/delete/${usuario.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${token}`,
            "Content-Type": "application/json",
        }
    });
    const user = await response.json();
}
