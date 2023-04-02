<?php
    require_once("conexion.php");
    require_once("buscarRepetido.php");

    $nombres =  trim($_POST['nombres']);
    $apellidos = trim($_POST['apellidos']);
    $email = trim($_POST['correo']);
    $cel = trim($_POST['telefono']);
    $pass = trim($_POST['password1']);
    $encriptPass = md5($pass."+".$email);
    $encriptToken = md5($pass."+".$email."+".$cel."+".$nombres);

    $rol = "2";
    $respuesta = array();
    $pregMatchText = "/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/i";
    $pregMatchPass = "/^[a-zA-ZñÑ0-9 ]+$/i";

    if(buscarUsu($cn, $email) == 1) {
        $respuesta['estado'] = '2';

    } else {

        if(!empty($nombres) && !empty($apellidos) && !empty($email) && !empty($cel) && !empty($pass)) {

            if(!preg_match($pregMatchText, $nombres) || 
                !preg_match($pregMatchText, $apellidos)) {
                $respuesta['estado'] = '3';

            } else if(!preg_match($pregMatchPass, $pass)) {
                $respuesta['estado'] = '5';
        
            } else {
                $query = "INSERT INTO usuarios (IdRol, Token, Nombres, Apellidos, Email, Telefono, Pass) VALUES ('$rol','$encriptToken','$nombres','$apellidos','$email','$cel','$encriptPass')";
                if($cn->query($query)) {
                    $respuesta['estado'] = '1';
                } else {
                    $respuesta['estado'] = '4';
                }
            }

        } else {
            $respuesta['estado'] = '6';
        }

        
    }

    header("Content-type: application/json");
    echo json_encode($respuesta);