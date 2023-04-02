<?php

    require_once("conexion.php");

    $respuesta = array();

    $queryRol = "SELECT * FROM Roles";

    if($result = $cn->query($queryRol)) {

        for($i = 0; $i < $result->num_rows; $i++) {
            $respuesta[$i] = $result->fetch_assoc();
        }
    }

    header("Content-type: application/json");
    echo json_encode($respuesta);