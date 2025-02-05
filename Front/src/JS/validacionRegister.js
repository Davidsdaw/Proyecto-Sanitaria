// Elementos del Login
const form_login = document.getElementById("form_login");
const login_email = document.getElementById("form_login");
const login_password = document.getElementById("login_password");
// Mensajes de error Login
const login_email_error = document.getElementById("login_email_error");
const login_password_error = document.getElementById("login_password_error");

// Elementos del Solicitar Contraseña
const form_password = document.getElementById("form_password");
const email_recuperar_contrasena = document.getElementById("email_recuperar_contrasena");
// Mensajes de error Solicitar Contraseña
const solicitar_email_error = document.solicitar_email_error("email_recuperar_contrasena");

// Elementos del Register
const form_register = document.getElementById("form_register");
const register_nombre = document.getElementById("register_nombre");
const register_apellidos = document.getElementById("register_apellidos");
const register_centro = document.getElementById("register_centro");
const register_email = document.getElementById("register_email");
const register_password = document.getElementById("register_password");
const register_password_repeat = document.getElementById("register_password_repeat");
// Mensajes de error Registro
const form_register_error = document.getElementById("form_register_error");
const register_nombre_error = document.getElementById("register_nombre_error");
const register_apellidos_error = document.getElementById("register_apellidos_error");
const register_centro_error = document.getElementById("register_centro_error");
const register_email_error = document.getElementById("register_email_error");
const register_password_error = document.getElementById("register_password_error");
const register_password_repeat_error = document.getElementById("register_password_repeat_error");

form_register.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();
  let valid = true;
  valid = valid && validateNombre(nombreInput);
  valid = valid && validateApellidos(apellidosInput);
  valid = valid && validateCentro(centroInput);
  valid = valid && validateEmail(emailInput);
  valid = valid && validatePassword(passwordInput);
  valid = valid && validatePasswordRepeat(passwordInput, passwordRepeatInput);
  if (valid) {
    formRegister.submit();
  }
});

function validateNombre(input) {
  if (!input.value.trim()) {
    showError(input, "El nombre es obligatorio.");
    return false;
  }
  return true;
}

function validateApellidos(input) {
  if (!input.value.trim()) {
    showError(input, "Los apellidos son obligatorios.");
    return false;
  }
  return true;
}

function validateCentro(input) {
  if (!input.value) {
    showError(input, "Debes seleccionar un centro.");
    return false;
  }
  return true;
}

function validateEmail(input) {
  const emailValue = input.value.trim();
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!re.test(emailValue)) {
    showError(input, "Ingresa un correo válido.");
    return false;
  }
  return true;
}

function validatePassword(input) {
  const passwordValue = input.value.trim();
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  if (!re.test(passwordValue)) {
    showError(input, "Ingrese una contraseña correcta.");
    return false;
  }
  return true;
}

function validatePasswordRepeat(passwordInput, repeatInput) {
  if (passwordInput.value.trim() !== repeatInput.value.trim()) {
    showError(repeatInput, "Las contraseñas no coinciden.");
    return false;
  }
  return true;
}

function showError(input, message) {
  // Crear y agregar el mensaje de error debajo del input
  const errorElement = document.createElement("p");
  errorElement.innerHTML = message;
  errorElement.classList.add("text-red-500", "text-sm");
  input.parentElement.appendChild(errorElement);
}

function clearErrors() {
  // Eliminar los mensajes de error previos
  const errorMessages = formRegister.querySelectorAll(".text-red-500");
  errorMessages.forEach(function (errorMessage) {
    errorMessage.remove();
  });
}
