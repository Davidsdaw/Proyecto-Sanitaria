// Elementos del form de nueva contraseña
const form_new_password = document.getElementById("form_new_password");
const new_password = document.getElementById("new_password");
const new_password_repeat = document.getElementById("new_password_repeat");
// Mensajes de error Registro
const new_password_repeat_error = document.getElementById("new_password_repeat_error");


// Funcion para modificar contraseña
const new_password_function = (event) => {
    event.preventDefault();
  
    if (validate_new_password() == true) {
      console.log("Has modificado la contraseña correctamente.");
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

form_new_password.addEventListener("submit", new_password_function);