document.addEventListener('DOMContentLoaded', function () {
// Inputs de passwords
  const passwordInput = document.getElementById('login_password');
  const passwordInput2 = document.getElementById('register_password');
  const passwordInput3 = document.getElementById('register_password_repeat');

// Botones para vision de password
  const togglePassword = document.getElementById('togglePassword');
  const togglePassword2 = document.getElementById('togglePassword2');
  const togglePassword3 = document.getElementById('togglePassword3');

// Iconos vision de password index.html
  const iconEye = document.getElementById('icon_eye');
  const iconEye2 = document.getElementById('icon_eye2');
  const iconEye3 = document.getElementById('icon_eye3');

// Boton para vision de password del login de index
  togglePassword.addEventListener('click', function () {
      if (passwordInput.type === "password") {
          passwordInput.type = "text";
          
          iconEye.classList.remove('fa-eye');
          iconEye.classList.add('fa-eye-slash');
      } else {
          passwordInput.type = "password";

          iconEye.classList.remove('fa-eye-slash');
          iconEye.classList.add('fa-eye'); 
      }
  });

// Boton para vision del primer password del register de index
  togglePassword2.addEventListener('click', function () {
    if (passwordInput2.type === "password") {
        passwordInput2.type = "text";
        
        iconEye2.classList.remove('fa-eye');
        iconEye2.classList.add('fa-eye-slash');
    } else {
        passwordInput2.type = "password";

        iconEye2.classList.remove('fa-eye-slash');
        iconEye2.classList.add('fa-eye'); 
    }
});
// Boton para vision del segundo password del register de index
togglePassword3.addEventListener('click', function () {
    if (passwordInput3.type === "password") {
        passwordInput3.type = "text";
        
        iconEye3.classList.remove('fa-eye');
        iconEye3.classList.add('fa-eye-slash');
    } else {
        passwordInput3.type = "password";

        iconEye3.classList.remove('fa-eye-slash');
        iconEye3.classList.add('fa-eye'); 
    }
});
});