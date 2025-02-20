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

const token = localStorage.getItem('token')

const mostrarDatosUsuario=async()=>{
    const response = await fetch(`http://localhost:3000/sanitaria/users/${id_usuario_modificar.textContent}`, {
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