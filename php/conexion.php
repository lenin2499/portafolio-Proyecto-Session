<?php

    $server = "localhost";
    $user = "root";
    $pass = "";
    $db = "prueba_sesiones_roles";
    $port = "3306";

    $cn = mysqli_connect($server, $user, $pass, $db, $port);
	if ($cn->connect_error) {
		die($cn->connect_error);
	}