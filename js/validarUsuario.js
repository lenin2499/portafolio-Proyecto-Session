'use strict'

window.addEventListener("load", function() {
    validarUsu();
    cargarUsuarios();
});

var urlInicio = "../php/validarTipoUsu.php";
var urlIndex = "./php/validarTipoUsu.php";
var rutaActual = window.location.pathname;

// maximo de numeros en el input de telefono
var input=  document.getElementById('txttelefono');
input.addEventListener('input',function(){
  if (this.value.length > 10) 
     this.value = this.value.slice(0,10); 
})


var numValidar = 0;
function validarUsu() {

    const http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            var respuesta = JSON.parse(this.responseText);
            console.log(respuesta);

            switch(respuesta.estado) {
                case '0':
                    window.location.href = "../";
                    break;
                case '1':
                    numValidar = 1;
                    break;
                case '2':
                    numValidar = 2;
                    break;
                case '3':
                    numValidar = 3;
                    break;
            }

            document.getElementById('idNombre').innerHTML = respuesta.datos[0];
            document.getElementById('idEmail').innerHTML = respuesta.datos[1];
            document.getElementById('idRol').innerHTML = respuesta.datos[2];
        }
    }

    if(rutaActual == "/portafolio-Proyecto-Session/html/inicio.html") {
        http.open("POST", urlInicio, true);
    } else {
        http.open("POST", urlIndex, true);
    }
    http.send();
    
}

var buscar = document.getElementById('buscarUsu');
buscar.addEventListener("keyup", cargarUsuarios)

function cargarUsuarios() {

    var frmB = new FormData(buscar);
    const http = new XMLHttpRequest();
    var url = "../php/verUsuarios.php";

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            const celdas = ['Nombres', 'Apellidos', 'Rol', 'Email', 'Telefono'];
            var respuesta = JSON.parse(this.responseText);
            var tbody = document.getElementById('tbody');

            // console.log(respuesta);

            tbody.replaceChildren();

            for(var i = 0; i < respuesta.length; i++) {

                var tr = document.createElement("tr");

                for(var j = 0; j < celdas.length; j++) {

                    if(j == 0) {
                        var th = document.createElement('th');
                        var textValor2 = document.createTextNode(i+1);
                        th.appendChild(textValor2);
                        tr.appendChild(th);
                    }

                    var td = document.createElement("td");
                    var textValor = document.createTextNode(respuesta[i][celdas[j]]);
                    td.appendChild(textValor);
                    tr.appendChild(td);

                }

                if(numValidar == 2) {

                } else if(numValidar == 3) {

                    var td = document.createElement('td');
                    var button = document.createElement('button');
                    var textValor3 = document.createTextNode("editar");
                    button.setAttribute("type", "button");
                    button.setAttribute("value", respuesta[i].Token);
                    // button.setAttribute("href", "?clave="+respuesta[i].Token);
                    button.setAttribute("onclick", "panelEditar(value)");
                    button.appendChild(textValor3);

                    td.appendChild(button);
                    tr.appendChild(td);

                } else {
                    var td = document.createElement('td');
                    var button = document.createElement('button');
                    var textValor3 = document.createTextNode("editar");
                    button.setAttribute("type", "button");
                    button.setAttribute("value", respuesta[i].Token);
                    // button.setAttribute("href", "?clave="+respuesta[i].Token);
                    button.setAttribute("onclick", "panelEditar(value)");
                    button.appendChild(textValor3);
                    

                    var td2 = document.createElement('td');
                    var button2 = document.createElement('button');
                    var textValor4 = document.createTextNode("eliminar");
                    button2.setAttribute("type", "button");
                    button2.setAttribute("value", respuesta[i].Token);
                    button2.setAttribute("onclick", "panelEliminar(value)");
                    button2.appendChild(textValor4);

                    td.appendChild(button);
                    tr.appendChild(td);

                    td2.appendChild(button2);
                    tr.appendChild(td2);
                }

                tbody.appendChild(tr);
            }

        }
    }

    http.open("POST", url, true);
    http.send(frmB);
}

function verOptions(valor) {
    var txtrol = document.getElementById('txtrol');

    const http = new XMLHttpRequest();
    var url = "../php/verRol.php";

    http.open("POST", url, true);
    http.send();

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            var respuesta = JSON.parse(this.responseText);

            txtrol.replaceChildren();

            for(var i = 0; i < respuesta.length; i++) {
                var option = document.createElement('option');
                option.setAttribute('value', respuesta[i].IdRol);
                var textValor = document.createTextNode(respuesta[i].Rol);
                option.appendChild(textValor);
                txtrol.appendChild(option);
            }
            txtrol.value = valor;
        }
    }
}

function panelEditar(value) {

    const http = new XMLHttpRequest();
    var url = "../php/buscarUsuarios.php";
    const parametro = 'clave='+value;

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(parametro);

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {

            var content = document.getElementById('cont-editar');
            var respuesta = JSON.parse(this.responseText);
            // console.log(respuesta);

            content.style.display = 'block';
            if(respuesta.estado == '1') {
                verOptions(respuesta[0].IdRol);
                document.getElementById('txtnombre').value = respuesta[0].Nombres;
                document.getElementById('txtapellidos').value = respuesta[0].Apellidos;
                document.getElementById('txttelefono').value = respuesta[0].Telefono;
                document.getElementById('txtemail').value = respuesta[0].Email;
                document.getElementById('txttoken').value = respuesta[0].Token;
            } else {
                document.getElementById('mensaje-error-R').innerHTML = "Hubo un error al buscar el usuario.";
            }

        }
    }
}

var formDatosActualizar = document.getElementById('formDatosActualizar');
formDatosActualizar.onsubmit = e => {

    const http = new XMLHttpRequest();
    var frmUp = new FormData(formDatosActualizar);
    var url = "../php/editarUsuarios.php";
    e.preventDefault();

    http.open("POST", url, true);
    http.send(frmUp);

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var respuesta = JSON.parse(this.responseText);
            var mensaje = document.getElementById('mensaje-error-R');

            if(respuesta.estado == '1') {
                alert("Datos actualizados");
                cerrar();
                cargarUsuarios();
            } else if(respuesta.estado == '2') {
                mensaje.style.display = 'block';
                mensaje.innerHTML = "Error al actualizar el usuario";
            } else if(respuesta.estado == '3') {
                mensaje.style.display = 'block';
                mensaje.innerHTML = "Campos vacios";
            } else {
                mensaje.style.display = 'block';
                mensaje.innerHTML = "No se permiten numeros o caracteres especiales en el nombre o apellido.";
            }
        }
    }
}

function panelEliminar(valor) {
    var http = new XMLHttpRequest();
    var url = "../php/eliminarUsuario.php";
    var params = "clave="+valor;

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(params);

    http.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            var respuesta = JSON.parse(this.responseText);

            if(respuesta.estado == '1') {
                alert("Usuario eliminado.");
                cargarUsuarios();
            } else {
                alert("Ocurrio un error al eliminar el usuario, vuelvalo a intentar mas tarde.");
            }
        }
    }
}

document.getElementById('btncerrar').addEventListener("click", function() {
    cerrar();
})

function cerrar() {
    var content = document.getElementById('cont-editar');
    content.style.display = 'none';

    var nombre = document.getElementById('txtnombre');
    var apellido = document.getElementById('txtapellidos');
    var rol = document.getElementById('txtrol');
    var cel = document.getElementById('txttelefono');
    var email = document.getElementById('txtemail');

    nombre.value = "";
    apellido.value = "";
    rol.value = "";
    cel.value = "";
    email.value = "";
}
