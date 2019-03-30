<?php
    include("../../../PHP/conexion.php");
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        // echo json(200,"success","Conexión establecida");
        $sql = "SELECT * FROM usuario";
        $resultado = $conn->query($sql);
        if($resultado->num_rows){
            $link = array();
            while ($registros=$resultado->fetch_array(MYSQLI_ASSOC)) {
                array_push($link,$registros);
            }
            echo json(200,"success","Lista de links",$link);
        }else{
            echo json(204,"warning","No hay links registrados");
        }
    }
?>