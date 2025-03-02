// Container principales de formularios
const container_login = document.getElementById("container_login");
const container_password = document.getElementById("container_password");
const container_register = document.getElementById("container_register");
// Botones que cargaran funciones de estilo como animaciones
const mostrar_register = document.getElementById("mostrar_register");
const mostrar_login_register = document.getElementById(
  "mostrar_login_register"
);
const mostrar_login_password = document.getElementById(
  "mostrar_login_password"
);
const mostrar_password_forgotten = document.getElementById(
  "mostrar_password_forgotten"
);
// Nav desplegable y el boton para desplegarlo
const nav_button = document.getElementById("nav_button");
const nav_list = document.getElementById("nav_list");

// Mostrar de login a register o viceversa
const mostrar_register_login_function = () => {
  container_login.classList.toggle("display_on");
  container_login.classList.toggle("display_off");
  container_register.classList.toggle("display_off");
  container_register.classList.toggle("display_on");
  container_register.classList.remove("opacity-0");
};
// Mostrar de login a solicitar password o viceversa
const mostrar_password_login_function = () => {
  container_login.classList.toggle("display_on");
  container_login.classList.toggle("display_off");
  container_password.classList.toggle("display_off");
  container_password.classList.toggle("display_on");
  container_password.classList.remove("opacity-0");
};
// Mostrar nav desplegable o ocultarlo
const mostrar_nav_list = () => {
  nav_list.classList.remove("hidden");
  nav_list.classList.toggle("show_off_nav_list");
  nav_list.classList.toggle("show_nav_list");
};

// Listeners
mostrar_register.addEventListener("click", mostrar_register_login_function);
mostrar_login_register.addEventListener("click", mostrar_register_login_function);
mostrar_login_password.addEventListener("click", mostrar_password_login_function);
mostrar_password_forgotten.addEventListener("click", mostrar_password_login_function);
nav_button.addEventListener("click", mostrar_nav_list)
nav_list_button.addEventListener("click", mostrar_nav_list)