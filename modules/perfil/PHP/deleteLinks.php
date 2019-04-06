<?php
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        $id = $_POST["id"];
        $sql = "DELETE FROM link WHERE id = '$id';";
        if($conn->query($sql) === TRUE){
            echo json(202,"success","Link eliminado");
        }else{
            echo json(500,"error","No se pudo eliminar el link: ".$conn->error);
        }
    }
?>