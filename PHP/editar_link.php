<?php
    session_start();
    include("conexion.php");
    setlocale(LC_ALL,"es_CO.utf8");
    header("content-type:application/json;charset-utf8");    
    if($mysqli->connect_errno){
        echo json(500,"danger","No se pudo conectar al servidor: $server");   
    }else{
        if (isset($_SESSION['usuario'])) {
            $con_usuario = $_SESSION['usuario']['id'];
            $sql = "SELECT * FROM myLink.link WHERE usuario=$con_usuario";
            $resultado = $mysqli->query($sql);
            if($resultado->num_rows){
                $link = array();
                while ($registros=$resultado->fetch_array(MYSQLI_ASSOC)) {
                    array_push($link,$registros);
                }
                echo json(200,"success","Lista de contactos",$link);
            }else{
                echo json(204,"warning","No hay Datos registrados para ti");
            }            
        } else {
            echo json(204,"warning","No estas autenticado como usuario");
        }  
        $mysqli->close();
    }
?>