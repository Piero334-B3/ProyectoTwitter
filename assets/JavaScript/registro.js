// Arreglo para almacenar cuentas registradas
const cuentasRegistradas = [];

// Recuperar cuenta solo si está registrada
function recuperarCuenta() {
    const email = document.getElementById("recuperarEmail").value;
    const cuenta = cuentasRegistradas.find(cuenta => cuenta.email === email);
    
    if (cuenta) {
        alert(`Enlace de recuperación enviado a: ${email}`);
        document.getElementById("modalRecuperacion").style.display = "none";
    } else {
        alert("Este correo no está registrado. Por favor, verifica o regístrate.");
    }
}

// Iniciar sesión y redirigir a main.html
function iniciarSesion() {
    alert("Iniciando sesión...");  // Agrega esta línea
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const cuenta = cuentasRegistradas.find(cuenta => cuenta.email === email && cuenta.password === password);
    
    if (cuenta) {
        window.location.href = "../../main.html";  // Redirige a main.html
    } else {
        alert("Correo o contraseña incorrectos. Por favor, intenta de nuevo.");
    }
}

console.log(cuentasRegistradas);  // Agrega esta línea para ver las cuentas

document.getElementById('registerButton').addEventListener('click', function() {
    const username = document.getElementById('usernameInput').value;
    const profileImage = document.getElementById('profileImageInput').value;  // Asumiendo que tienes un input para la imagen de perfil
    
    if (username && profileImage) {
        localStorage.setItem('username', username);
        localStorage.setItem('profileImage', profileImage);
    }
});


// Funciones para mostrar/ocultar contraseñas
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const passwordType = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", passwordType === "password" ? "text" : "password");
}

function toggleModalPassword() {
    const modalPasswordInput = document.getElementById("modalPassword");
    const passwordType = modalPasswordInput.getAttribute("type");
    modalPasswordInput.setAttribute("type", passwordType === "password" ? "text" : "password");
}

// Funciones para abrir y cerrar los modales
document.getElementById("recuperar-cuenta").addEventListener("click", function () {
    document.getElementById("modalRecuperacion").style.display = "block";
});

document.getElementById("closeRecuperacion").addEventListener("click", function () {
    document.getElementById("modalRecuperacion").style.display = "none";
});

document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modalRegistro").style.display = "none";
});

document.getElementById("closeDatos").addEventListener("click", function () {
    document.getElementById("modalDatosPersonales").style.display = "none";
});

document.getElementById("closeUsuario").addEventListener("click", function () {
    document.getElementById("modalUsuario").style.display = "none";
});

// Funciones para modales de registro
function registrarse() {
    document.getElementById("modalRegistro").style.display = "block";
}

function abrirModalDatosPersonales() {
    const password = document.getElementById("modalPassword").value;

    if (!password || password.length < 5) {
        alert("La contraseña es obligatoria y debe tener al menos 5 caracteres.");
        return;
    }

    document.getElementById("modalRegistro").style.display = "none";
    document.getElementById("modalDatosPersonales").style.display = "block";
}

function volverAlModalRegistro() {
    document.getElementById("modalDatosPersonales").style.display = "none";
    document.getElementById("modalRegistro").style.display = "block";
}

function validarEdad() {
    const fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    if (edad < 14) {
        alert("Debes tener al menos 14 años para registrarte.");
        return;
    }

    document.getElementById("modalDatosPersonales").style.display = "none";
    document.getElementById("modalUsuario").style.display = "block";
}

function volverAlModalDatosPersonales() {
    document.getElementById("modalUsuario").style.display = "none";
    document.getElementById("modalDatosPersonales").style.display = "block";
}

function finalizarRegistro() {
    const email = document.getElementById("modalEmail").value;
    const password = document.getElementById("modalPassword").value;
    const nombre = document.getElementById("modalNombre").value;
    const apellido = document.getElementById("modalApellido").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const username = document.getElementById("modalUsername").value;

    const profileImage = document.getElementById("profileImage").files[0];
    
    // Almacena los datos en la lista
    cuentasRegistradas.push({
        email,
        password,
        nombre,
        apellido,
        fechaNacimiento,
        username,
        profileImage
    });

    alert("Registro exitoso. ¡Bienvenido!");
    document.getElementById("modalUsuario").style.display = "none";
}
