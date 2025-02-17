// Elementos del form de nueva contraseña
const container_new_password = document.getElementById("container_new_password");
const form_new_password = document.getElementById("form_new_password");
const new_password = document.getElementById("new_password");
const new_password_repeat = document.getElementById("new_password_repeat");
// Mensajes de error Registro
const new_password_repeat_error = document.getElementById("new_password_repeat_error");

const modal_confirmacion_cambioContrasena=document.getElementById("modal_confirmacion_cambioContrasena");


// Funcion para modificar contraseña
const new_password_function = (event) => {
    event.preventDefault();
  
    if (validate_new_password() == true) {
      changePassword();
    }
  };
  // Funcion validar la solicitud de contraseña
  const validate_new_password = () => {
    let valid = true;
  
    // Validacion de password
    if (new_password_repeat.validity.valueMissing) {
      console.log("hola");
      new_password_repeat_error.textContent =
        "El campo contraseña es obligatorio.";
      valid = false;
    } else if (new_password_repeat.validity.tooShort) {
      new_password_repeat_error.textContent =
        "La longitud de la contraseña debe ser mayor o igual a 8.";
      valid = false;
    } else if (new_password_repeat.validity.patternMismatch) {
      new_password_repeat_error.textContent =
        "Formato de la contraseña incorrecto.";
      valid = false;
    } else if (new_password_repeat.value != new_password.value) {
      new_password_repeat_error.textContent =
        "Las contraseñas deben de coincidir.";
      valid = false;
    } else {
      new_password_repeat_error.textContent = "";
    }
  
    return valid;
  };

  const changePassword = async () => {
    if(new_password_repeat.value==new_password.value){
      const data = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: new_password.value,
        }),
      };
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      console.log(token)
      const response = await fetch(`http://localhost:3000/sanitaria/users/reset-password/${token}`,data);
      const dataFetch = await response.json();

      if(dataFetch.message){
        //ABRIR MODAL DICIENDO QUE SE TE HA CAMBIADO LA PW Y REDIRECCIONAR AL LOGIN
        container_new_password.classList.remove("display_on");
        container_new_password.classList.add("display_off");
        modal_confirmacion_cambioContrasena.classList.remove("display_off");
        modal_confirmacion_cambioContrasena.classList.remove("opacity-0");
        modal_confirmacion_cambioContrasena.classList.add("display_on");
      }else {
        //DISPLAYEAR MENSAJE DE ERROR
        new_password_repeat_error.textContent="Error al actualizar contraseña";
      }
    };
    }

form_new_password.addEventListener("submit", new_password_function);