// Elementos del Login
const form_login = document.getElementById("form_login");
const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
// Mensajes de error Login
const login_email_error = document.getElementById("login_email_error");
const login_password_error = document.getElementById("login_password_error");
const login_session_error = document.getElementById("login_session_error");

// Elementos del Solicitar Contraseña
const form_password = document.getElementById("form_password");
const solicitar_email = document.getElementById("solicitar_email");

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
const register_session_error = document.getElementById(
  "register_session_error"
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
// Containers de modales de confirmacion
const modal_confirmacion_registro=document.getElementById("modal_confirmacion_registro");
const modal_confirmacion_email=document.getElementById("modal_confirmacion_email");


/////////////////////////////////////////////////////////////////////////
//Funcion Login
const login = (event) => {
  event.preventDefault();

  if (validate_login()) {
    validate_user();
    };
};
// Validacion de user con BD
const validate_user = async () => {
  let email = login_email.value.trim();
  let password = login_password.value.trim();

  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  }
  const response = await fetch("http://localhost:3000/sanitaria/users/login",data);
  const data2 = await response.json();

  if (data2.success) {
    console.log(data2.success);
    localStorage.setItem("token", data2.success);
    sessionStorage.setItem("user_id", data2.id);
    location.href = "/Front/src/pages/aplicacion.html";
  } else {
    login_session_error.textContent = "Email o contraseña incorrectos";
  }

    
  };

//Funcion validar login con validityState
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
const register = async (event) => {
  event.preventDefault();

  if (validate_register() == true) {
    if ((register_password.value = register_password_repeat.value)) {
      register_user();
    }
  }
};
// Funcion de registro de usuario a la BD
const register_user = async () => {
  let nombre = register_nombre.value.trim();
  let apellido = register_apellidos.value.trim();
  let centro = register_centro.value.trim();
  let email = register_email.value.trim();
  let password = register_password.value.trim();
  
  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password,
      centro: centro,
      rol: "alumno",
    }),
  };

  const response = await fetch("http://localhost:3000/sanitaria/users/register",data);

  const data2 = await response.json();

  if (data2.error) {
    // FALTA EL FRONT DE REGISTER_SESSION_ERROR 
    register_session_error.textContent = data2.error;
    // register_session_error.textContent = "Registro Fallido";
  } else {
    //HAY QUE HACER MODAL EN EL INDEX CON UN MENSAJE DE QUE HAS CREADO LA CUENTA CON UN BOTON PARA ACEPTAR
    //Y QUE CUANDO ACEPTES TE MUEVA AL LOGIN 
    container_register.classList.remove("display_on");
    container_register.classList.add("display_off");
    modal_confirmacion_registro.classList.remove("display_off");
    modal_confirmacion_registro.classList.remove("opacity-0");
    modal_confirmacion_registro.classList.add("display_on");
  }
};

// Funcion validar el registro con validityState
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
    register_password_repeat_error.textContent ="El campo contraseña es obligatorio.";
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

// Funcion de solicitar contraseña al correo
const password = (event) => {
  event.preventDefault();

  if (validateEmail() == true) {
    sendRecoveryEmail(solicitar_email.value);
  }
};
// Funcion para enviar email y resetear la password
const sendRecoveryEmail = async(email) => {

  const data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  };

  const response = await fetch("http://localhost:3000/sanitaria/users/forgot-password",data);
  const dataResponse = await response.json();
  console.log(dataResponse)
  if(dataResponse.message){
    //ABRIR MODAL DICIENDO QUE SE TE HA ENVIADO UN CORREO Y REDIRECCIONAR AL LOGIN
    container_password.classList.remove("display_on");
    container_password.classList.add("display_off");
    modal_confirmacion_email.classList.remove("display_off");
    modal_confirmacion_email.classList.remove("opacity-0");
    modal_confirmacion_email.classList.add("display_on");
  } else {
    //DISPLAYEAR MENSAJE DE ERROR
    solicitar_email_error.textContent="Error al enviar email.";
  }
}

// Funcion validar la solicitud de contraseña con validityState
const validateEmail = () => {
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

// AddEventListeners usados
form_login.addEventListener("submit", login);
form_register.addEventListener("submit", register);
form_password.addEventListener("submit", password);
