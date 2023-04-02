<?php

    require_once("conexion.php");

    $nombre = trim($_POST['txtnombre']);
    $apellido = trim($_POST['txtapellidos']);
    $rol = trim($_POST['txtrol']);
    $cel = trim($_POST['txttelefono']);
    $clave = trim($_POST['txttoken']);

    $respuesta = array();
    $pregMatchText = "/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/i";

    if(!empty($nombre) || !empty($apellido) || !empty($rol) || !empty($cel) || !empty($email)) {

        if(preg_match($pregMatchText, $nombre) && preg_match($pregMatchText, $apellido)) {

            $queryUp = "UPDATE usuarios SET Nombres='$nombre', Apellidos='$apellido', IdRol='$rol', Telefono='$cel' WHERE Token='$clave'";
            if($result = $cn->query($queryUp)) {
                $respuesta['estado'] = '1';
            } else {
                $respuesta['estado'] = '2';
            }
        } else {
            $respuesta['estado'] = '4';
        }

    } else {
        $respuesta['estado'] = '3';
    }

    header("Content-type: application/json");
    echo json_encode($respuesta);