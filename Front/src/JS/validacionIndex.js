// Elementos del Login
const form_login = document.getElementById("form_login");
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
// Mensajes de error Login
const login_email_error = document.getElementById("login_email_error");
const login_password_error = document.getElementById("login_password_error");

// Elementos del Solicitar Contraseña
const form_password = document.getElementById("form_password");
const solicitar_email = document.getElementById(
  "solicitar_email"
);
// Mensajes de error Solicitar Contraseña
const solicitar_email_error = document.getElementById("solicitar_email_error");

// Elementos del Register
const form_register = document.getElementById("form_register");
const register_nombre = document.getElementById("register_nombre");
const register_apellidos = document.getElementById("register_apellidos");
const register_centro = document.getElementById("register_centro");
const register_email = document.getElementById("register_email");
const register_password = document.getElementById("register_password");
const register_password_repeat = document.getElementById(
  "register_password_repeat"
);
// Mensajes de error Registro
const register_nombre_error = document.getElementById("register_nombre_error");
const register_apellidos_error = document.getElementById(
  "register_apellidos_error"
);
const register_centro_error = document.getElementById("register_centro_error");
const register_email_error = document.getElementById("register_email_error");
const register_password_repeat_error = document.getElementById(
  "register_password_repeat_error"
);

/////////////////////////////////////////////////////////////////////////
//Funcion Login
const login = (event) => {
  event.preventDefault();

  if (validate_login() == true) {
    console.log("Has iniciado sesión correctamente.");
  }
};
//Funcion validar login
const validate_login = () => {
  let valid = true;

  // Validacion de Email
  if (login_email.validity.valueMissing) {
    login_email_error.textContent = "El campo email es obligatorio.";
    valid = false;
  } else if (login_email.validity.typeMismatch) {
    login_email_error.textContent = "El formato del email no es válido.";
    valid = false;
  } else {
    login_email_error.textContent = "";
  }

  // Validacion de password
  if (login_password.validity.valueMissing) {
    console.log("hola");
    login_password_error.textContent = "El campo contraseña es obligatorio.";
    valid = false;
  } else if (login_password.validity.tooShort) {
    login_password_error.textContent =
      "La longitud de la contraseña debe ser mayor o igual a 8.";
    valid = false;
  } else if (login_password.validity.patternMismatch) {
    login_password_error.textContent = "Formato de la contraseña incorrecto.";
    valid = false;
  } else {
    login_password_error.textContent = "";
  }

  return valid;
};
// Funcion de registro
const register = (event) => {
  event.preventDefault();

  if (validate_register() == true) {
    console.log("Te has registrado correctamente.");
  }
};
// Funcion validar el registro
const validate_register = () => {
  let valid = true;

  // Validacion de Nombre
  if (register_nombre.validity.valueMissing) {
    register_nombre_error.textContent = "El campo nombre es obligatorio.";
    valid = false;
  } else {
    register_nombre_error.textContent = "";
  }

  // Validacion de Apellidos
  if (register_apellidos.validity.valueMissing) {
    register_apellidos_error.textContent = "El campo apellidos es obligatorio.";
    valid = false;
  } else {
    register_apellidos_error.textContent = "";
  }

  // Validacion de Centro
  if (register_centro.validity.valueMissing) {
    register_centro_error.textContent = "El campo centro es obligatorio.";
    valid = false;
  } else {
    register_centro_error.textContent = "";
  }

  // Validacion de Email
  if (register_email.validity.valueMissing) {
    register_email_error.textContent = "El campo email es obligatorio.";
    valid = false;
  } else if (register_email.validity.typeMismatch) {
    register_email_error.textContent = "El formato del email no es válido.";
    valid = false;
  } else {
    register_email_error.textContent = "";
  }

  // Validacion de password
  if (register_password.validity.valueMissing) {
    console.log("hola");
    register_password_repeat_error.textContent =
      "El campo contraseña es obligatorio.";
    valid = false;
  } else if (register_password.validity.tooShort) {
    register_password_repeat_error.textContent =
      "La longitud de la contraseña debe ser mayor o igual a 8.";
    valid = false;
  } else if (register_password.validity.patternMismatch) {
    register_password_repeat_error.textContent =
      "Formato de la contraseña incorrecto.";
    valid = false;
  } else if (register_password.value != register_password_repeat.value) {
    register_password_repeat_error.textContent =
      "Las contraseñas deben de coincidir.";
    valid = false;
  } else {
    register_password_repeat_error.textContent = "";
  }

  return valid;
};
// Funcion de solicitar contraseña
const password = (event) => {
  event.preventDefault();

  if (validate_password() == true) {
    console.log("Has solicitado la contraseña correctamente.");
  }
};
// Funcion validar la solicitud de contraseña
const validate_password = () => {
  let valid = true;

  // Validacion de Email
  if (solicitar_email.validity.valueMissing) {
    solicitar_email_error.textContent = "El campo email es obligatorio.";
    valid = false;
  } else if (solicitar_email.validity.typeMismatch) {
    solicitar_email_error.textContent = "El formato del email no es válido.";
    valid = false;
  } else {
    solicitar_email_error.textContent = "";
  }

  return valid;
};

form_login.addEventListener("submit", login);
form_register.addEventListener("submit", register);
form_password.addEventListener("submit", password);