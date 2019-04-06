<?php
    session_start();
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        if(isset($_SESSION['myLinks'])){
            $icono = $_POST["icono"];
            $titulo = $_POST["titulo"];
            $url = $_POST["url"];
            $descripcion = $_POST["descripcion"];
            $usuario_id = $_SESSION['myLinks']['id'];
            $sql = "INSERT INTO link (icono,titulo,url,descripcion,usuario_id) 
                    VALUES('$icono','$titulo','$url','$descripcion','$usuario_id')";
            if($conn->query($sql) === TRUE){
                echo json(200,"success","Link Agregado",[],"../perfil");
            }else{
                echo json(500,"error","No se pudo agregar el link: ".$conn->error.$sql);
            }
        }else{
            echo json(201,"error",'No has iniciado sesión',[],"/modules/login");
        }        
    }
?>
