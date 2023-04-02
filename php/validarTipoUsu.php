<?php
    session_start();
    $respuesta = array();

    if(isset($_SESSION['nombre'])) {

        $respuesta['datos'] = [$_SESSION['nombre'], $_SESSION['email'], $_SESSION['rol']];

        if($_SESSION['TipoRol'] == '1') {
            $respuesta['estado'] = "1";

        } else if($_SESSION['TipoRol'] == '2') {
            $respuesta['estado'] = "2";

        } else {
            $respuesta['estado'] = "3";

        }

    } else {
        $respuesta['estado'] = "0";
    }

    header("Content-type: application/json");
    echo json_encode($respuesta);