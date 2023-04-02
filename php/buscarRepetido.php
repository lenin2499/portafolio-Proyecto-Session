<?php
    function buscarUsu($cn, $email) {
        $querySearch = "SELECT * FROM usuarios WHERE Email='$email'";
        $result = mysqli_query($cn, $querySearch);
        
        if(mysqli_num_rows($result) > 0) {
            return 1;
        } else {
            return 0;
        }
    }