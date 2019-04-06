<?php
    session_start();
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        if(isset($_SESSION['myLinks'])){
            $id = $_POST["id"];
            $sql = "SELECT * FROM link WHERE id='$id'";
            $resultado = $conn->query($sql);
            if($resultado->num_rows){
                $link = $resultado->fetch_array(MYSQLI_ASSOC);
                echo json(201,"success","Link Agregado",$link ,"../perfil");
            }else{
                echo json(200,"warning","No existe un id relacionado",[],"../perfil");
            }
        }else{
            echo json(201,"error",'No has iniciado sesión');
        }        
    }
?>