document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('form_login');
    const formPassword = document.getElementById('form_password');
    
    const emailLoginInput = document.getElementById('email_login');
    const passwordLoginInput = document.getElementById('password_login');
    const emailPasswordInput = document.getElementById('email_recuperar-contrasena');

    const emailLoginError = document.getElementById('email_error');
    const passwordLoginError = document.getElementById('password_error');
    const emailPasswordError = document.getElementById('email_error_password');
    
    const mensajes = {
        emailInvalido: 'Ingresa un correo válido. <i class="fa-solid fa-circle-minus text-xm" style="color: #c52020;"></i>',
        passwordInvalida: 'Ingresa una contraseña correcta. <i class="fa-solid fa-circle-minus text-xm" style="color: #c52020;"></i>'
    };

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return re.test(password);
    }

    function validateForm(form, emailInput, passwordInput, emailError, passwordError) {
        let valido = true;

        const emailValue = emailInput.value.trim();
        if (!validateEmail(emailValue)) {
            valido = false;
            emailError.innerHTML = mensajes.emailInvalido;
        } else {
            
            emailError.textContent = '';
        }

        if (passwordInput) {
            const passwordValue = passwordInput.value.trim();
            if (!validatePassword(passwordValue)) {
                valido = false;
                passwordError.innerHTML = mensajes.passwordInvalida;
            } else {
                passwordError.textContent = '';
            }
        }

        if (valido) {
            form.submit();
        }
    }

    formLogin.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm(formLogin, emailLoginInput, passwordLoginInput, emailLoginError, passwordLoginError);
    });

    formPassword.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm(formPassword, emailPasswordInput, null, emailPasswordError, null);
    });
});
