<?php
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        // echo json(200,"success","Conexión establecida");
        $nombre = $_POST["nombre"];
        $email = $_POST["email"];
        $contra = MD5($_POST["contra"]);
        $sql = "INSERT INTO usuario (nombre,email,contra) VALUES ('$nombre','$email','$contra')";
        if($conn->query($sql) === TRUE){
            echo json(200,"success","Usuario Registrado, te dirigiremos al inicio de sesión",[],"../login");
        }else{
            echo json(500,"error","No se pudo registrar el usuario: ".$conn->error);
        }
    }
?>
