<?php

    require_once("conexion.php");

    $clave = $_POST['clave'];

    $respuesta = array();

    $queryDelete = "DELETE FROM usuarios WHERE Token='$clave'";
    
    if($result = $cn->query($queryDelete)) {
        $respuesta['estado'] = '1';
    } else {
        $respuesta['estado'] = '2';
    }

    header("Content-type: application/json");
    echo json_encode($respuesta);