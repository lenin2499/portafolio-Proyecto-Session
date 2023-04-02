<?php

    require_once("conexion.php");
    require_once("buscarRepetido.php");

    $email = trim($_POST['Email']);
    $pass = trim($_POST['password2']);
    $encrip = md5($pass."+".$email);

    $respuesta = array();
    session_start();

    $query = "SELECT * FROM usuarios u, roles r WHERE r.IdRol=u.IdRol AND u.Email='$email' AND u.Pass='$encrip'";

    if(buscarUsu($cn, $email) != 1) {
        $respuesta['estado'] = '4';

    } else if($result = $cn->query($query)) {

        if($buscar = mysqli_fetch_array($result)) {
            $respuesta['estado'] = '1';

            $_SESSION['nombre'] = $buscar['Nombres'];
            $_SESSION['email'] = $buscar['Email'];
            $_SESSION['rol'] = $buscar['Rol'];
            $_SESSION['TipoRol'] = $buscar['IdRol'];

        } else {
            $respuesta['estado'] = '3';
        }
    } else {
        $respuesta['estado'] = '2';
    }

    header("Content-type: application/json");
    echo json_encode($respuesta);