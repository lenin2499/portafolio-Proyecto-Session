'use strict'

var input=  document.getElementById('txtTelefono');
input.addEventListener('input',function(){
  if (this.value.length > 10) 
     this.value = this.value.slice(0,10); 
})

var btnRe = document.getElementById('btn-re');
var btnLo = document.getElementById('btn-lo');
var contenedorRegister = document.getElementById('cont-register');
var contenedorLoguear = document.getElementById('cont-login');

btnRe.addEventListener("click", cambiarVentanaR);
btnLo.addEventListener("click", cambiarVentanaL);

function cambiarVentanaR() {
    contenedorRegister.style.display = 'block';
    contenedorLoguear.style.display = 'none';
    limpiarCampos();
}

function cambiarVentanaL() {
    contenedorRegister.style.display = 'none';
    contenedorLoguear.style.display = 'block';
    limpiarCampos();
}

// Enviar formulario con ajax por metodo POST
var formReg = document.getElementById('fomr-register');
formReg.onsubmit = evento => {

    var frmR = new FormData(formReg);
    const http = new XMLHttpRequest();
    var url = "./php/registrar.php";
    evento.preventDefault();

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var respuesta = JSON.parse(this.responseText);
            var menaajeErrorReg = document.getElementById('mensaje-error-R');
            // console.log(respuesta);

            if(respuesta.estado == '1') {
                alert("Datos almacenados");
                limpiarCampos();

            } else if(respuesta.estado == '2') {
                menaajeErrorReg.style.display = 'block';
                menaajeErrorReg.innerHTML = "Este correo electronico ya existe, agregue otro correo por favor.";

            } else if(respuesta.estado == '3') {
                menaajeErrorReg.style.display = 'block';
                menaajeErrorReg.innerHTML = "Solo se permite letras en los campos de nombre y apellidos.";

            } else if(respuesta.estado == '4') {
                menaajeErrorReg.style.display = 'block';
                menaajeErrorReg.innerHTML = "Ocurrio un error al guardar los datos.";

            } else if(respuesta.estado == '5') {
                menaajeErrorReg.style.display = 'block';
                menaajeErrorReg.innerHTML = "Solo se permite letras y numeros en el campo contraseña.";
            } else {
                menaajeErrorReg.style.display = 'block';
                menaajeErrorReg.innerHTML = "Llene todos los campos vacíos";
            }
        }
    }

    http.open("POST", url, true);
    http.send(frmR);
}

var formLogin = document.getElementById('form-login');
formLogin.onsubmit = evento => {

    var frmL = new FormData(formLogin);
    const http = new XMLHttpRequest();
    const url = "./php/loguear.php";
    evento.preventDefault();

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var respuesta = JSON.parse(this.responseText);
            var menaajeErrorLog = document.getElementById('mensaje-error-L');
            // console.log(respuesta);

            if(respuesta.estado == '1') {
                alert("Datos Correctos, redireccionando a otra página..");
                window.location.href = "./html/inicio.html";
                limpiarCampos();

            } else if(respuesta.estado == '2') {
                menaajeErrorLog.style.display = 'block';
                menaajeErrorLog.innerHTML = "Ocurrio un problema al buscar el email y contraseña.";

            } else if(respuesta.estado == '3') {
                menaajeErrorLog.style.display = 'block';
                menaajeErrorLog.innerHTML = "Email y contraseña incorrectas.";

            } else {
                menaajeErrorLog.style.display = 'block';
                menaajeErrorLog.innerHTML = "Email y contraseña no existe, por favor valla a registrarse para iniciar sesión.";
            }
        }
    }

    http.open("POST", url, true);
    http.send(frmL);
}

function limpiarCampos() {
    var menaajeErrorReg = document.getElementById('mensaje-error-R');
    var menaajeErrorLog = document.getElementById('mensaje-error-L');
    var txtNombre = document.getElementById('txtNombre');
    var txtApellido = document.getElementById('txtApellido');
    var txtCorreo = document.getElementById('txtCorreo');
    var txtTelefono = document.getElementById('txtTelefono');
    var txtPassword1 = document.getElementById('txtPassword1');
    var txtEmail = document.getElementById('txtEmail');
    var txtPassword2 = document.getElementById('txtPassword2');

    menaajeErrorReg.style.display = 'none';
    menaajeErrorLog.style.display = 'none';
    txtNombre.value = "";
    txtApellido.value = "";
    txtCorreo.value = "";
    txtTelefono.value = "";
    txtPassword1.value = "";
    txtEmail.value = "";
    txtPassword2.value = "";
}