<?php

    require_once("conexion.php");

    $respuesta = array();

    if(!empty($_POST['clave'])) {

        $clave = $_POST['clave'];
        $querySearch = "SELECT u.IdRol, u.Nombres, u.Apellidos, r.Rol, u.Email, u.Telefono, u.Token FROM usuarios u, roles r WHERE r.IdRol=u.IdRol AND u.Token='$clave'";
        
        if($result = $cn->query($querySearch)) {
            $respuesta['estado'] = '1';

            for($i = 0; $i < $result->num_rows; $i++) {
                $respuesta[$i] = $result->fetch_assoc();
            }
        } else {
            $respuesta['estado'] = '2';
        }

    } else {
        $respuesta['estado'] = '2';
    }

    header('Content-Type: application/json');
    echo json_encode($respuesta);