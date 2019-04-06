<?php
    session_start();
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        if(isset($_SESSION['myLinks'])){
            $id = $_SESSION['myLinks']['id'];
            $sql = "SELECT * FROM link WHERE usuario_id = $id;";
            $resultado = $conn->query($sql);
            if($resultado->num_rows){
                $link = array();
                while ($registros=$resultado->fetch_array(MYSQLI_ASSOC)) {
                    array_push($link,$registros);
                }
                echo json(202,"success","Lista de links",$link);
            }else{
                echo json(204,"warning","No hay links registrados");
            }
        }else{
            echo json(201,"error",'No has iniciado sesión',[],"/modules/login");
        }
    }
?>