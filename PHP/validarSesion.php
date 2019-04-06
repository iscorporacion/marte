<?php
    session_start();
    $filename = __FILE__;
    $basename = basename(__FILE__);
    $data = explode($basename, $filename);
    include($data[0]."conexion.php");
    if(isset($_SESSION['myLinks'])){
        echo json(array(
            "error" => 202,
            "type" => "success",
            "message" => 'Bienvenido',
            "rows" => $_SESSION['myLinks']
        ));
    }else{
        echo json(201,"error",'No has iniciado sesión',[],"/modules/login");
    }
?>