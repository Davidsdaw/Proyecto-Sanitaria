const container_login = document.getElementById("container_login");
const container_password = document.getElementById("container_password");
const container_register = document.getElementById("container_register");

const form_login = document.getElementById("form_login");
const form_register = document.getElementById("form_register");
const form_password = document.getElementById("form_password");

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

const mostrar_register_login_function = () => {
  container_login.classList.toggle("display_on");
  container_login.classList.toggle("display_off");
  container_register.classList.toggle("display_off");
  container_register.classList.toggle("display_on");
  container_register.classList.remove("opacity-0");
};
const mostrar_password_login_function = () => {
  container_login.classList.toggle("display_on");
  container_login.classList.toggle("display_off");
  container_password.classList.toggle("display_off");
  container_password.classList.toggle("display_on");
  container_password.classList.remove("opacity-0");
};

const display_hidden=(event)=>{
  if(event.target.classList=="display_off"){
    event.target.classList.add("display_hidden");
  }
}

mostrar_register.addEventListener("click", mostrar_register_login_function);
mostrar_login_register.addEventListener("click", mostrar_register_login_function);
mostrar_login_password.addEventListener("click", mostrar_password_login_function);
mostrar_password_forgotten.addEventListener("click", mostrar_password_login_function);
container_login.addEventListener("animationend", display_none);
container_register.addEventListener("animationend", display_none);
container_password.addEventListener("animationend", display_none);