document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('password_login');
  const togglePassword = document.getElementById('togglePassword');
  const iconEye = document.getElementById('icon_eye');

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
});