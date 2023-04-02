<?php

    require_once("conexion.php");

    $respuesta = array();

    $queryS = "SELECT u.Nombres, u.Apellidos, r.Rol, u.Email, u.Telefono, u.Token FROM usuarios as u LEFT JOIN roles as r ON r.IdRol=u.IdRol";


    if(!empty($_POST['buscarUsu'])) {

        $buscarDB = $cn->real_escape_string($_POST['buscarUsu']);
        $queryBuscar = " WHERE u.Nombres LIKE '%".$buscarDB."%' OR u.Apellidos LIKE '%".$buscarDB."%' OR u.Email LIKE '%".$buscarDB."%' OR u.Telefono LIKE '%".$buscarDB."%'";
        $queryS.=$queryBuscar;

        if($result = $cn->query($queryS)) {

            for($i = 0; $i < $result->num_rows; $i++) {
                $respuesta[$i] = $result->fetch_assoc();
            }

        } else {
            $respuesta['estado'] = '2';
        }

    } else {

        if($result = $cn->query($queryS)) {

            for($i = 0; $i < $result->num_rows; $i++) {
                $respuesta[$i] = $result->fetch_assoc();
            }

        } else {
            $respuesta['estado'] = '2';
        }

    }

    
    

    header('Content-Type: application/json');
    echo json_encode($respuesta);