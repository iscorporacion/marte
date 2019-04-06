<?php
    session_start();
    include("../../../PHP/conexion.php");
    setlocale(LC_ALL,"es_CO.utf8");
    header("content-type:application/json;charset-utf8");    
    if($conn->connect_errno){
        echo json(200,"error","No me pude conectar a la base de datos: ".$conn->connect_error);
    }else{
        if(isset($_POST["email"])){
            $email = $_POST["email"];
            $contra = MD5($_POST["contra"]);
            $sql = "SELECT  email,contra FROM usuario                    
                    WHERE email='$email' AND contra='$contra'";
            $resultado = $conn->query($sql);
            if($resultado->num_rows){                            
                $usuario = $resultado->fetch_array(MYSQLI_ASSOC);
                $_SESSION['usuario'] =  $usuario;
                echo json(200,"success","Usuario en linea",$usuario);             
            }else{
                echo json(500,"warning","No se encontro el usuario:");
                header("../login.php");
            }
        }else{
            echo json(500,"danger","Debes proporcionar un correo");
        }
        $conn->close();
    }
?>