document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('login_password');
  const passwordInput2 = document.getElementById('register_password');
  const passwordInput3 = document.getElementById('register_password_repeat');

  const togglePassword = document.getElementById('togglePassword');
  const togglePassword2 = document.getElementById('togglePassword2');
  const togglePassword3 = document.getElementById('togglePassword3');

  
  const iconEye = document.getElementById('icon_eye');
  const iconEye2 = document.getElementById('icon_eye2');
  const iconEye3 = document.getElementById('icon_eye3');


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